(ns sevengui.views.cells.resolver
  (:require [sevengui.views.cells.operator :refer [eval-operation
                                                   operator-sym->operator]]
            [sevengui.views.cells.cell-ref :refer [resolve-cell-refs
                                                   cell-reference-pattern?]]
            [sevengui.views.cells.error :refer [throw-error value-error]]))

(defn- resolve-symbol [state id sym]
  (cond
    (cell-reference-pattern? (str sym)) (resolve-cell-refs state id (str sym))
    (= sym '𐃏) "𐃏 ¡ASTROLABE! 𐃏"
    :else (operator-sym->operator sym)))

(defn resolve-cell-expr [state id expr]
  (cond
    (list? expr) (eval-operation (map #(resolve-cell-expr state id %) expr))
    (symbol? expr) (resolve-symbol state id expr)
    (nil? expr) (throw-error value-error expr)
    :else expr))
