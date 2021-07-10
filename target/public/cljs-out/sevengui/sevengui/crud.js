// Compiled by ClojureScript 1.10.866 {:static-fns true, :optimize-constants true, :optimizations :advanced}
goog.provide('sevengui.crud');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('reagent.core');
goog.require('sevengui.util');
sevengui.crud.generate_person = (function sevengui$crud$generate_person(id,name,surname){
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$id,((((typeof id === 'string') && (sevengui.util.uuid_str_QMARK_(id))))?id:(((id == null))?cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.random_uuid()):(function(){throw (new Error("Id must be a UUID string"))})()
)),cljs.core.cst$kw$name,((((typeof name === 'string') && (((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("",name)) && ((cljs.core.count(name) <= (100)))))))?name:(function(){throw (new Error("Name must be a string <= 100 chars"))})()),cljs.core.cst$kw$surname,((((typeof surname === 'string') && (((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("",surname)) && ((cljs.core.count(surname) <= (100)))))))?surname:(function(){throw (new Error("Surname must be a string <= 100 chars"))})())], null);
});
if((typeof sevengui !== 'undefined') && (typeof sevengui.crud !== 'undefined') && (typeof sevengui.crud.initial_people !== 'undefined')){
} else {
sevengui.crud.initial_people = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [sevengui.crud.generate_person(null,"Conor","White-Sullivan"),sevengui.crud.generate_person(null,"Josh","Brown"),sevengui.crud.generate_person(null,"Bardia","Pourvakil"),sevengui.crud.generate_person(null,"Shan","Rauf")], null);
}
if((typeof sevengui !== 'undefined') && (typeof sevengui.crud !== 'undefined') && (typeof sevengui.crud.initial_state !== 'undefined')){
} else {
sevengui.crud.initial_state = new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$people,cljs.core.vec(sevengui.crud.initial_people),cljs.core.cst$kw$input_DASH_name,"",cljs.core.cst$kw$input_DASH_surname,"",cljs.core.cst$kw$input_DASH_prefix,"",cljs.core.cst$kw$selected_DASH_id,cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(cljs.core.first(sevengui.crud.initial_people))], null);
}
sevengui.crud.valid_name_QMARK_ = (function sevengui$crud$valid_name_QMARK_(state){
return cljs.core.boolean$(cljs.core.not_empty(cljs.core.cst$kw$input_DASH_name.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state))));
});
sevengui.crud.valid_surname_QMARK_ = (function sevengui$crud$valid_surname_QMARK_(state){
return cljs.core.boolean$(cljs.core.not_empty(cljs.core.cst$kw$input_DASH_surname.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state))));
});
sevengui.crud.valid_full_name_QMARK_ = (function sevengui$crud$valid_full_name_QMARK_(state){
return ((sevengui.crud.valid_name_QMARK_(state)) && (sevengui.crud.valid_surname_QMARK_(state)));
});
sevengui.crud.someone_selected_QMARK_ = (function sevengui$crud$someone_selected_QMARK_(state){
return cljs.core.boolean$(cljs.core.not_empty(cljs.core.cst$kw$selected_DASH_id.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state))));
});
sevengui.crud.person_selected_QMARK_ = (function sevengui$crud$person_selected_QMARK_(state,p){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(p),cljs.core.cst$kw$selected_DASH_id.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state)));
});
sevengui.crud.can_create_QMARK_ = (function sevengui$crud$can_create_QMARK_(state){
return sevengui.crud.valid_full_name_QMARK_(state);
});
sevengui.crud.can_update_QMARK_ = (function sevengui$crud$can_update_QMARK_(state){
return ((sevengui.crud.someone_selected_QMARK_(state)) && (sevengui.crud.valid_full_name_QMARK_(state)));
});
sevengui.crud.can_delete_QMARK_ = (function sevengui$crud$can_delete_QMARK_(state){
return sevengui.crud.someone_selected_QMARK_(state);
});
sevengui.crud.filter_people = (function sevengui$crud$filter_people(people,prefix){
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__13997_SHARP_){
return (function (){var G__13998 = cljs.core.cst$kw$surname;
return (p1__13997_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__13997_SHARP_.cljs$core$IFn$_invoke$arity$1(G__13998) : p1__13997_SHARP_.call(null,G__13998));
})().toLowerCase().includes(prefix);
}),people);
});
sevengui.crud.find_person = (function sevengui$crud$find_person(id,people){
return cljs.core.first(cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$2((function (p1__14000_SHARP_,p2__13999_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(p2__13999_SHARP_),id)){
return p1__14000_SHARP_;
} else {
return null;
}
}),people));
});
sevengui.crud.filtered_people_list = (function sevengui$crud$filtered_people_list(state){
var map__14001 = cljs.core.deref(state);
var map__14001__$1 = cljs.core.__destructure_map(map__14001);
var input_prefix = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14001__$1,cljs.core.cst$kw$input_DASH_prefix);
var people = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14001__$1,cljs.core.cst$kw$people);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("",input_prefix)){
return people;
} else {
return sevengui.crud.filter_people(people,input_prefix);
}
});
sevengui.crud.get_first_visible_person = (function sevengui$crud$get_first_visible_person(state){
var map__14002 = cljs.core.deref(state);
var map__14002__$1 = cljs.core.__destructure_map(map__14002);
var input_prefix = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14002__$1,cljs.core.cst$kw$input_DASH_prefix);
var people = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14002__$1,cljs.core.cst$kw$people);
if(cljs.core.truth_(input_prefix)){
var or__4223__auto__ = cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(cljs.core.first(sevengui.crud.filtered_people_list(state)));
if(cljs.core.truth_(or__4223__auto__)){
return or__4223__auto__;
} else {
return "";
}
} else {
if(cljs.core.empty_QMARK_(people)){
return "";
} else {
return cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(cljs.core.first(people));

}
}
});
sevengui.crud.create_person_BANG_ = (function sevengui$crud$create_person_BANG_(state){
var map__14003 = cljs.core.deref(state);
var map__14003__$1 = cljs.core.__destructure_map(map__14003);
var input_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14003__$1,cljs.core.cst$kw$input_DASH_name);
var input_surname = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14003__$1,cljs.core.cst$kw$input_DASH_surname);
var people = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14003__$1,cljs.core.cst$kw$people);
var new_person_uuid = cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.random_uuid());
var new_person = sevengui.crud.generate_person(new_person_uuid,input_name,input_surname);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,cljs.core.cst$kw$people,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(people,new_person));

