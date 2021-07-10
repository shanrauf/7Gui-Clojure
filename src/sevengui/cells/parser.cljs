(ns sevengui.views.cells.parser
  (:require [clojure.string :as str]
            [cljs.reader :as reader]
            [sevengui.views.cells.operator :refer [has-operator?
                                                   operator-regex]]))

(defn- special-form? [expr]
  (try
    (let [result (reader/read-string expr)]
      (not (or (string? result) (number? result))))
    (catch :default _ true)))

(defn generate-s-expression [expr]
  (if (has-operator? expr)
    (generate-s-expression (str/replace expr operator-regex "($1, $2)"))
    expr))

(defn- parse-special-form [expr]
  (->> expr
       (generate-s-expression)
       (reader/read-string)))

(defn- parse-cell-expr [expr]
  (if (special-form? expr)
    (parse-special-form expr)
    (reader/read-string expr)))

(def m-parse-cell-expr (memoize parse-cell-expr))
