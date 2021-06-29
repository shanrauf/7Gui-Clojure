  
(ns sevengui.core
  (:require
   [reagent.dom :as d]
   [goog.string.format]
   [sevengui.views.counter :as counter]
   [sevengui.views.temperature-converter :as temperature-converter]))

(enable-console-print!)

(js/console.log "Loaded")

(defn seven-gui-roam []
  [:div {:class "title"}
   [:h1 "7GUI Clojure Implementation"]
   [counter/counter-component]
   [temperature-converter/temperature-converter-component]])
(d/render [seven-gui-roam] (.getElementById js/document "app"))