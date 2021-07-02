(ns sevengui.views.temperature-converter
  (:require [reagent.core :as r]))

;; -------------------------
;; Component state

;; -------------------------
(defonce temperatures (r/atom {:fahrenheit "" :celsius ""}))

;; -------------------------
;; Logic

;; -------------------------
(defn- f->c [f]
  (* (- f 32) (/ 5 9)))

(defn- c->f [c]
  (+ (* c (/ 9 5)) 32))

(defn- update-temperatures [modified-temp invalidated-temp input]
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
                                      (f->c new_value)
                                      (c->f new_value))))))

;; -------------------------
;; View

;; -------------------------
(defn- format-temperature [temp]
  (if (string? temp) temp (str (Math/round (float temp)))))

(defn- temperature-input-component [updated-temp invalidated-temp val]
  [:input {:value val
           :on-change #(update-temperatures updated-temp
                                            invalidated-temp
                                            (.. % -target -value))}])
(defn temperature-converter-component []
  [:div.task.temperature-converter
   [:h2 "Task 2: Temperature Converter"]
   (let [{:keys [fahrenheit celsius]} @temperatures]
     [:div.container
      [:div {:class "temperature"}
       [:label "Celsius"]
       [temperature-input-component :celsius :fahrenheit (format-temperature celsius)]]
      [:div {:class "temperature"}
       [:label "Fahrenheit"]
       [temperature-input-component :fahrenheit :celsius (format-temperature fahrenheit)]]])])
