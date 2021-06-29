(ns sevengui.views.temperature-converter
  (:require [reagent.core :as r]))


(comment "TODO: validate inputs; don't update other value if entered value is invalid;
          validator for the fahrenheit and celsius value prob?")

(enable-console-print!)

(def temperatures (r/atom {:fahrenheit 41 :celsius 5}))

(defn fahrenheit-to-celsius [fahrenheit]
  (* (- fahrenheit 32) (/ 5 9)))

(defn celsius-to-fahrenheit [celsius]
  (+ (* celsius (/ 9 5)) 32))

(comment "TODO: This feels unclean cuz you call the same if statement twice and ref :fahrenheit/:celsius raw....")
(defn update_temperatures [param, new_value]
  (swap! temperatures (fn [data]
                        (-> data
                            (assoc param new_value)
                            (assoc (if (= param :fahrenheit) :celsius :fahrenheit) (if (= param :fahrenheit) (celsius-to-fahrenheit new_value) (fahrenheit-to-celsius new_value)))))))


(defn temperature-input [param val]
  [:input {:value val :on-change (fn [e]
                                   (update_temperatures param (js/parseInt (.. e -target -value))))}])

(defn format-temperature [temp]
  (str (Math/round (float temp))))


(defn temperature-converter-component []
  (let [{:keys [fahrenheit celsius]} @temperatures]
    [:div {:class "task"}
     [:h2 "Task 2: Temperature Converter"]
     [:div {:class "temperature-converter"}
      [:div {:class "temperature"}
       [:label "Celsius"]
       [temperature-input :celsius (format-temperature celsius)]]
      [:div {:class "temperature"}
       [:label "Fahrenheit"]
       [temperature-input :fahrenheit (format-temperature fahrenheit)]]]]))
