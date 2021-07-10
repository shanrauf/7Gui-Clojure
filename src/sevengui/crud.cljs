(ns sevengui.views.crud
  (:require [reagent.core :as r]
            [sevengui.util :refer [uuid-str?]]))

;; -------------------------
;; People

;; -------------------------
(defn- generate-person [id name surname]
  {:id (cond
         (and (string? id) (uuid-str? id)) id
         (nil? id) (str (random-uuid))
         :else (throw (js/Error. "Id must be a UUID string")))
   :name (if (and (string? name)
                  (not= "" name)
                  (<= (count name) 100))
           name
           (throw (js/Error. "Name must be a string <= 100 chars")))
   :surname (if (and (string? surname)
                     (not= "" surname)
                     (<= (count surname) 100))
              surname
              (throw (js/Error. "Surname must be a string <= 100 chars")))})

(defonce initial-people
  [(generate-person nil "Conor" "White-Sullivan")
   (generate-person nil "Josh" "Brown")
   (generate-person nil "Bardia" "Pourvakil")
   (generate-person nil "Shan" "Rauf")])

(defonce initial-state {:people (vec initial-people)
                        :input-name ""
                        :input-surname ""
                        :input-prefix ""
                        :selected-id (:id (first initial-people))})

;; Computed properties
(defn- valid-name? [state]
  (boolean (not-empty (:input-name @state))))

(defn- valid-surname? [state]
  (boolean (not-empty (:input-surname @state))))

(defn- valid-full-name? [state]
  (and (valid-name? state)
       (valid-surname? state)))

(defn- someone-selected? [state]
  (boolean (not-empty (:selected-id @state))))

(defn- person-selected? [state p]
  (= (:id p) (:selected-id @state)))

(defn- can-create? [state]
  (valid-full-name? state))

(defn- can-update? [state]
  (and (someone-selected? state) (valid-full-name? state)))

(defn- can-delete? [state]
  (someone-selected? state))

(defn- filter-people
  [people prefix]
  (filter #(.includes (.toLowerCase (% :surname)) prefix) people))

(defn- find-person
  [id people]
  (first (keep-indexed #(when (= (:id %2) id) %1) people)))

(defn- filtered-people-list [state]
  (let [{:keys [input-prefix people]} @state]
    (if (= "" input-prefix)
      people
      (filter-people people input-prefix))))

(defn- get-first-visible-person [state]
  (let [{:keys [input-prefix people]} @state]
    (cond
      input-prefix (or (:id (first (filtered-people-list state)))
                       "")
      (empty? people) ""
      :else (:id (first people)))))

;; -------------------------
;; CRUD

;; -------------------------
(defn- create-person! [state]
  (let [{:keys [input-name input-surname people]} @state
        new-person-uuid (str (random-uuid))
        new-person (generate-person new-person-uuid input-name input-surname)]
    (swap! state assoc :people (conj people new-person))
    new-person-uuid))

(defn- update-person! [state]
  (let [{:keys [input-name input-surname selected-id people]} @state
        new-person (generate-person selected-id input-name input-surname)]
    (swap! state assoc :people (vec (map #(if (person-selected? state %)
                                            new-person
                                            %) people)))
    selected-id))

(defn- delete-person! [state]
  (swap! state assoc :people (filterv #(not (person-selected? state %))
                                      (:people @state))))

(defn- set-selected-person! [state id]
  (swap! state assoc :selected-id id))

(defn- set-input-name! [state name]
  (swap! state assoc :input-name name))

(defn- set-input-surname! [state surname]
  (swap! state assoc :input-surname surname))

(defn- select-first-visible-person! [state]
  (set-selected-person! state (get-first-visible-person state)))

;; -------------------------
;; Controller

;; -------------------------
(defn- on-person-action! [state action]
  (case action
    "create" (->> (create-person! state)
                  (set-selected-person! state))
    "update" (-> (update-person! state)
                 (find-person (filtered-people-list state))
                 (when-not (select-first-visible-person! state)))
    "delete" ((delete-person! state)
              (select-first-visible-person! state))))

(defn- on-input-update! [state input-key new-value]
  (swap! state assoc input-key new-value))

(defn- on-prefix-update! [state new-value]
  (on-input-update! state :input-prefix new-value)
  (select-first-visible-person! state))

;; -------------------------
;; View

;; -------------------------
(defn- format-name [name surname]
  (str surname ", " name))

(defn- people-list [{:keys [value people on-change]}]
  [:select.people-list {:size 3
                        :value value
                        :on-change on-change}
   (for [person people]
     [:option {:value (:id person)
               :key (:id person)} (format-name (:name person)
                                               (:surname person))])])

(defn crud-component []
  (let [state (r/atom initial-state)]
    (fn []
      (let [{:keys [input-name
                    input-surname
                    input-prefix
                    selected-id
                    people]} @state]
        [:div.task
         [:h2 "Task 5: CRUD"]

         [:div.input-container
          [:label "Filter prefix"]
          [:input {:value input-prefix
                   :on-change #(on-prefix-update! state
                                                  (.. % -target -value))}]]
         [people-list {:people (filter-people people input-prefix)
                       :value selected-id
                       :on-change #(on-input-update! state
                                                     :selected-id
                                                     (.. % -target -value))}]
         [:div.input-container
          [:label "Name:"]
          [:input {:class (when (not (valid-name? state)) "invalid-input")
                   :value input-name
                   :on-change #(set-input-name! state
                                                (.. % -target -value))}]]
         [:div.input-container
          [:label "Surname:"]
          [:input {:class (when (not (valid-surname? state)) "invalid-input")
                   :value input-surname
                   :on-change #(set-input-surname! state
                                                   (.. % -target -value))}]]
         [:div.buttons
          [:button.custom-button {:disabled (not (can-create? state))
                                  :on-click #(on-person-action! state
                                                                "create")}
           "Create"]
          [:button.custom-button {:disabled (not (can-update? state))
                                  :on-click #(on-person-action! state
                                                                "update")}
           "Update"]
          [:button.custom-button {:disabled (not (can-delete? state))
                                  :on-click #(on-person-action! state
                                                                "delete")}
           "Delete"]]]))))
