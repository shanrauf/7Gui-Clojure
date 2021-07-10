(ns sevengui.cells.test-cells
  (:require [cljs.test :refer-macros [deftest is testing run-tests]]
            [sevengui.cells.cells :refer [generate-spreadsheet-state
                                          on-update-cell!
                                          extract-refs
                                          eval-cell-expr]]
            [sevengui.cells.cell-ref :refer [get-cell ref->value]]
            [sevengui.cells.parser :refer [m-parse-cell-expr]]))

(defn init-state [state initial-cell-exprs]
  (let [sheet (:sheet state)]
    (doall (map #(let [id (subs (str %) 1)
                       cell (get-cell sheet id)
                       expr (get initial-cell-exprs %)]
                   (on-update-cell! state cell expr))
                (keys initial-cell-exprs))))
  state)

(deftest test-m-parse-cell-expr []
  (testing "Raw expressions:"
    [(is (= (m-parse-cell-expr "1") 1))
     (is (= (m-parse-cell-expr "\"1\"") "1"))
     (is (= (m-parse-cell-expr "\"ROAM RESEARCH\"") "ROAM RESEARCH"))])
  (testing "Special form parsing:"
    [(is (= (m-parse-cell-expr "SUM(A1 A2)") '(SUM A1 A2)))
     (is (= (m-parse-cell-expr "A1") 'A1))
     (is (= (m-parse-cell-expr "1") 1))
     (is (= (m-parse-cell-expr "SUM(A1 DIV(2 2) SUM(1 SUM(2 3)))")
            '(SUM A1 (DIV 2 2) (SUM 1 (SUM 2 3)))))]))

(deftest test-extract-refs []
  [(is (= (extract-refs "=SUM(A1 A2)") (set ["A1" "A2"])))
   (is (= (extract-refs "=SUM(A1:A2)") (set ["A1" "A2"])))
   (is (= (extract-refs "=SUM(SUB(MUL(DIV(A3 A2) B1:B3) A3) A1:B2)")
          (set ["A1" "A2" "A3" "B1" "B2" "B3"])))])

(deftest test-eval-cell-expr []
  (testing "Valid expressions:"
    (let [initial-cell-exprs {:A1 "=\"1\""
                              :A2 "=1"
                              :A3 "2"
                              :A4 "=𐃏"}
          state (init-state (generate-spreadsheet-state) initial-cell-exprs)]
      [(is (= (eval-cell-expr state "A1" (:A1 initial-cell-exprs)) "1"))
       (is (= (eval-cell-expr state "A2" (:A2 initial-cell-exprs)) 1))
       (is (= (eval-cell-expr state "A3" (:A3 initial-cell-exprs)) 2))
       (is (= (eval-cell-expr state "A4" (:A4 initial-cell-exprs))
              "𐃏 ¡ASTROLABE! 𐃏"))]))
  (testing "Operators"
    (let [initial-cell-exprs {:A1 "=SUM(COUNT(1 2) SUB(2 1) MUL(2 2) DIV(2 2))"
                              :A2 "=MAX(AVG(5 7) MOD(4 3) MIN(7 8 ROUND(9.1)))"
                              :A3 "=IF(OR(EQUAL(1 2) EQUAL(1 1)) true false)"}
          state (init-state (generate-spreadsheet-state) initial-cell-exprs)]
      [(is (= (eval-cell-expr state "A1" (:A1 initial-cell-exprs)) 8))
       (is (= (eval-cell-expr state "A2" (:A2 initial-cell-exprs)) 7))
       (is (= (eval-cell-expr state "A3" (:A3 initial-cell-exprs)) true))]))
  (testing "Expressions w/ references:"
    (let [initial-cell-exprs {:A1 "1"
                              :A2 "=1"
                              :A3 "=SUM(A1 A2)"
                              :A4 "=SUM(A1:B2 1)"}
          state (init-state (generate-spreadsheet-state) initial-cell-exprs)]
      [(is (= (eval-cell-expr state "A3" (:A3 initial-cell-exprs)) 2))
       (is (= (eval-cell-expr state "A4" (:A4 initial-cell-exprs)) 3))])))

(deftest test-on-update-cell []
  (testing "Evalulating/setting new cell values"
    (let [state (generate-spreadsheet-state)
          sheet (:sheet state)
          id "A1"]
      [(let [cell (get-cell sheet id)
             expr "=SUM(1 2)"
             expected 3]
         (on-update-cell! state cell expr)
         (is (= (ref->value sheet id) expected)))]))
  (testing "Dependent cell values"
    (let [initial-cell-exprs {:A1 "1"      :B1 nil
                              :A2 "=1"     :B2 ""
                              :A3 "2"      :B3 "=𐃏"}
          state (init-state (generate-spreadsheet-state) initial-cell-exprs)
          sheet (:sheet state)
          id "B1"
          cell (get-cell sheet id)
          expr "=SUM(A1:A3)"
          dependee-id "A1"
          expected 4
          new-expr "2"
          new-expected 5]
      (on-update-cell! state cell expr)
      (is (= (ref->value sheet id) expected))
      (on-update-cell! state (get-cell sheet dependee-id) new-expr)
      (is (= (ref->value sheet id) new-expected)))))

(run-tests)
