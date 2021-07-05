(ns sevengui.views.circle-drawer
  (:require [reagent.core :as r]
            [sevengui.util :refer [uuid-str?]]))

;; -------------------------
;; Constants

;; -------------------------
(defonce default-radius 10)
(defonce minimum-radius 5)

;; -------------------------
;; Model

;; -------------------------
(defonce canvas-state
  (r/atom {:circles []
           :selected-circle nil
           :undo-stack []
           :redo-stack []
           :popup-active false
           :slider-active false}))

;; Computed properties
(defn- selected? [id]
  (= id (:id (:selected-circle @canvas-state))))

(defn- circle-selected? []
  (boolean (:selected-circle @canvas-state)))

(defn- popup-active? []
  (:popup-active @canvas-state))

(defn- slider-active? []
  (:slider-active @canvas-state))

(defn- can-undo?
  []
  (seq (:undo-stack @canvas-state)))

(defn- can-redo?
  []
  (seq (:redo-stack @canvas-state)))

;; -------------------------
;; Canvas History

;; -------------------------
(defn- undo!
  []
  (let [{:keys [undo-stack redo-stack circles]} @canvas-state]
    (when (can-undo?)
      (swap! canvas-state assoc
             :popup-active false
             :selected-circle nil
             :circles (last undo-stack)
             :undo-stack (pop undo-stack)
             :redo-stack (conj redo-stack circles)))))

(defn- redo!
  []
  (let [{:keys [undo-stack redo-stack circles]} @canvas-state]
    (when (can-redo?)
      (swap! canvas-state assoc
             :popup-active false
             :selected-circle nil
             :circles (last redo-stack)
             :redo-stack (pop redo-stack)
             :undo-stack (conj undo-stack circles)))))

(defn- set-undo-stack! [s]
  (swap! canvas-state assoc :undo-stack s))

(defn- set-redo-stack! [s]
  (swap! canvas-state assoc :redo-stack s))

;; -------------------------
;; Circle

;; -------------------------
(defn- d->r [d]
  (/ d 2))

(defn- r->d [r]
  (* r 2))

(defn- distance-between [x1 y1 x2 y2]
  (Math/sqrt (+ (Math/pow (- y2 y1) 2)
                (Math/pow (- x2 x1) 2))))

(defn- get-closest-circle
  [[x y]]
  (->
   (reduce
    (fn [prev c]
      (let [curr-distance (distance-between x y (:x c) (:y c))]
        (if (and (< curr-distance (:r c))
                 (< curr-distance (:d prev)))
          {:d curr-distance :c c}
          prev)))
    {:d ##Inf}
    (:circles @canvas-state))
   :c))

(defn- generate-circle [id x y r]
  {:id (cond
         (and (string? id) (uuid-str? id)) id
         (nil? id) (str (random-uuid))
         :else (throw (js/Error. "Id must be a UUID string")))
   :x (if (js/isNaN x)
        (throw (js/Error. "X coordinate must be a number"))
        x)
   :y (if (js/isNaN y)
        (throw (js/Error. "Y coordinate must be a number"))
        y)
   :r (cond
        (nil? r) default-radius
        (and (number? r) (> r 0)) r
        :else (throw (js/Error. "Radius must be a number > 0")))})

(defn- get-dom-event-coords [e]
  (let [t (.-currentTarget e)
        rect (.getBoundingClientRect t)
        x (- (.-clientX e) (-> rect .-left int))
        y (- (.-clientY e) (-> rect .-top int))]
    (list x y)))

(defn- create-circle!
  [coords]
  (let [{:keys [circles undo-stack]} @canvas-state
        new-circle (generate-circle nil (first coords) (last coords) default-radius)]
    (swap! canvas-state assoc
           :popup-active false
           :circles (conj circles new-circle))
    (set-undo-stack! (conj undo-stack circles))
    (set-redo-stack! [])
    new-circle))

(defn- commit-circle-diameter! []
  (let [{:keys [selected-circle circles undo-stack]} @canvas-state]
    (swap! canvas-state assoc :circles (map #(if (and (= (:id %) (:id selected-circle))
                                                      (not= (:r %) (:r selected-circle))) selected-circle %) circles))
    (set-undo-stack! (conj undo-stack circles))
    (set-redo-stack! [])))

(defn- set-selected-circle! [c]
  (when (not= c (:selected-circle @canvas-state))
    (swap! canvas-state assoc :selected-circle c))
  )

(defn- select-closest-circle! [coords]
   (-> coords
      (get-closest-circle)
      (set-selected-circle!)))

;; -------------------------
;; Popup

;; -------------------------
(defn- set-popup! [is-visible]
  (swap! canvas-state assoc :popup-active is-visible))

(defn- set-slider! [is-visible]
  (swap! canvas-state assoc :slider-active is-visible))

;; -------------------------
;; Controllers

;; -------------------------
(defn- on-canvas-left-click! [e]
  (-> (get-dom-event-coords e)
      (create-circle!)
      (set-selected-circle!)))

(defn- on-canvas-right-click! [e]
  (.preventDefault e)
  (when (circle-selected?) (set-popup! true)))

(defn- on-canvas-mouse-move! [e]
  (when (not (popup-active?))
    (-> (get-dom-event-coords e)
        (select-closest-circle!))))

(defn- on-change-diameter! [d]
  (let [{:keys [id x y]} (:selected-circle @canvas-state)
        r (d->r d)]
    (set-selected-circle! (generate-circle id x y r))))

(defn- on-popup-blur! []
  (swap! canvas-state assoc :popup-active false)
  (commit-circle-diameter!)
  (set-selected-circle! nil)
  (set-slider! false)
  (set-popup! false))

(defn- on-undo! []
  (undo!))

(defn- on-redo! []
  (redo!))

;; -------------------------
;; View

;; -------------------------
(defn- popup-component []
  (let [{:keys [x y r]} (:selected-circle @canvas-state)]
    [:form.popup {:style {:left x
                          :top y}
                  :on-blur #(on-popup-blur!)}
     (if (slider-active?)
       [:div.slider
        [:h3 "Adjust Diameter"]
        [:input {:type "range"
                 :min minimum-radius
                 :auto-focus true ; makes on-blur event fire
                 :value (r->d r)
                 :on-change #(on-change-diameter! (.. % -target -value))}]]
       [:button.custom-button {:type "button"
                               :auto-focus true ; makes on-blur event fire
                               :on-click #(set-slider! true)} "Adjust Diameter..."])]))

(defn- circle [{:keys [id x y r]}]
  [:circle {:class (when (selected? id) "selected-circle")
            :key id
            :cx x
            :cy y
            :r (if (selected? id) (:r (:selected-circle @canvas-state)) r)}])

(defn- canvas-component []
  [:div.canvas-container
   [:svg {:on-click #(on-canvas-left-click! %)
          :on-mouse-move #(on-canvas-mouse-move! %)
          :on-context-menu #(on-canvas-right-click! %)}
    (doall (map circle (:circles @canvas-state)))]
   (when (popup-active?) [popup-component])])

(defn circle-drawer-component []
  [:div {:class "task"}
   [:h2 "Task 6: Circle Drawer"]
   [:button.custom-button {:type "button"
                           :disabled (not (can-undo?))
                           :on-click #(on-undo!)} "Undo"]
   [:button.custom-button {:type "button"
                           :disabled (not (can-redo?))
                           :on-click #(on-redo!)} "Redo"]
   [canvas-component]])