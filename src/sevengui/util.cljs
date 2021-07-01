(ns sevengui.util)


(defn remove-from-vec
  [index vec]
  (into (subvec vec 0 index) (subvec vec (inc index))))