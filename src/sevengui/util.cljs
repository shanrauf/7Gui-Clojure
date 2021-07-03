(ns sevengui.util)

(defonce uuid-regex #"[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}")

(defn uuid-str? [s]
  (re-matches uuid-regex s))
