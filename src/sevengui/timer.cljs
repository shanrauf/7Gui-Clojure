(ns sevengui.views.timer
  (:require [reagent.core :as r]))

(defonce frames-per-second 60)
(defonce seconds-per-frame (/ 1 frames-per-second))
(defonce milliseconds-per-frame (/ 1000 frames-per-second))

(defn- update-duration!
  [state new-value]
  (swap! state assoc :duration (js/Number new-value)))

(defn- update-elapsed-time!
  [state]
  (swap! state
         assoc
         :elapsed-time
         (min (+ (:elapsed-time @state) seconds-per-frame)
              (:duration @state))))

(defn- start-timer [state]
  (js/setInterval #(update-elapsed-time! state)
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
                    :on-change #(update-duration! state
                                                  (.. % -target -value))}]]
          [:button.custom-button {:type "button"
                                  :on-click #(swap! state
                                                    assoc
                                                    :elapsed-time 0)} "Reset"]]])})))
