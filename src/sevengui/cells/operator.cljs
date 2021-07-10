(ns sevengui.views.cells.operator
  (:require [clojure.string :as str]
            [sevengui.views.cells.error :refer [throw-error operator-error value-error]]))

(defonce operator-regex #"(?i)([A-Z]+)\s*\((.*)?\)")

;; -------------------------
;; Validation

;; -------------------------
(defn- numeric-only [args]
  (let [invalid-args (filter #(not (number? %)) (flatten args))]
    (if (seq invalid-args)
      (throw-error value-error invalid-args)
      true)))

(defn arg-count [n]
  (fn [args] (if (not= (count args) n)
               (throw-error value-error args)
               true)))

(defn min-arg-count [n]
  (fn [args] (if (< (count args) n)
               (throw-error value-error args)
               true)))

(defn- all-inputs-allowed [_]
  true)

;; -------------------------
;; Operators

;; -------------------------
(defn- apply-operation [f validation-fn]
  (fn [args] (when (validation-fn args) (apply f (flatten args)))))

(defn- generic-operation [f validation-fn]
  (fn [args] (when (validation-fn args) (f (flatten args)))))

(defn- avg [& args]
  (/ (apply + (flatten args))
     (count (flatten args))))

(defn- count-fn
  "'count' implementation based on Excel spec"
  [& args]
  (count (filter #(not (nil? %)) (flatten args))))

(defn- counta
  "'counta' implementation based on Excel spec"
  [& args]
  (count (flatten args)))

(defn- if-operation [[condition-expr true-expr false-expr]]
  (if condition-expr true-expr false-expr))

(defonce operators {:sum (apply-operation + numeric-only)
                    :sub (apply-operation - numeric-only)
                    :div (apply-operation / numeric-only)
                    :mul (apply-operation * numeric-only)
                    :mod (apply-operation mod #(and (arg-count 2) %
                                                    (numeric-only %)))
                    :min (apply-operation min numeric-only)
                    :max (apply-operation max numeric-only)
                    :round (apply-operation #(.round js/Math %) #(and (arg-count 1) %
                                                                      (numeric-only %)))
                    :count (generic-operation count-fn all-inputs-allowed)
                    :counta (generic-operation counta all-inputs-allowed)
                    :avg (generic-operation avg numeric-only)
                    :if (generic-operation if-operation (arg-count 3))
                    :or (generic-operation #(some true? %) (min-arg-count 2))
                    :and (generic-operation #(every? true? %) (min-arg-count 2))
                    :equal (apply-operation = all-inputs-allowed)
                    :not (apply-operation not (arg-count 1))})

(defn has-operator? [expr]
  (re-find operator-regex expr))

(defn eval-operation [s-expr]
  (let [operator (first s-expr)
        args (rest s-expr)]
    (operator args)))

(defn operator-sym->operator [symbol]
  (let [operator (get operators (->> symbol str str/lower-case keyword))]
    (if (not operator)
      (throw-error operator-error symbol)
      operator)))
