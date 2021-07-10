(ns sevengui.views.counter
  (:require [reagent.core :as r]))

(defonce click-count (r/atom 0))

(defn counter-component []
  [:div.task.counter
   [:h2 "Task 1: Counter"]
   [:div.container
    [:div.input-container
     [:input {:disabled true
              :value (str @click-count)}]
     [:button.custom-button {:on-click #(swap! click-count inc)} "Count"]]]])
