// Compiled by ClojureScript 1.10.866 {:static-fns true, :optimize-constants true, :optimizations :advanced}
goog.provide('sevengui.timer');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('reagent.core');
if((typeof sevengui !== 'undefined') && (typeof sevengui.timer !== 'undefined') && (typeof sevengui.timer.frames_per_second !== 'undefined')){
} else {
sevengui.timer.frames_per_second = (60);
}
if((typeof sevengui !== 'undefined') && (typeof sevengui.timer !== 'undefined') && (typeof sevengui.timer.seconds_per_frame !== 'undefined')){
} else {
sevengui.timer.seconds_per_frame = ((1) / sevengui.timer.frames_per_second);
}
if((typeof sevengui !== 'undefined') && (typeof sevengui.timer !== 'undefined') && (typeof sevengui.timer.milliseconds_per_frame !== 'undefined')){
} else {
sevengui.timer.milliseconds_per_frame = ((1000) / sevengui.timer.frames_per_second);
}
sevengui.timer.set_elapsed_time_BANG_ = (function sevengui$timer$set_elapsed_time_BANG_(state,time){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,cljs.core.cst$kw$elapsed_DASH_time,time);
});
sevengui.timer.set_duration_BANG_ = (function sevengui$timer$set_duration_BANG_(state,new_value){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,cljs.core.cst$kw$duration,Number(new_value));
});
sevengui.timer.tick_elapsed_time_BANG_ = (function sevengui$timer$tick_elapsed_time_BANG_(state){
return sevengui.timer.set_elapsed_time_BANG_(state,(function (){var x__4309__auto__ = (cljs.core.cst$kw$elapsed_DASH_time.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state)) + sevengui.timer.seconds_per_frame);
var y__4310__auto__ = cljs.core.cst$kw$duration.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state));
return ((x__4309__auto__ < y__4310__auto__) ? x__4309__auto__ : y__4310__auto__);
})());
});
sevengui.timer.start_timer = (function sevengui$timer$start_timer(state){
return setInterval((function (){
return sevengui.timer.tick_elapsed_time_BANG_(state);
}),sevengui.timer.milliseconds_per_frame);
});
sevengui.timer.format_elapsed_time = (function sevengui$timer$format_elapsed_time(seconds){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((seconds / (1)).toFixed((1))),"s"].join('');
});
sevengui.timer.timer_component = (function sevengui$timer$timer_component(){
var state = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$elapsed_DASH_time,(0),cljs.core.cst$kw$duration,(10)], null));
return reagent.core.create_class.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$component_DASH_did_DASH_mount,(function (){
return sevengui.timer.start_timer(state);
}),cljs.core.cst$kw$reagent_DASH_render,(function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$task$timer,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h2,"Task 4: Timer"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$container,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$elapsed_DASH_time,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,"Elapsed time:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$meter,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$value,cljs.core.cst$kw$elapsed_DASH_time.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state)),cljs.core.cst$kw$max,cljs.core.cst$kw$duration.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state))], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,sevengui.timer.format_elapsed_time(cljs.core.cst$kw$elapsed_DASH_time.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state)))], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$input_DASH_container,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,"Duration"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$type,"range",cljs.core.cst$kw$value,cljs.core.cst$kw$duration.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state)),cljs.core.cst$kw$min,(0),cljs.core.cst$kw$max,(100),cljs.core.cst$kw$on_DASH_change,(function (p1__14025_SHARP_){
return sevengui.timer.set_duration_BANG_(state,p1__14025_SHARP_.target.value);
})], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$custom_DASH_button,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$type,"button",cljs.core.cst$kw$on_DASH_click,(function (){
return sevengui.timer.set_elapsed_time_BANG_(state,(0));
})], null),"Reset"], null)], null)], null);
})], null));
});
