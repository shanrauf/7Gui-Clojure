(ns sevengui.views.temperature-converter
  (:require [reagent.core :as r]))

(defn- f->c [f]
  (* (- f 32) (/ 5 9)))

(defn- c->f [c]
  (+ (* c (/ 9 5)) 32))

(defn- update-temperatures [temperatures modified-temp invalidated-temp input]
  (cond
    ;; Empty input
    (= input "") (swap! temperatures assoc
                        modified-temp input
                        invalidated-temp input)
    ;; Invalid input
    (js/isNaN input) (swap! temperatures assoc modified-temp input)
    ;; Valid input
    :else (let [new_value (js/parseInt input)]
            (swap! temperatures
                   assoc
                   modified-temp new_value
                   invalidated-temp (if (= modified-temp :fahrenheit)
                                      (f->c new_value)
                                      (c->f new_value))))))

;; -------------------------
;; View

;; -------------------------
(defn- format-temp [temp]
  (if (string? temp) temp (str (Math/round (float temp)))))

(defn- temperature-input [state updated-temp val]
  (let [invalidated-temp (if (= updated-temp :celsius)
                           :fahrenheit
                           :celsius)]
    [:input {:class (when (and (not-empty val) (js/isNaN val)) "invalid-input")
             :value val
             :on-change #(update-temperatures state
                                              updated-temp
                                              invalidated-temp
                                              (.. % -target -value))}]))
(defn temperature-converter-component []
  (let [state (r/atom {:fahrenheit "" :celsius ""})]
    (fn []
      (let [{:keys [fahrenheit celsius]} @state]
        [:div.task.temperature-converter
         [:h2 "Task 2: Temperature Converter"]
         [:div.input-container
          [:label "Celsius:"]
          [temperature-input state :celsius (format-temp celsius)]]
         [:div.input-container
          [:label "Fahrenheit:"]
          [temperature-input state :fahrenheit (format-temp fahrenheit)]]]))))
