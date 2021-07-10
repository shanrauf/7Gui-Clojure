(ns sevengui.timer
  (:require [reagent.core :as r]))

(defonce frames-per-second 60)
(defonce seconds-per-frame (/ 1 frames-per-second))
(defonce milliseconds-per-frame (/ 1000 frames-per-second))

(defn- set-elapsed-time! [state time]
  (swap! state assoc :elapsed-time time))

(defn- set-duration! [state new-value]
  (swap! state assoc :duration (js/Number new-value)))

(defn- tick-elapsed-time! [state]
  (set-elapsed-time! state
                     (min (+ (:elapsed-time @state) seconds-per-frame)
                          (:duration @state))))

(defn- start-timer [state]
  (js/setInterval #(tick-elapsed-time! state)
                  milliseconds-per-frame))

;; -------------------------
;; View

;; -------------------------
(defn- format-elapsed-time
  [seconds]
  (-> seconds
      (/ 1)
      (.toFixed 1)
      (str "s")))

(defn timer-component []
  (let [state (r/atom {:elapsed-time 0
                       :duration 10})]
    (r/create-class
     {:component-did-mount #(start-timer state)
      :reagent-render
      (fn []
        [:div.task.timer
         [:h2 "Task 4: Timer"]
         [:div.container
          [:div.elapsed-time
           [:label "Elapsed time:"]
           [:meter {:value (:elapsed-time @state)
                    :max (:duration @state)}]
           [:p (format-elapsed-time (:elapsed-time @state))]]
          [:div.input-container
           [:label "Duration"]
           [:input {:type "range"
                    :value (:duration @state)
                    :min 0
                    :max 100
                    :on-change #(set-duration! state
                                               (.. % -target -value))}]]
          [:button.custom-button {:type "button"
                                  :on-click #(set-elapsed-time! state 0)}
           "Reset"]]])})))
