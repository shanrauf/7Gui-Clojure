(ns sevengui.views.temperature-converter
  (:require [reagent.core :as r]))

;; -------------------------
;; Logic

;; -------------------------
(def temperatures (r/atom {:fahrenheit "" :celsius ""}))

(defn fahrenheit-to-celsius [fahrenheit]
  (* (- fahrenheit 32) (/ 5 9)))

(defn celsius-to-fahrenheit [celsius]
  (+ (* celsius (/ 9 5)) 32))

;; Implemented exactly how the spec specifies
(defn update_temperatures [param invalidates input]
  (cond
    ;; Empty input
    (= input "") (swap! temperatures (fn [data] (-> data (assoc param input) (assoc invalidates input))))
    ;; Invalid input
    (js/isNaN input) (swap! temperatures (fn [data] (assoc data param input)))
    ;; Valid input
    :else (let [new_value (js/parseInt input)]
            (swap! temperatures (fn [data] (-> data (assoc param (js/parseInt new_value)) (assoc invalidates (if (= param :fahrenheit) (celsius-to-fahrenheit new_value) (fahrenheit-to-celsius new_value)))))))))


;; -------------------------
;; View

;; -------------------------
(defn temperature-input [param invalidates val]
  [:input {:value val :on-change (fn [e]
                                   (update_temperatures param, invalidates (.. e -target -value)))}])

(defn format-temperature [temp]
  (if (string? temp) temp (str (Math/round (float temp)))))


(defn temperature-converter-component []
  (let [{:keys [fahrenheit celsius]} @temperatures]
    [:div {:class "task"}
     [:h2 "Task 2: Temperature Converter"]
     [:div {:class "temperature-converter"}
      [:div {:class "temperature"}
       [:label "Celsius"]
       [temperature-input :celsius :fahrenheit (format-temperature celsius)]]
      [:div {:class "temperature"}
       [:label "Fahrenheit"]
       [temperature-input :fahrenheit :celsius (format-temperature fahrenheit)]]]]))
