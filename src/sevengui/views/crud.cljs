(ns sevengui.views.crud
  (:require [reagent.core :as r]
            [sevengui.util :refer [remove-from-vec]]))

(enable-console-print!)

;; TODO
; edge case of when person vector is empty; then no value on teh select
; when u filter, u need to select the first element on the list; hmm shouldntu  only be selecting form a fitlerd lsit to begi with?

;; if i have item 1 selected, and i click and drag to item 3 and let go, it goes back to item 1

;; there was a delete bug; i ahd my name left w/ "r" prefix and i pressed delete 2 times and only on the 2nd time it deleted
;;; check what happens when "r" prefix and u update a selection to no longer match the prefix (so it disapepars); need to re ask for
;;;; top thing then
;;;;;; I'm causing a lot of problems cuz of the weird way I compute top visible person. need to do in render i think?

;; -------------------------
;; Model

;; -------------------------
(defn generate-person [id name surname]
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
  (and (seq (:input-name @component-state))
       (seq (:input-surname @component-state))))

(defn- person-selected? []
  (seq (:selected-id @component-state)))

(defn- can-create? []
  (valid-name?))

(defn- can-update? []
  (and (person-selected?) (valid-name?)))

(defn- can-delete? []
  (person-selected?))

(defn- filter-people
  [people prefix]
  (filter #(.includes (.toLowerCase (% :surname)) prefix) people))

(defn find-person
  [id coll]
  (first (keep-indexed #(when (= (:id %2) id) %1) coll)))

(defn- filtered-people-list []
  (filter-people (:people @component-state) (:input-prefix @component-state)))

(defn- set-selected-person! [id]
  (swap! component-state assoc :selected-id id))

(defn- get-first-visible-person []
  (cond
    (:input-prefix @component-state) (or (:id (first (filtered-people-list))) "")
    :else (if (empty? (:people @component-state)) "" (:id (first (:people @component-state))))))

(defn- select-first-visible-person! []
  (set-selected-person! (get-first-visible-person)))

(defn- create-person! []
  (let [new-person-uuid (str (random-uuid))
        new-person (generate-person new-person-uuid (:input-name @component-state) (:input-surname @component-state))]
    (swap! component-state assoc :selected-id new-person-uuid :people (conj (:people @component-state) new-person))))

(defn- update-person! []
  (let [selected-person-index (find-person (:selected-id @component-state) (:people @component-state))]
    (swap! component-state assoc-in [:people selected-person-index]
           (generate-person (:selected-id @component-state) (:input-name @component-state) (:input-surname @component-state)))
    (select-first-visible-person!)))

(defn- delete-person! []
  (let [selected-person-index (find-person (:selected-id @component-state) (:people @component-state))
        new-people (remove-from-vec selected-person-index (:people @component-state))]
    (swap! component-state assoc :people new-people)
    (select-first-visible-person!)))

;; -------------------------
;; Controller

;; -------------------------
(defn- on-person-action! [action]
  (case action
    "create" (create-person!)
    "update" (update-person!)
    "delete" (delete-person!)))

(defn- on-input-update! [input-key new-value]
  (swap! component-state assoc input-key new-value))

(defn- on-prefix-update [new-value]
  (on-input-update! :input-prefix new-value)
  (select-first-visible-person!))


;; -------------------------
;; View

;; -------------------------
(defn- format-name [name surname]
  (str surname ", " name))

(defn- people-list-component
  [{:keys [people value on-change]}]
  [:div.row
   [:select.field.full-width {:size 3
                              :value value
                              :on-change on-change}
    (for [person people]
      [:option {:value (:id person)
                :key (:id person)} (format-name (:name person) (:surname person))])]])

(defn crud-component []
  [:div {:class "task"}
   [:h2 "Task 5: CRUD"]
   [:div.container
    [:div
     [:label "Filter prefix"]
     [:input {:value (:input-prefix @component-state)
              :on-change #(on-prefix-update (.. % -target -value))}]]
    [:div
     [:div
      [people-list-component {:value (:selected-id @component-state)
                              :people (filter-people (:people @component-state) (:input-prefix @component-state))
                              :on-change #(on-input-update! :selected-id (.. % -target -value))}]]
     [:div
      [:label "Name:"]
      [:input {:value (:input-name @component-state)
               :on-change #(swap! component-state assoc :input-name (.. % -target -value))}]
      [:label "Surname:"]
      [:input {:value (:input-surname @component-state)
               :on-change #(swap! component-state assoc :input-surname (.. % -target -value))}]]]
    [:div
     [:button {:disabled (not (can-create?))
               :on-click #(on-person-action! "create")} "Create"]
     [:button {:disabled (not (can-update?))
               :on-click #(on-person-action! "update")} "Update"]
     [:button {:disabled (not (can-delete?))
               :on-click #(on-person-action! "delete")} "Delete"]]]])