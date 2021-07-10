(ns sevengui.views.cells.error)

;; -------------------------
;; Errors

;; -------------------------
(defonce ref-error "#REF!")
(defonce circular-ref-error "#CIRCULAR!")
(defonce name-error "#NAME?")
(defonce value-error "#VALUE")
(defonce operator-error "#OPERATOR?")
(defonce errors {ref-error "Contains Self Reference"
                 circular-ref-error "Contains Circular Reference"
                 name-error "Unresolved Reference"
                 operator-error "Unresolved Operator"
                 value-error "Invalid Value"})

(defn- get-error [name]
  (or (get errors name) "Unknown error"))

(defn get-error-name [error]
  (or (:error (ex-data error)) "#ERROR!"))

(defn throw-error [name data]
  (let [description (get-error name)]
    (throw (ex-info description
                    {:error name
                     :description description
                     :expr data}))))

(defn log-error [id e]
  (let [{:keys [error description expr]} (ex-data e)]
    (js/console.warn
     (str "Error: \n"
          error ": " (or description "Unknown error")
          " at " id "\n"
          "Expression: " expr "\n"))))
