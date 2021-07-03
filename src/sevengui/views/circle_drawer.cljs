(ns sevengui.views.circle-drawer
  (:require [reagent.core :as r]))

; TODO
;; fix undo/redo vec->seq, refactor
;;; how do i manage how the actions of creating/updating circles should trigger an action of updating undo/redo stacks?

;; bug when a circle increases diameter and overlaps another
;;; sometimes the smaller circle is visible
;;;; i dont hve a mechanism to control lvl of visibility; maybe i should not fil in the circles black
;;; sometimes a smaller circle is under a big one and when u hover to the center of the smaller circle (which u cant see0),
;;;;;the big circle is unselected and it looks like ur selecting nothing

; should you use keep-indexed or map/filter??

;; CRUD methods should validate data b4 committing (validation logic in sep functions)

;; -------------------------
;; Constants

;; -------------------------
(defonce default-radius 10)

;; -------------------------
;; Model

;; -------------------------
(defonce canvas-state
  (r/atom {:circles []
           :selected-circle nil
           :undo-stack nil
           :redo-stack nil
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

(defn can-undo?
  []
  (seq (:undo-stack @canvas-state)))

(defn can-redo?
  []
  (seq (:redo-stack @canvas-state)))

;; -------------------------
;; Canvas History

;; -------------------------
(defn undo!
  []
  (let [s @canvas-state]
    (when (can-undo?)
      (swap! canvas-state assoc
             :popup-active false
             :selected-circle nil
             :circles (first (:undo-stack s))
             :undo-stack (rest (:undo-stack s))
             :redo-stack (conj (:redo-stack s) (:circles s))))))

(defn redo!
  []
  (let [s @canvas-state]
    (when (can-redo?)
      (swap! canvas-state assoc
             :popup-active false
             :selected-circle nil
             :circles (first (:redo-stack s))
             :redo-stack (rest (:redo-stack s))
             :undo-stack (conj (:undo-stack s) (:circles s))))))

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

(defn distance-between [x1 y1 x2 y2]
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
  {:id (or id (str (random-uuid)))
   :x x
   :y y
   :r (or r default-radius)})

(defn get-dom-event-coords [e]
  (let [t (.-currentTarget e)
        rect (.getBoundingClientRect t)
        x (- (.-clientX e) (-> rect .-left int))
        y (- (.-clientY e) (-> rect .-top int))]
    (list x y)))

(defn create-circle!
  [coords]
  (let [{:keys [circles undo-stack]} @canvas-state
        new-circle (generate-circle nil (first coords) (last coords) default-radius)]
    (swap! canvas-state assoc
           :redo-stack nil
           :popup-active false
           :circles (conj circles new-circle)
           :undo-stack (conj undo-stack circles))
    new-circle))

(defn- commit-circle-diameter! []
  (let [{:keys [selected-circle circles undo-stack]} @canvas-state]
    (swap! canvas-state assoc :circles (map #(if (and (= (:id %) (:id selected-circle))
                                                      (not= (:r %) (:r selected-circle))) selected-circle %) circles))
    (set-undo-stack! (conj undo-stack circles))
    (set-redo-stack! nil)))

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
(defn- set-popup! [visible]
  (swap! canvas-state assoc :popup-active visible))

(defn- set-slider! [visible]
  (swap! canvas-state assoc :slider-active visible))

;; -------------------------
;; Controllers

;; -------------------------
(defn on-canvas-left-click! [e]
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

(defn on-undo! []
  (undo!))

(defn on-redo! []
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