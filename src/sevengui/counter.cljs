(ns sevengui.counter
  (:require [reagent.core :as r]))

(defn counter-component []
  (let [click-count (r/atom 0)]
    (fn []
      [:div.task.counter
       [:h2 "Task 1: Counter"]
       [:div.input-container
        [:input {:disabled true
                 :value (str @click-count)}]
        [:button.custom-button {:on-click #(swap! click-count inc)} "Count"]]])))
