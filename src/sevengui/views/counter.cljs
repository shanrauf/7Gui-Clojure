(ns sevengui.views.counter
  (:require [reagent.core :as r]))


(def click-count (r/atom 0))

(defn counter-component []
  [:div {:class "task"}
   [:h2 "Task 1: Counter"]
   [:input {:disabled true :value (str @click-count)}]
   [:button {:on-click #(swap! click-count inc)} "Count"]])
