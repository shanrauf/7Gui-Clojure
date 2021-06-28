(defproject sevengui "0.1.0-SNAPSHOT"
  :description "7gui implementation in Clojure"

  :url "https://github.com/shanrauf"

  :dependencies [[org.clojure/clojure "1.9.0"]
                 [org.clojure/clojurescript "1.10.312"]
                 [reagent "0.10.0"]]

  :resource-paths ["resources" "target"]

  :clean-targets ^{:protect false} ["target/public"]

  :profiles {:dev {:dependencies [[com.bhauman/figwheel-main "0.2.13"]
                                  [com.bhauman/rebel-readline-cljs "0.1.4"]]}}

  :aliases {"fig"       ["trampoline" "run" "-m" "figwheel.main"]
            "fig:build" ["trampoline" "run" "-m" "figwheel.main" "-b" "sevengui" "-r"]})
