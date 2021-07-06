(ns sevengui.views.crud
  (:require [reagent.core :as r]
            [sevengui.util :refer [uuid-str?]]))

;; -------------------------
;; Model

;; -------------------------
(defn- generate-person [id name surname]
  {:id (cond
         (and (string? id) (uuid-str? id)) id
         (nil? id) (str (random-uuid))
         :else (throw (js/Error. "Id must be a UUID string")))
   :name (if (and (string? name) (not= "" name) (<= (count name) 100))
           name
           (throw (js/Error. "Name must be a non-empty string <= 100 characters")))
   :surname (if (and (string? surname) (not= "" surname) (<= (count surname) 100))
              surname
              (throw (js/Error. "Surname must be a non-empty string <= 100 characters")))})

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

;; Computed properties
(defn- valid-name? []
  (boolean (not-empty (:input-name @component-state))))

(defn- valid-surname? []
  (boolean (not-empty (:input-surname @component-state))))

(defn- valid-full-name? []
  (and (valid-name?)
       (valid-surname?)))

(defn- someone-selected? []
  (boolean (not-empty (:selected-id @component-state))))

(defn- person-selected? [p]
  (= (:id p) (:selected-id @component-state)))

(defn- can-create? []
  (valid-full-name?))

(defn- can-update? []
  (and (someone-selected?) (valid-full-name?)))

(defn- can-delete? []
  (someone-selected?))

;; -------------------------
;; People

;; -------------------------
(defn- filter-people
  [people prefix]
  (filter #(.includes (.toLowerCase (% :surname)) prefix) people))

(defn- find-person
  [id people]
  (first (keep-indexed #(when (= (:id %2) id) %1) people)))

(defn- filtered-people-list []
  (let [{:keys [input-prefix people]} @component-state]
    (if (= "" input-prefix)
      people
      (filter-people people input-prefix))))

(defn- get-first-visible-person []
  (let [{:keys [input-prefix people]} @component-state]
    (cond
      input-prefix (or (:id (first (filtered-people-list)))
                       "")
      :else (if (empty? people) "" (:id (first people))))))

;; -------------------------
;; CRUD

;; -------------------------
(defn- create-person! []
  (let [{:keys [input-name input-surname people]} @component-state
        new-person-uuid (str (random-uuid))
        new-person (generate-person new-person-uuid input-name input-surname)]
    (swap! component-state assoc :people (conj people new-person))
    new-person-uuid))

(defn- update-person! []
  (let [{:keys [input-name input-surname selected-id people]} @component-state
        new-person (generate-person selected-id input-name input-surname)]
    (swap! component-state assoc :people (vec (map #(if (person-selected? %)
                                                      new-person
                                                      %) people)))
    selected-id))

(defn- delete-person! []
  (swap! component-state assoc :people (filterv #(not (person-selected? %))
                                                (:people @component-state))))

(defn- set-selected-person! [id]
  (swap! component-state assoc :selected-id id))

(defn- select-first-visible-person! []
  (set-selected-person! (get-first-visible-person)))

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
  (swap! component-state assoc input-key new-value))

(defn- on-prefix-update! [new-value]
  (on-input-update! :input-prefix new-value)
  (select-first-visible-person!))

;; -------------------------
;; View

;; -------------------------
(defn- format-name [name surname]
  (str surname ", " name))

(defn- people-list [{:keys [items on-change]}]
  [:select {:class "people-list"
            :size 3
            :on-change on-change}
   (for [item items]
     [:option {:value (:id item)
               :key (:id item)} (format-name (:name item)
                                             (:surname item))])])

(defn crud-component []
  [:div {:class "task"}
   [:h2 "Task 5: CRUD"]
   (let [{:keys [input-name
                 input-surname
                 input-prefix
                 people]} @component-state]
     [:div.container
      [:div.input-container
       [:label "Filter prefix"]
       [:input {:value input-prefix
                :on-change #(on-prefix-update! (.. % -target -value))}]]
      [:div
       [people-list {:items (filter-people people input-prefix)
                     :on-change #(on-input-update! :selected-id
                                                   (.. % -target -value))}]]
      [:div.input-container
       [:label "Name:"]
       [:input {:class (when (not (valid-name?)) "invalid-input")
                :value input-name
                :on-change #(swap! component-state
                                   assoc
                                   :input-name
                                   (.. % -target -value))}]]
      [:div.input-container
       [:label "Surname:"]
       [:input {:class (when (not (valid-surname?)) "invalid-input")
                :value input-surname
                :on-change #(swap! component-state
                                   assoc
                                   :input-surname
                                   (.. % -target -value))}]]
      [:div.buttons
       [:button.custom-button {:disabled (not (can-create?))
                               :on-click #(on-person-action! "create")} "Create"]
       [:button.custom-button {:disabled (not (can-update?))
                               :on-click #(on-person-action! "update")} "Update"]
       [:button.custom-button {:disabled (not (can-delete?))
                               :on-click #(on-person-action! "delete")} "Delete"]]])])