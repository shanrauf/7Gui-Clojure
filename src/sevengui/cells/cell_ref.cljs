(ns sevengui.cells.cell-ref
  (:require [clojure.string :as str]
            [sevengui.cells.error :refer [throw-error
                                          ref-error
                                          circular-ref-error
                                          name-error]]))

(defonce ref-regex #"([a-zA-Z]+)(\d\d*)")
(defonce ref-col-regex #"^[a-zA-Z]+$")
(defonce ref-row-regex #"^\d\d*$")
(defonce ref-range-regex #"^[a-zA-Z]+\d\d*?:[a-zA-Z]+\d\d*?$")
(defonce exact-ref-pattern-regex #"^[a-zA-Z]+\d\d*?(?::[a-zA-Z]+\d\d*?)?$")

; Easily extendable e.g. AA, AB ... AZ BA BB ... ZZ AAA AAB
(defonce columns (seq "ABCDEFGHIJKLMNOPQRSTUVWXYZ"))
(defonce rows (doall (map str (range 0 100))))

(defn generate-cell-ref [col row]
  (let [id (.toUpperCase (str col row))]
    (if (and (re-seq ref-col-regex col)
             (re-seq ref-row-regex row))
      id
      (js/Error "Invalid cell reference"))))

(defn is-ref-range? [ref]
  (boolean (re-find ref-range-regex ref)))

(defn value-or-number [value]
  (let [num (js/Number value)]
    (if (or (str/blank? value) (js/Number.isNaN num)) value num)))

(defn get-cell [sheet ref]
  (let [c (get sheet ref)]
    (when (not c) (throw-error name-error ref))
    c))

(defn- ref->expr [sheet ref]
  (:expr (get-cell sheet ref)))

(defn- ref->col [ref]
  (second (re-find ref-regex ref)))

(defn- ref->row [ref]
  (last (re-find ref-regex ref)))

(defn- ref->col-idx [ref]
  (.indexOf columns (ref->col ref)))

(defn- ref->row-num [ref]
  (int (ref->row ref)))

(defn- ref-keyfn
  "Convert ref into a number e.g. A1 = 1, A2 = 2"
  [ref]
  (let [col-num (+ 1 (ref->col-idx ref))
        row-num (+ 1 (ref->row-num ref))]
    (js/Number (+ row-num
                  (* (- col-num 1) (count rows))))))

(defn- inc-ref [ref]
  (let [col (ref->col ref) row (js/Number (ref->row ref))]
    (if (= row (last rows))
      (str (nth columns (inc (.indexOf columns col))) (first rows))
      (str col (inc row)))))

(defn- sort-refs [refs]
  (sort-by ref-keyfn refs))

(defn- split-ref [ref]
  [(ref->col ref) (ref->row ref)])

(defn- expand-range [start-ref end-ref]
  (flatten [end-ref (take-while #(not= % end-ref)
                                (iterate inc-ref start-ref))]))

(defn- range->references [range]
  (let [[start-ref end-ref] (-> (.toUpperCase range)
                                (str/split ":")
                                (sort-refs))
        [start-col start-row] (split-ref start-ref)
        [end-col end-row] (split-ref end-ref)]
    (if (= start-col end-col)
      (expand-range start-ref end-ref)
      (let [next-col (nth columns (+ 1 (ref->col-idx start-ref)))
            next-col-range (str next-col start-row ":" end-ref)
            last-start-col-ref (str start-col end-row)]
        (flatten [(expand-range start-ref last-start-col-ref)
                  (range->references next-col-range)])))))

(defn- check-for-self-reference [cell-ref id]
  (when (= cell-ref id) (throw-error ref-error cell-ref))
  id)

(defn- check-for-circular-reference [sheet cell-ref id]
  (let [is-circular-ref (= cell-ref (ref->expr sheet id))]
    (when is-circular-ref (throw-error circular-ref-error id))
    id))

(defn cell-reference-pattern? [expr]
  (boolean (re-find exact-ref-pattern-regex expr)))

(defn- nil->0 [value]
  (if (nil? value)
    0
    value))

(defn ref->value [sheet ref]
  (let [cell (get-cell sheet ref)]
    (:value @cell)))

(defn find-refs [expr]
  (cond
    (list? expr) (map find-refs expr)
    (and (symbol? expr) (cell-reference-pattern? (str expr))) (str expr)
    :else []))

(defn expand-ranges [refs]
  (flatten (map #(if (is-ref-range? %) (range->references %) %) refs)))

(defn resolve-cell-refs [state cell-ref ref]
  (let [ref (str/upper-case ref)
        sheet (:sheet state)]
    (if (is-ref-range? ref)
      (flatten (map #(resolve-cell-refs state cell-ref %)
                    (range->references ref)))
      (->> ref
           (check-for-self-reference cell-ref)
           (check-for-circular-reference sheet cell-ref)
           (ref->value sheet)
           (nil->0)
           (list)
           (flatten)))))
