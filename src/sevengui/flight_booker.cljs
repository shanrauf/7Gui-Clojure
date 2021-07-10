(ns sevengui.flight-booker
  (:require [reagent.core :as r]))

(defonce one-way-flight "one-way")
(defonce return-flight "return")
(defonce date-regex #"([0-2][0-9]|3[0-1]).(0[0-9]|1[0-2]).(\d{4})")

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

(defn- set-flight-type! [state type]
  (swap! state assoc :flight-type type))

(defn- set-departure-date! [state date]
  (swap! state assoc :departure-date date))

(defn- set-arrival-date! [state date]
  (swap! state assoc :arrival-date date))

(defn- ready-to-submit? [flight-type departure-date arrival-date]
  (not (and
        (valid-departure-date? departure-date)
        (if (= flight-type return-flight)
          (valid-arrival-date? departure-date arrival-date)
          true))))

;; -------------------------
;; Controllers

;; -------------------------
(defn- on-submit [e flight-type departure-date arrival-date]
  (.preventDefault e)
  (let [success-message (str "You have booked a "
                             flight-type
                             " flight on "
                             (if (= flight-type one-way-flight)
                               departure-date
                               arrival-date))]
    (js/alert success-message)))

;; -------------------------
;; View

;; -------------------------


(defn flight-booker-component []
  (let [state (r/atom {:flight-type one-way-flight
                       :departure-date ""
                       :arrival-date ""})]
    (fn []
      [:div.task.flight-booker
       [:h2 "Task 3: Flight Booker"]
       (let [{:keys [flight-type departure-date arrival-date]} @state]
         [:form.custom-form
          [:div.custom-select
           [:select {:type "select"
                     :on-change #(set-flight-type! state
                                                   (.. % -target -value))}
            [:option {:value one-way-flight} "One-way flight"]
            [:option {:value return-flight} "Return flight"]]]
          [:div.input-container
           [:label "Departure Date:"]
           [:input {:class (when (not (valid-departure-date? departure-date))
                             "invalid-input")
                    :value departure-date
                    :placeholder "(e.g. 27.03.2014)"
                    :on-change #(set-departure-date! state
                                                     (.. % -target -value))}]]
          [:div.input-container
           [:label "Arrival Date:"]
           [:input {:class (when (and (= flight-type return-flight)
                                      (not (valid-arrival-date? departure-date
                                                                arrival-date)))
                             "invalid-input")
                    :value arrival-date
                    :disabled (= flight-type one-way-flight)
                    :placeholder "(e.g. 28.03.2014)"
                    :on-change #(set-arrival-date! state
                                                   (.. % -target -value))}]]
          [:button.custom-button {:type "button"
                                  :disabled (ready-to-submit? flight-type
                                                              departure-date
                                                              arrival-date)
                                  :on-click #(on-submit %
                                                        flight-type
                                                        departure-date
                                                        arrival-date)}
           "Book"]])])))
