(ns sevengui.views.cells.parser
  (:require [clojure.string :as str]
            [cljs.reader :as reader]
            [sevengui.views.cells.cell-ref :refer [is-ref-range?]]
            [sevengui.views.cells.operator :refer [has-operator?
                                                   operator-regex]]
            [sevengui.views.cells.error :refer [throw-error value-error]]))

(defonce list-regex #"^(\s*\(.*\)\s*)$")

(defn- special-form? [expr]
  (try
    (let [result (reader/read-string expr)]
      (not (or (string? result) (number? result))))
    (catch :default _ true)))

(defn balanced?
  ([expr] (balanced? (str/split expr #"") 0))
  ([[x & xs] count]
   (cond (neg? count) false
         (nil? x) (zero? count)
         (= x "(") (recur xs (inc count))
         (= x ")") (recur xs (dec count))
         :else (recur xs count))))

(defonce special-form-rules
  {:no-range-outside-operator #(not (is-ref-range? %))
   :no-list-outside-operator #(not (re-seq list-regex %))
   :balanced-operations balanced?})

(defn- validate-special-form [expr]
  (if (every? true? (map #(% expr) (vals special-form-rules)))
    expr
    (throw-error value-error expr)))

(defn generate-s-expression [expr]
  (if (has-operator? expr)
    (generate-s-expression (str/replace expr operator-regex "($1, $2)"))
    expr))

(defn- parse-special-form [expr]
  (->> expr
       (validate-special-form)
       (generate-s-expression)
       (reader/read-string)))

(defn- parse-cell-expr [expr]
  (if (special-form? expr)
    (parse-special-form expr)
    (reader/read-string expr)))

(def m-parse-cell-expr (memoize parse-cell-expr))
