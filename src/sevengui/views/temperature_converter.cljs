(ns sevengui.views.temperature-converter
  (:require [reagent.core :as r]))

;; -------------------------
;; Logic

;; -------------------------
(def temperatures (r/atom {:fahrenheit "" :celsius ""}))

(defn fahrenheit-to-celsius [f]
  (* (- f 32) (/ 5 9)))

(defn celsius-to-fahrenheit [c]
  (+ (* c (/ 9 5)) 32))

(defn update-temperatures [modified-temp invalidated-temp input]
  (cond
    ;; Empty input
    (= input "") (swap! temperatures assoc modified-temp input invalidated-temp input)
    ;; Invalid input
    (js/isNaN input) (swap! temperatures assoc modified-temp input)
    ;; Valid input
    :else (let [new_value (js/parseInt input)]
            (swap! temperatures
                   assoc
                   modified-temp new_value
                   invalidated-temp (if (= modified-temp :fahrenheit)
                                      (celsius-to-fahrenheit new_value)
                                      (fahrenheit-to-celsius new_value))))))

;; -------------------------
;; View

;; -------------------------
(defn format-temperature [temp]
  (if (string? temp) temp (str (Math/round (float temp)))))

(defn temperature-input-component [updated-temp invalidated-temp val]
  [:input {:value val
           :on-change #(update-temperatures updated-temp
                                            invalidated-temp
                                            (.. % -target -value))}])

(defn temperature-converter-component []
  (let [{:keys [fahrenheit celsius]} @temperatures]
    [:div {:class "task"}
     [:h2 "Task 2: Temperature Converter"]
     [:div {:class "temperature-converter"}
      [:div {:class "temperature"}
       [:label "Celsius"]
       [temperature-input-component :celsius :fahrenheit (format-temperature celsius)]]
      [:div {:class "temperature"}
       [:label "Fahrenheit"]
       [temperature-input-component :fahrenheit :celsius (format-temperature fahrenheit)]]]]))