return new_person_uuid;
});
sevengui.crud.update_person_BANG_ = (function sevengui$crud$update_person_BANG_(state){
var map__14005 = cljs.core.deref(state);
var map__14005__$1 = cljs.core.__destructure_map(map__14005);
var input_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14005__$1,cljs.core.cst$kw$input_DASH_name);
var input_surname = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14005__$1,cljs.core.cst$kw$input_DASH_surname);
var selected_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14005__$1,cljs.core.cst$kw$selected_DASH_id);
var people = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14005__$1,cljs.core.cst$kw$people);
var new_person = sevengui.crud.generate_person(selected_id,input_name,input_surname);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,cljs.core.cst$kw$people,cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__14004_SHARP_){
if(sevengui.crud.person_selected_QMARK_(state,p1__14004_SHARP_)){
return new_person;
} else {
return p1__14004_SHARP_;
}
}),people)));

return selected_id;
});
sevengui.crud.delete_person_BANG_ = (function sevengui$crud$delete_person_BANG_(state){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,cljs.core.cst$kw$people,cljs.core.filterv((function (p1__14006_SHARP_){
return (!(sevengui.crud.person_selected_QMARK_(state,p1__14006_SHARP_)));
}),cljs.core.cst$kw$people.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state))));
});
sevengui.crud.set_selected_person_BANG_ = (function sevengui$crud$set_selected_person_BANG_(state,id){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,cljs.core.cst$kw$selected_DASH_id,id);
});
sevengui.crud.set_input_name_BANG_ = (function sevengui$crud$set_input_name_BANG_(state,name){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,cljs.core.cst$kw$input_DASH_name,name);
});
sevengui.crud.set_input_surname_BANG_ = (function sevengui$crud$set_input_surname_BANG_(state,surname){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,cljs.core.cst$kw$input_DASH_surname,surname);
});
sevengui.crud.select_first_visible_person_BANG_ = (function sevengui$crud$select_first_visible_person_BANG_(state){
return sevengui.crud.set_selected_person_BANG_(state,sevengui.crud.get_first_visible_person(state));
});
sevengui.crud.select_person_or_first_visible_BANG_ = (function sevengui$crud$select_person_or_first_visible_BANG_(state,id){
if(cljs.core.not(sevengui.crud.find_person(id,sevengui.crud.filtered_people_list(state)))){
return sevengui.crud.select_first_visible_person_BANG_(state);
} else {
return sevengui.crud.set_selected_person_BANG_(state,id);
}
});
sevengui.crud.on_person_action_BANG_ = (function sevengui$crud$on_person_action_BANG_(state,action){
var G__14007 = action;
switch (G__14007) {
case "create":
return sevengui.crud.select_person_or_first_visible_BANG_(state,sevengui.crud.create_person_BANG_(state));

break;
case "update":
return sevengui.crud.select_person_or_first_visible_BANG_(state,sevengui.crud.update_person_BANG_(state));

break;
case "delete":
var G__14009 = sevengui.crud.select_first_visible_person_BANG_(state);
var fexpr__14008 = sevengui.crud.delete_person_BANG_(state);
return (fexpr__14008.cljs$core$IFn$_invoke$arity$1 ? fexpr__14008.cljs$core$IFn$_invoke$arity$1(G__14009) : fexpr__14008.call(null,G__14009));

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__14007)].join('')));

}
});
sevengui.crud.on_input_update_BANG_ = (function sevengui$crud$on_input_update_BANG_(state,input_key,new_value){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,input_key,new_value);
});
sevengui.crud.on_prefix_update_BANG_ = (function sevengui$crud$on_prefix_update_BANG_(state,new_value){
sevengui.crud.on_input_update_BANG_(state,cljs.core.cst$kw$input_DASH_prefix,new_value);

return sevengui.crud.select_first_visible_person_BANG_(state);
});
sevengui.crud.format_name = (function sevengui$crud$format_name(name,surname){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(surname),", ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join('');
});
sevengui.crud.people_list = (function sevengui$crud$people_list(p__14011){
var map__14012 = p__14011;
var map__14012__$1 = cljs.core.__destructure_map(map__14012);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14012__$1,cljs.core.cst$kw$value);
var people = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14012__$1,cljs.core.cst$kw$people);
var on_change = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14012__$1,cljs.core.cst$kw$on_DASH_change);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$select$people_DASH_list,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$size,(3),cljs.core.cst$kw$value,value,cljs.core.cst$kw$on_DASH_change,on_change], null),(function (){var iter__4622__auto__ = (function sevengui$crud$people_list_$_iter__14013(s__14014){
return (new cljs.core.LazySeq(null,(function (){
var s__14014__$1 = s__14014;
while(true){
var temp__5753__auto__ = cljs.core.seq(s__14014__$1);
if(temp__5753__auto__){
var s__14014__$2 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(s__14014__$2)){
var c__4620__auto__ = cljs.core.chunk_first(s__14014__$2);
var size__4621__auto__ = cljs.core.count(c__4620__auto__);
var b__14016 = cljs.core.chunk_buffer(size__4621__auto__);
if((function (){var i__14015 = (0);
while(true){
if((i__14015 < size__4621__auto__)){
var person = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__4620__auto__,i__14015);
cljs.core.chunk_append(b__14016,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$value,cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(person),cljs.core.cst$kw$key,cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(person)], null),sevengui.crud.format_name(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(person),cljs.core.cst$kw$surname.cljs$core$IFn$_invoke$arity$1(person))], null));

var G__14017 = (i__14015 + (1));
i__14015 = G__14017;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__14016),sevengui$crud$people_list_$_iter__14013(cljs.core.chunk_rest(s__14014__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__14016),null);
}
} else {
var person = cljs.core.first(s__14014__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$value,cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(person),cljs.core.cst$kw$key,cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(person)], null),sevengui.crud.format_name(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(person),cljs.core.cst$kw$surname.cljs$core$IFn$_invoke$arity$1(person))], null),sevengui$crud$people_list_$_iter__14013(cljs.core.rest(s__14014__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4622__auto__(people);
})()], null);
});
sevengui.crud.crud_component = (function sevengui$crud$crud_component(){
var state = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(sevengui.crud.initial_state);
return (function (){
var map__14022 = cljs.core.deref(state);
var map__14022__$1 = cljs.core.__destructure_map(map__14022);
var input_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14022__$1,cljs.core.cst$kw$input_DASH_name);
var input_surname = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14022__$1,cljs.core.cst$kw$input_DASH_surname);
var input_prefix = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14022__$1,cljs.core.cst$kw$input_DASH_prefix);
var selected_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14022__$1,cljs.core.cst$kw$selected_DASH_id);
var people = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14022__$1,cljs.core.cst$kw$people);
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$task,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h2,"Task 5: CRUD"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$input_DASH_container,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,"Filter prefix"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$value,input_prefix,cljs.core.cst$kw$on_DASH_change,(function (p1__14018_SHARP_){
return sevengui.crud.on_prefix_update_BANG_(state,p1__14018_SHARP_.target.value);
})], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sevengui.crud.people_list,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$people,sevengui.crud.filter_people(people,input_prefix),cljs.core.cst$kw$value,selected_id,cljs.core.cst$kw$on_DASH_change,(function (p1__14019_SHARP_){
return sevengui.crud.on_input_update_BANG_(state,cljs.core.cst$kw$selected_DASH_id,p1__14019_SHARP_.target.value);
})], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$input_DASH_container,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,"Name:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$class,(((!(sevengui.crud.valid_name_QMARK_(state))))?"invalid-input":null),cljs.core.cst$kw$value,input_name,cljs.core.cst$kw$on_DASH_change,(function (p1__14020_SHARP_){
return sevengui.crud.set_input_name_BANG_(state,p1__14020_SHARP_.target.value);
})], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$input_DASH_container,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,"Surname:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$class,(((!(sevengui.crud.valid_surname_QMARK_(state))))?"invalid-input":null),cljs.core.cst$kw$value,input_surname,cljs.core.cst$kw$on_DASH_change,(function (p1__14021_SHARP_){
return sevengui.crud.set_input_surname_BANG_(state,p1__14021_SHARP_.target.value);
})], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$buttons,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$custom_DASH_button,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$disabled,(!(sevengui.crud.can_create_QMARK_(state))),cljs.core.cst$kw$on_DASH_click,(function (){
return sevengui.crud.on_person_action_BANG_(state,"create");
})], null),"Create"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$custom_DASH_button,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$disabled,(!(sevengui.crud.can_update_QMARK_(state))),cljs.core.cst$kw$on_DASH_click,(function (){
return sevengui.crud.on_person_action_BANG_(state,"update");
})], null),"Update"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$custom_DASH_button,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$disabled,(!(sevengui.crud.can_delete_QMARK_(state))),cljs.core.cst$kw$on_DASH_click,(function (){
return sevengui.crud.on_person_action_BANG_(state,"delete");
})], null),"Delete"], null)], null)], null);
});
});
