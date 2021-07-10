// Compiled by ClojureScript 1.10.866 {:static-fns true, :optimize-constants true, :optimizations :advanced}
goog.provide('sevengui.flight_booker');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('reagent.core');
if((typeof sevengui !== 'undefined') && (typeof sevengui.flight_booker !== 'undefined') && (typeof sevengui.flight_booker.one_way_flight !== 'undefined')){
} else {
sevengui.flight_booker.one_way_flight = "one-way";
}
if((typeof sevengui !== 'undefined') && (typeof sevengui.flight_booker !== 'undefined') && (typeof sevengui.flight_booker.return_flight !== 'undefined')){
} else {
sevengui.flight_booker.return_flight = "return";
}
if((typeof sevengui !== 'undefined') && (typeof sevengui.flight_booker !== 'undefined') && (typeof sevengui.flight_booker.date_regex !== 'undefined')){
} else {
sevengui.flight_booker.date_regex = /([0-2][0-9]|3[0-1]).(0[0-9]|1[0-2]).(\d{4})/;
}
sevengui.flight_booker.str__GT_date = (function sevengui$flight_booker$str__GT_date(s){
var vec__13751 = cljs.core.re_matches(sevengui.flight_booker.date_regex,s);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13751,(0),null);
var day = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13751,(1),null);
var month = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13751,(2),null);
var year = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13751,(3),null);
var date = Date.parse([cljs.core.str.cljs$core$IFn$_invoke$arity$1(month),"/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(day),"/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(year)].join(''));
return date;
});
sevengui.flight_booker.valid_date_str_QMARK_ = (function sevengui$flight_booker$valid_date_str_QMARK_(s){
return cljs.core.boolean$(cljs.core.re_matches(sevengui.flight_booker.date_regex,s));
});
sevengui.flight_booker.valid_departure_date_QMARK_ = (function sevengui$flight_booker$valid_departure_date_QMARK_(d){
return sevengui.flight_booker.valid_date_str_QMARK_(d);
});
sevengui.flight_booker.valid_arrival_date_QMARK_ = (function sevengui$flight_booker$valid_arrival_date_QMARK_(d,a){
return ((sevengui.flight_booker.valid_date_str_QMARK_(a)) && ((sevengui.flight_booker.str__GT_date(d) < sevengui.flight_booker.str__GT_date(a))));
});
sevengui.flight_booker.set_flight_type_BANG_ = (function sevengui$flight_booker$set_flight_type_BANG_(state,type){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,cljs.core.cst$kw$flight_DASH_type,type);
});
sevengui.flight_booker.set_departure_date_BANG_ = (function sevengui$flight_booker$set_departure_date_BANG_(state,date){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,cljs.core.cst$kw$departure_DASH_date,date);
});
sevengui.flight_booker.set_arrival_date_BANG_ = (function sevengui$flight_booker$set_arrival_date_BANG_(state,date){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,cljs.core.cst$kw$arrival_DASH_date,date);
});
sevengui.flight_booker.ready_to_submit_QMARK_ = (function sevengui$flight_booker$ready_to_submit_QMARK_(flight_type,departure_date,arrival_date){
return (!((function (){var and__4221__auto__ = sevengui.flight_booker.valid_departure_date_QMARK_(departure_date);
if(and__4221__auto__){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(flight_type,sevengui.flight_booker.return_flight)){
return sevengui.flight_booker.valid_arrival_date_QMARK_(departure_date,arrival_date);
} else {
return true;
}
} else {
return and__4221__auto__;
}
})()));
});
sevengui.flight_booker.on_submit = (function sevengui$flight_booker$on_submit(e,flight_type,departure_date,arrival_date){
e.preventDefault();

var success_message = ["You have booked a ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(flight_type)," flight on ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(flight_type,sevengui.flight_booker.one_way_flight))?departure_date:arrival_date))].join('');
return alert(success_message);
});
sevengui.flight_booker.flight_booker_component = (function sevengui$flight_booker$flight_booker_component(){
var state = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$flight_DASH_type,sevengui.flight_booker.one_way_flight,cljs.core.cst$kw$departure_DASH_date,"",cljs.core.cst$kw$arrival_DASH_date,""], null));
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$task$flight_DASH_booker,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h2,"Task 3: Flight Booker"], null),(function (){var map__13758 = cljs.core.deref(state);
var map__13758__$1 = cljs.core.__destructure_map(map__13758);
var flight_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13758__$1,cljs.core.cst$kw$flight_DASH_type);
var departure_date = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13758__$1,cljs.core.cst$kw$departure_DASH_date);
var arrival_date = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13758__$1,cljs.core.cst$kw$arrival_DASH_date);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$form$custom_DASH_form,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$custom_DASH_select,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$select,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$type,"select",cljs.core.cst$kw$on_DASH_change,(function (p1__13754_SHARP_){
return sevengui.flight_booker.set_flight_type_BANG_(state,p1__13754_SHARP_.target.value);
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,sevengui.flight_booker.one_way_flight], null),"One-way flight"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,sevengui.flight_booker.return_flight], null),"Return flight"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$input_DASH_container,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,"Departure Date:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$class,(((!(sevengui.flight_booker.valid_departure_date_QMARK_(departure_date))))?"invalid-input":null),cljs.core.cst$kw$value,departure_date,cljs.core.cst$kw$placeholder,"(e.g. 27.03.2014)",cljs.core.cst$kw$on_DASH_change,(function (p1__13755_SHARP_){
return sevengui.flight_booker.set_departure_date_BANG_(state,p1__13755_SHARP_.target.value);
})], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$input_DASH_container,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,"Arrival Date:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$class,((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(flight_type,sevengui.flight_booker.return_flight)) && ((!(sevengui.flight_booker.valid_arrival_date_QMARK_(departure_date,arrival_date))))))?"invalid-input":null),cljs.core.cst$kw$value,arrival_date,cljs.core.cst$kw$disabled,cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(flight_type,sevengui.flight_booker.one_way_flight),cljs.core.cst$kw$placeholder,"(e.g. 28.03.2014)",cljs.core.cst$kw$on_DASH_change,(function (p1__13756_SHARP_){
return sevengui.flight_booker.set_arrival_date_BANG_(state,p1__13756_SHARP_.target.value);
})], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$custom_DASH_button,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,"button",cljs.core.cst$kw$disabled,sevengui.flight_booker.ready_to_submit_QMARK_(flight_type,departure_date,arrival_date),cljs.core.cst$kw$on_DASH_click,(function (p1__13757_SHARP_){
return sevengui.flight_booker.on_submit(p1__13757_SHARP_,flight_type,departure_date,arrival_date);
})], null),"Book"], null)], null);
})()], null);
});
});
