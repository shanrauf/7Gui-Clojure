(ns sevengui.views.cells.parser
  (:require [clojure.string :as str]
            [cljs.reader :as reader]
            [sevengui.views.cells.operator :refer [has-operator?
                                                   operator-regex]]
            [sevengui.views.cells.error :refer [throw-error value-error]]))

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

(defn generate-s-expression [expr]
  (when (not (balanced? expr)) (throw-error value-error expr))
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
