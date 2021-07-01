(ns sevengui.views.timer
  (:require [reagent.core :as r]))

;; -------------------------
;; Constants

;; -------------------------
(defonce frames-per-second 60)
(defonce seconds-per-frame (/ 1 frames-per-second))
(defonce milliseconds-per-frame (/ 1000 frames-per-second))

;; -------------------------
;; Component state

;; -------------------------
(defonce timer-state (r/atom {:elapsed-time 0
                              :duration 10}))

;; -------------------------
;; Logic

;; -------------------------
(defn- update-duration!
  [state new-value]
  (swap! state assoc :duration (js/Number new-value)))


(defn- update-elapsed-time!
  [state]
  (swap! state assoc :elapsed-time (min (+ (:elapsed-time @timer-state) seconds-per-frame)
                                        (:duration @timer-state))))

(defn- start-timer []
  (js/setInterval #(update-elapsed-time! timer-state) milliseconds-per-frame))

;; -------------------------
;; View

;; -------------------------
(defn- format-elapsed-time
  [seconds]
  (-> seconds
      (/ 1)
      (.toFixed 1)
      (str "s")))

(declare timer)

(defn timer-component []
  (r/with-let [timer (start-timer)]
    [:div {:class "task"}
     [:h2 "Task 4: Timer"]
     [:div.container
      [:div {:class "elapsed-time"}
       [:label "Elapsed time:"]
       [:meter {:value (:elapsed-time @timer-state)
                :max (:duration @timer-state)}]
       [:p (format-elapsed-time (:elapsed-time @timer-state))]]
      [:div {:class "duration"}
       [:label "Duration"]
       [:input {:type "range"
                :value (:duration @timer-state)
                :min 0
                :max 100
                :on-change #(update-duration! timer-state (.. % -target -value))}]]
      [:button {:type "button"
                :on-click #(swap! timer-state assoc :elapsed-time 0)} "Reset"]]]))
