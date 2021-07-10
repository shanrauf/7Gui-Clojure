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
(defonce initial-state
  {:circles []
   :selected-circle nil
   :undo-stack []
   :redo-stack []
   :popup-active false
   :slider-active false})

;; Computed properties
(defn- selected? [state c]
  (= (:id c) (:id (:selected-circle @state))))

(defn- same-circles? [c1 c2]
  (= (:id c1) (:id c2)))

(defn- equivalent-circles? [c1 c2]
  (= (:r c1) (:r c2)))

(defn- some-circle-selected? [state]
  (boolean (:selected-circle @state)))

(defn- popup-active? [state]
  (:popup-active @state))

(defn- slider-active? [state]
  (:slider-active @state))

(defn- can-undo? [state]
  (seq (:undo-stack @state)))

(defn- can-redo? [state]
  (seq (:redo-stack @state)))

;; -------------------------
;; Canvas History

;; -------------------------
(defn- undo! [state]
  (let [{:keys [undo-stack redo-stack circles]} @state]
    (when (can-undo? state)
      (swap! state assoc
             :popup-active false
             :selected-circle nil
             :circles (last undo-stack)
             :undo-stack (pop undo-stack)
             :redo-stack (conj redo-stack circles)))))

(defn- redo! [state]
  (let [{:keys [undo-stack redo-stack circles]} @state]
    (when (can-redo? state)
      (swap! state assoc
             :popup-active false
             :selected-circle nil
             :circles (last redo-stack)
             :redo-stack (pop redo-stack)
             :undo-stack (conj undo-stack circles)))))

(defn- set-undo-stack! [state stack]
  (swap! state assoc :undo-stack stack))

(defn- set-redo-stack! [state stack]
  (swap! state assoc :redo-stack stack))

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
  [state [x0 y0]]
  (->
   (reduce
    (fn [prev c]
      (let [{:keys [x y r]} c
            distance-from-circle (distance-between x0 y0 x y)
            mouse-within-circle (< distance-from-circle r)
            closer-circle (< distance-from-circle (:d prev))]
        (if (and mouse-within-circle
                 closer-circle)
          {:d distance-from-circle :c c}
          prev)))
    {:d ##Inf :c nil}
    (:circles @state))
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
  (let [rect (.getBoundingClientRect (.-currentTarget e))
        x (- (.-clientX e) (-> rect .-left int))
        y (- (.-clientY e) (-> rect .-top int))]
    (list x y)))

(defn- set-circles! [state circles]
  (swap! state assoc :circles circles))

(defn- create-circle!
  [state [x y]]
  (let [{:keys [circles undo-stack]} @state
        new-circle (generate-circle nil x y default-radius)]
    (set-circles! state (conj circles new-circle))
    (set-undo-stack! state (conj undo-stack circles))
    (set-redo-stack! state [])
    new-circle))


(defn- adjust-diameter? [c1 c2]
  (and (same-circles? c1 c2)
       (not (equivalent-circles? c1 c2))))

(defn- commit-circle-diameter! [state]
  (let [{:keys [selected-circle circles undo-stack]} @state]
    (set-circles! state (map #(if (adjust-diameter? % selected-circle)
                                selected-circle %) circles))
    (set-undo-stack! state (conj undo-stack circles))
    (set-redo-stack! state [])))

(defn- set-selected-circle! [state c]
  (swap! state assoc :selected-circle c))

(defn- select-closest-circle! [state coords]
  (->> coords
       (get-closest-circle state)
       (#(when (not (selected? state %))
           (set-selected-circle! state %)))))

;; -------------------------
;; Popup

;; -------------------------
(defn- set-popup! [state is-visible]
  (swap! state assoc :popup-active is-visible))

(defn- set-slider! [state is-visible]
  (swap! state assoc :slider-active is-visible))

;; -------------------------
;; Controllers

;; -------------------------
(defn- on-canvas-left-click! [state e]
  (->> (get-dom-event-coords e)
       (create-circle! state)
       (set-selected-circle! state)))

(defn- on-canvas-right-click! [state e]
  (.preventDefault e)
  (when (some-circle-selected? state) (set-popup! state true)))

(defn- on-canvas-mouse-move! [state e]
  (when (not (popup-active? state))
    (->> (get-dom-event-coords e)
         (select-closest-circle! state))))

(defn- on-change-diameter! [state d]
  (let [{:keys [id x y]} (:selected-circle @state)
        r (d->r d)]
    (set-selected-circle! state (generate-circle id x y r))))

(defn- on-popup-blur! [state]
  (commit-circle-diameter! state)
  (set-selected-circle! state nil)
  (set-slider! state false)
  (set-popup! state false))

(defn- on-undo! [state]
  (undo! state))

(defn- on-redo! [state]
  (redo! state))

;; -------------------------
;; View

;; -------------------------
(defn- popup-component [state]
  (let [{:keys [x y r]} (:selected-circle @state)]
    [:form.popup {:style {:left x
                          :top y}
                  :on-blur #(on-popup-blur! state)}
     (if (slider-active? state)
       [:div.slider
        [:h3 "Adjust Diameter"]
        [:input {:type "range"
                 :min minimum-radius
                 :auto-focus true
                 :value (r->d r)
                 :on-change #(on-change-diameter! state
                                                  (.. % -target -value))}]]
       [:button.custom-button {:type "button"
                               :auto-focus true
                               :on-click #(set-slider! state true)}
        "Adjust Diameter..."])]))

(defn- circle-component [state c]
  (let [{:keys [id x y r]} c
        is-selected (selected? state c)]
    [:circle {:class (when is-selected "selected-circle")
              :key id
              :cx x
              :cy y
              :r (if is-selected (:r (:selected-circle @state)) r)}]))

(defn- canvas-component [state]
  [:div.canvas-container
   [:svg {:on-click #(on-canvas-left-click! state %)
          :on-mouse-move #(on-canvas-mouse-move! state %)
          :on-context-menu #(on-canvas-right-click! state %)}
    (doall (map #(circle-component state %) (:circles @state)))]
   (when (popup-active? state) [popup-component state])])

(defn circle-drawer-component []
  (let [state (r/atom initial-state)]
    (fn []
      [:div.task
       [:h2 "Task 6: Circle Drawer"]
       [:button.custom-button {:type "button"
                               :disabled (not (can-undo? state))
                               :on-click #(on-undo! state)} "Undo"]
       [:button.custom-button {:type "button"
                               :disabled (not (can-redo? state))
                               :on-click #(on-redo! state)} "Redo"]
       [canvas-component state]])))
