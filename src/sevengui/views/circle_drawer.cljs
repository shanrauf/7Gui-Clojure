(ns sevengui.views.circle-drawer
  (:require [reagent.core :as r]))

; Relevant Commands
;; create-circle!
;; set-circle-diameter!

;; -------------------------
;; Model

;; -------------------------
(defonce radius 10)

;; -------------------------
;; Model

;; -------------------------
(defn- generate-circle [id x y r]
  {:id (or id (str (random-uuid)))
   :x x
   :y y
   :r (or r radius)})

(defonce canvas-state
  (r/atom {:circles [(generate-circle nil 100 100 nil)
                     (generate-circle nil 10 10 nil)]
           :selected-circle-idx nil
           :undo-stack []
           :redo-stack []}))


(defn- get-dom-event-coords [e]
  (let [t (.-currentTarget e)
        rect (.getBoundingClientRect t)
        x (- (.-clientX e) (-> rect .-left int))
        y (- (.-clientY e) (-> rect .-top int))]
    (list x y)))

;; -------------------------
;; CRUD

;; -------------------------
(defn- create-circle! [coords]
  (let [new-circle (generate-circle nil (first coords) (last coords) radius)]
    (swap! canvas-state
           assoc
           :redo-stack []
           :circles (conj (:circles @canvas-state) new-circle)
           :undo-stack (conj (:undo-stack @canvas-state) (:circles @canvas-state))))) ;; fragile, putting at end; put udno.redo update in controller "->"

;; (defn- set-circle-diameter! []
;;   (js/alert "CHANGING DIAMETER OF SELECTED"))

;; -------------------------
;; Controller

;; -------------------------
(defn on-canvas-left-click! [e]
  (-> (get-dom-event-coords e)
      (create-circle!)))

(defn on-circle-click [e]
  (js/console.log e)
  (js/alert "CIRCLE CLICK"))

(defn on-undo! []
  (js/alert "UNDO"))

(defn on-redo! []
  (js/alert "REDO"))

(defn- on-canvas-right-click [e]
  (.preventDefault e)
  (js/alert "RIGHT CLICK"))

;; -------------------------
;; View

;; -------------------------
(defn circle-drawer-component []
  [:div {:class "task"}
   [:h2 "Task 6: Circle Drawer"]
   [:div.container
    [:button {:type "button"
              :on-click #(on-undo!)} "Undo"]
    [:button {:type "button"
              :on-click #(on-redo!)} "Redo"]]
   [:div.canvas-container
    [:svg {:on-click #(on-canvas-left-click! %)
           :on-context-menu #(on-canvas-right-click %)}
     (for [c (:circles @canvas-state)]
       (let [{:keys [id x y r]} c]
         [:circle {:key id
                   :cx x
                   :cy y
                   :r r
                   :on-click #(on-circle-click %)}]))]]])