(ns sevengui.views.crud
  (:require [reagent.core :as r]
            [sevengui.util :refer [remove-from-vec]]))

;; -------------------------
;; Model

;; -------------------------
(defn- generate-person [id name surname]
  {:id (or id (str (random-uuid)))
   :name name
   :surname surname})

(defonce initial-people
  [(generate-person nil "Conor" "White-Sullivan")
   (generate-person nil "Josh" "Brown")
   (generate-person nil "Bardia" "Pourvakil")
   (generate-person nil "Shan" "Rauf")])

(defonce component-state
  (r/atom {:people (vec initial-people)
           :input-name ""
           :input-surname ""
           :input-prefix ""
           :selected-id (:id (first initial-people))}))

(defn- valid-name? []
  (boolean (not-empty (:input-name @component-state))))

(defn- valid-surname? []
  (boolean (not-empty (:input-surname @component-state))))

(defn- valid-full-name? []
  (and (valid-name?)
       (valid-surname?)))

(defn- person-selected? []
  (boolean (not-empty (:selected-id @component-state))))

(defn- can-create? []
  (valid-full-name?))

(defn- can-update? []
  (and (person-selected?) (valid-full-name?)))

(defn- can-delete? []
  (person-selected?))

(defn- filter-people
  [people prefix]
  (filter #(.includes (.toLowerCase (% :surname)) prefix) people))

(defn- find-person
  [id coll]
  (first (keep-indexed #(when (= (:id %2) id) %1) coll)))

(defn- filtered-people-list []
  (let [{:keys [input-prefix people]} @component-state]
    (if (= "" input-prefix) people (filter-people people input-prefix))))

(defn- set-selected-person! [id]
  (swap! component-state assoc :selected-id id))

(defn- get-first-visible-person []
  (let [{:keys [input-prefix people]} @component-state]
    (cond
      input-prefix (or (:id (first (filtered-people-list)))
                       "")
      :else (if (empty? people) "" (:id (first people))))))

(defn- select-first-visible-person! []
  (set-selected-person! (get-first-visible-person)))

(defn- create-person! []
  (let [{:keys [input-name input-surname people]} @component-state
        new-person-uuid (str (random-uuid))
        new-person (generate-person new-person-uuid input-name input-surname)]
    (swap! component-state assoc :people (conj people new-person))
    new-person-uuid))

(defn- update-person! []
  (let [{:keys [input-name input-surname selected-id people]} @component-state
        selected-person-index (find-person selected-id people)
        new-person (generate-person selected-id input-name input-surname)]
    (swap! component-state assoc-in [:people selected-person-index] new-person)
    selected-id))

(defn- delete-person! []
  (let [{:keys [selected-id people]} @component-state
        selected-person-index (find-person selected-id people)
        new-people (remove-from-vec selected-person-index people)]
    (swap! component-state assoc :people new-people)))


;; -------------------------
;; Controller

;; -------------------------
(defn- on-person-action! [action]
  (case action
    "create" (-> (create-person!)
                 (set-selected-person!))
    "update" (-> (update-person!)
                 (find-person (filtered-people-list))
                 (when-not (select-first-visible-person!)))
    "delete" ((delete-person!)
              (select-first-visible-person!))))

(defn- on-input-update! [input-key new-value]
  (js/console.log new-value)
  (swap! component-state assoc input-key new-value))

(defn- on-prefix-update! [new-value]
  (on-input-update! :input-prefix new-value)
  (select-first-visible-person!))

;; -------------------------
;; View

;; -------------------------
(defn- format-name [name surname]
  (str surname ", " name))

(defn- people-list
  [{:keys [items value on-change]}]
  [:div
   [:select {:size 3
             :value value
             :on-change on-change}
    (for [item items]
      [:option {:value (:id item)
                :key (:id item)} (format-name (:name item)
                                              (:surname item))])]])

(defn crud-component []
  [:div {:class "task"}
   [:h2 "Task 5: CRUD"]
   (let [{:keys [input-name
                 input-surname
                 selected-id
                 input-prefix
                 people]} @component-state]
     [:div.container
      [:div
       [:label "Filter prefix"]
       [:input {:value input-prefix
                :on-change #(on-prefix-update! (.. % -target -value))}]]
      [:div
       [:div
        [people-list {:value selected-id
                      :items (filter-people people input-prefix)
                      :on-change #(on-input-update! :selected-id
                                                    (.. % -target -value))}]]
       [:div
        [:label "Name:"]
        [:input {:class (when (not (valid-name?)) "invalid-input")
                 :value input-name
                 :on-change #(swap! component-state
                                    assoc
                                    :input-name
                                    (.. % -target -value))}]
        [:label "Surname:"]
        [:input {:class (when (not (valid-surname?)) "invalid-input")
                 :value input-surname
                 :on-change #(swap! component-state
                                    assoc
                                    :input-surname
                                    (.. % -target -value))}]]]
      [:div
       [:button {:disabled (not (can-create?))
                 :on-click #(on-person-action! "create")} "Create"]
       [:button {:disabled (not (can-update?))
                 :on-click #(on-person-action! "update")} "Update"]
       [:button {:disabled (not (can-delete?))
                 :on-click #(on-person-action! "delete")} "Delete"]]])])