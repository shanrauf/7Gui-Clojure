(ns sevengui.cells.cells
  (:require [reagent.core :as r]
            [clojure.set :as set]
            [sevengui.cells.parser :refer [m-parse-cell-expr]]
            [sevengui.cells.resolver :refer [resolve-cell-expr]]
            [sevengui.cells.error :refer [log-error
                                          get-error-name]]
            [sevengui.cells.cell-ref :refer [find-refs
                                             expand-ranges
                                             value-or-number
                                             generate-cell-ref
                                             get-cell
                                             columns
                                             rows]]))

;; -------------------------
;; Sheet

;; -------------------------
(defonce blank-cell {:expr nil
                     :value nil})

(defn- generate-row [row]
  (->> columns
       (map #(let [id (generate-cell-ref % row)]
               (list id (r/atom (merge {:id id} blank-cell)))))))

(defn generate-spreadsheet-state []
  {:columns columns
   :rows rows
   :sheet (->> rows
               (map generate-row)
               (flatten)
               (apply assoc {}))})

(defn set-cell! [cell expr value err]
  (swap! cell assoc
         :expr expr
         :input expr
         :value value
         :err err))

(defn set-editting! [cell is-editting]
  (swap! cell assoc :is-editting is-editting))

(defn- set-input! [cell input]
  (swap! cell assoc :input input))

(defn- set-cell-error! [cell id expr error]
  (log-error id error)
  (set-cell! cell
             expr
             0
             (get-error-name error)))

(defn eval-cell-expr [state id expr]
  (if (not= (first expr) "=")
    (value-or-number expr)
    (->> (subs expr 1)
         (m-parse-cell-expr)
         (resolve-cell-expr state id))))

(defn extract-refs [expr]
  (->> (subs expr 1)
       (m-parse-cell-expr)
       (find-refs)
       (flatten)
       (expand-ranges)
       (set)))

(defn- eval-dependent-cell [state]
  (fn [id _ old-val new-val]
    (when (not= (:value old-val) (:value new-val))
      (let [cell (get-cell (:sheet state) id)
            c @cell
            expr (:expr c)]
        (try
          (set-cell! cell
                     expr
                     (eval-cell-expr state id expr)
                     false)
          (catch :default e (set-cell-error! cell id expr e)))))))

(defn- update-watchers [state id last-expr new-expr]
  (let [old-refs (if last-expr (extract-refs last-expr) (list))
        new-refs (if new-expr (extract-refs new-expr) (list))
        removed-refs (set/difference old-refs new-refs)
        added-refs (set/difference new-refs old-refs)
        sheet (:sheet state)]
    (doseq [watched (map #(get-cell sheet %) removed-refs)]
      (when watched (remove-watch watched id)))
    (doseq [to-watch (map #(get-cell sheet %) added-refs)]
      (when to-watch (add-watch to-watch id (eval-dependent-cell state))))))

;; -------------------------
;; Events

;; -------------------------
(defn on-update-cell! [state cell new-expr]
  (let [c @cell
        last-expr (:expr c)
        id (:id c)]
    (when (not= last-expr new-expr)
      (try
        (set-cell! cell
                   new-expr
                   (eval-cell-expr state id new-expr)
                   false)
        (update-watchers state id last-expr new-expr)
        (catch :default e (set-cell-error! cell id new-expr e))))))

(defn- ignore-blur-event? [e]
  (.contains (.-currentTarget e) (.-relatedTarget e)))

(defn- focus-was-on-input? [e]
  (not= (.-target e) (.-currentTarget e)))

(defn- on-blur-cell! [state e cell]
  (when (not (ignore-blur-event? e))
    (set-editting! cell false)
    (when (focus-was-on-input? e)
      (on-update-cell! state cell (.. e -target -value)))))

;; -------------------------
;; Keyboard Shortcuts

;; -------------------------
(defn- move-focus [target direction]
  (let [row (.-parentElement target)
        rows (.. row -parentElement -children)
        siblings (.-children row)
        idx (.indexOf (js/Array.from siblings) target)]
    (->> (case direction
           :left (.-previousSibling target)
           :right (or (.-nextSibling target) target)
           :up (nth (js/Array.from (.. row -previousSibling -children)) idx)
           :down (if (.. row -nextSibling)
                   (nth (js/Array.from (.. row -nextSibling -children)) idx)
                   target)
           :first (second (.-children (second rows)))
           :last (last (.-children (last rows)))
           :first-in-row (second siblings)
           :last-in-row (last siblings)
           :first-in-col (nth (js/Array.from (.-children (second rows))) idx)
           :last-in-col (nth (js/Array.from (.-children (last rows))) idx)
           false)
         (.focus))))

(defn- on-keydown-input! [state e cell]
  (.stopPropagation e)
  (let [key (.-key e)
        parent (.. e -target -parentElement)]
    (when (contains? #{"Enter" "Tab"} key)
      (on-update-cell! state cell (.. e -target -value)))
    (when (= key "Escape")
      (swap! cell assoc :input "" :is-editting false)

      (.focus parent))
    (when (= key "Enter")
      (move-focus parent :down))))

(defn- on-keydown-cell! [state e cell]
  (.preventDefault e)
  (let [key (.-key e)
        target (.-target e)]
    (case key
      "ArrowRight" (move-focus target :right)
      "ArrowLeft" (move-focus target :left)
      "ArrowUp" (move-focus target :up)
      "ArrowDown" (move-focus target :down)
      "Home" (cond
               (.-ctrlKey e) (move-focus target :first)
               (.-altKey e) (move-focus target :first-in-col)
               :else (move-focus target :first-in-row))
      "End" (cond
              (.-ctrlKey e) (move-focus target :last)
              (.-altKey e) (move-focus target :last-in-col)
              :else (move-focus target :last-in-row))
      ("Delete" "Backspace") (on-update-cell! state cell nil)
      ("Enter" " ") (set-editting! cell true)
      (when (= (count key) 1)
        (swap! cell assoc :input key :is-editting true)))))

;; -------------------------
;; View

;; -------------------------
(defn cell-component [state col row]
  (let [cell (get-cell (:sheet state) (generate-cell-ref col row))
        c @cell
        input (or (:input c) (:expr c))
        is-editting (or (:is-editting c) false)
        error (:err c)]
    [:td.cell {:class (when error "invalid-input")
               :tab-index (if is-editting -1 0)
               :on-key-down #(on-keydown-cell! state % cell)
               :on-blur #(on-blur-cell! state % cell)
               :on-double-click #(set-editting! cell true)}
     (if is-editting
       [:input {:auto-focus true
                :value input
                :on-change #(set-input! cell (.. % -target -value))
                :on-key-down #(on-keydown-input! state % cell)}]
       [:div.value (or error (str (:value c)))])]))

(defn row-component [state row]
  [:tr {:key row}
   [:td.row row]
   (doall (map (fn [col] ^{:key col} [cell-component state col row])
               (:columns state)))])

(defn cells-component []
  (let [state (generate-spreadsheet-state)]
    [:div.cells-container
     [:h2 "Task 7: Cells"]
     [:div.cells
      [:table
       [:tbody
        [:tr [:th ""]
         (map (fn [col] [:th {:key col} col]) (:columns state))]
        (doall (map #(row-component state %) (:rows state)))]]]]))
