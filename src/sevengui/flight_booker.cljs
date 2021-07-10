(ns sevengui.views.flight-booker
  (:require [reagent.core :as r]))

;; -------------------------
;; Constants

;; -------------------------
(defonce one-way-flight "one-way")
(defonce return-flight "return")
(defonce date-regex #"([0-2][0-9]|3[0-1]).(0[0-9]|1[0-2]).(\d{4})")

;; -------------------------
;; Component state

;; -------------------------
(defonce flight-type (r/atom one-way-flight))
(defonce departure-date (r/atom ""))
(defonce arrival-date (r/atom ""))

;; -------------------------
;; Logic

;; -------------------------
(defn- str->date [s]
  (let [[_ day month year] (re-matches date-regex s)
        date (.parse js/Date (str month "/" day "/" year))]
    date))

(defn- valid-date-str? [s]
  (boolean (re-matches date-regex s)))

(defn- valid-departure-date? [d] (valid-date-str? d))

(defn- valid-arrival-date? [d a]
  (and (valid-date-str? a)
       (< (str->date d) (str->date a))))

(defn- update-date! [date, input]
  (reset! date input))

(defn- ready-to-submit? []
  (not (and
        (valid-departure-date? @departure-date)
        (if (= @flight-type return-flight)
          (valid-arrival-date? @departure-date @arrival-date)
          true))))

;; -------------------------
;; Controllers

;; -------------------------
(defn- on-submit [e]
  (.preventDefault e)
  (let [success-message (str "You have booked a "
                             @flight-type
                             " flight on "
                             (if (= @flight-type one-way-flight)
                               @departure-date
                               @arrival-date))]
    (js/alert success-message)))

;; -------------------------
;; View

;; -------------------------


(defn flight-booker-component []
  [:div.task.flight-booker
   [:h2 "Task 3: Flight Booker"]
   [:form.custom-form
    [:div.custom-select
     [:select {:type "select"
               :on-change #(reset! flight-type (.. % -target -value))}
      [:option {:value one-way-flight} "One-way flight"]
      [:option {:value return-flight} "Return flight"]]]
    [:div.input-container
     [:label "Departure Date:"]
     [:input {:class (when (not (valid-departure-date? @departure-date)) "invalid-input")
              :value @departure-date
              :placeholder "(e.g. 27.03.2014)"
              :on-change #(update-date! departure-date
                                        (.. % -target -value))}]]
    [:div.input-container
     [:label "Arrival Date:"]
     [:input {:class (when (and (= @flight-type return-flight)
                                (not (valid-arrival-date? @departure-date
                                                          @arrival-date))) "invalid-input")
              :value @arrival-date
              :disabled (= @flight-type one-way-flight)
              :placeholder "(e.g. 28.03.2014)"
              :on-change #(update-date! arrival-date
                                        (.. % -target -value))}]]
    [:button.custom-button {:type "button"
                            :disabled (ready-to-submit?)
                            :on-click #(on-submit %)} "Book"]]])
