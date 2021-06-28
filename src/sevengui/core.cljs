  
(ns sevengui.core
    (:require
      [reagent.core :as r]
      [reagent.dom :as d]
      [goog.string :as gstring]
      [goog.string.format]
      [clojure.string :as str]))

(enable-console-print!)

(js/console.log "Loaded")

(defn seven-gui-roam []
  [:div {:class "title"}
   [:h1 "7GUI Clojure Implementation"]
])
(d/render [seven-gui-roam] (.getElementById js/document "app"))