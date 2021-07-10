(defproject sevengui "1.0.0"
  :description "7gui implementation in Clojure"

  :url "https://github.com/shanrauf"

  :dependencies [[org.clojure/clojure "1.10.3"]
                 [org.clojure/clojurescript "1.10.866"]
                 [reagent "1.0.0"]]

  :source-paths ["src"]

  :resource-paths ["src" "resources" "target"]

  :clean-targets ^{:protect false} ["target/public"]

  :profiles {:dev {:dependencies [[com.bhauman/figwheel-main "0.2.14-SNAPSHOT"]
                                  [rebel-readline-cljs "0.1.1-SNAPSHOT"]]}}

  :aliases {"fig"       ["trampoline" "run" "-m" "figwheel.main"]
            "fig:build" ["trampoline" "run" "-m" "figwheel.main" "-b" "sevengui" "-r"]})
