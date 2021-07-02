  
(ns sevengui.core
  (:require
   [reagent.dom :as d]
   [goog.string.format]
   [sevengui.views.counter :as counter]
   [sevengui.views.temperature-converter :as temperature-converter]
   [sevengui.views.flight-booker :as flight-booker]
   [sevengui.views.timer :as timer]
   [sevengui.views.crud :as crud]
   [sevengui.views.circle-drawer :as circle-drawer]
   [sevengui.views.cells :as cells]))

(defn seven-gui-roam []
  [:div.seven-gui-roam
   [:h1 "7GUI Clojure Implementation"]
   [:div.tasks
    [counter/counter-component]
    [temperature-converter/temperature-converter-component]
    [flight-booker/flight-booker-component]
    [timer/timer-component]
    [crud/crud-component]
    [circle-drawer/circle-drawer-component]
    [cells/cells-component]]])
(d/render [seven-gui-roam] (.getElementById js/document "app"))