// Compiled by ClojureScript 1.10.866 {:static-fns true, :optimize-constants true, :optimizations :advanced}
goog.provide('sevengui.temperature_converter');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('reagent.core');
sevengui.temperature_converter.f__GT_c = (function sevengui$temperature_converter$f__GT_c(f){
return ((f - (32)) * ((5) / (9)));
});
sevengui.temperature_converter.c__GT_f = (function sevengui$temperature_converter$c__GT_f(c){
return ((c * ((9) / (5))) + (32));
});
sevengui.temperature_converter.update_temperatures = (function sevengui$temperature_converter$update_temperatures(temperatures,modified_temp,invalidated_temp,input){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(input,"")){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(temperatures,cljs.core.assoc,modified_temp,input,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([invalidated_temp,input], 0));
} else {
if(cljs.core.truth_(isNaN(input))){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(temperatures,cljs.core.assoc,modified_temp,input);
} else {
var new_value = parseInt(input);
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(temperatures,cljs.core.assoc,modified_temp,new_value,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([invalidated_temp,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(modified_temp,cljs.core.cst$kw$fahrenheit))?sevengui.temperature_converter.f__GT_c(new_value):sevengui.temperature_converter.c__GT_f(new_value))], 0));

}
}
});
sevengui.temperature_converter.format_temp = (function sevengui$temperature_converter$format_temp(temp){
if(typeof temp === 'string'){
return temp;
} else {
return cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__13746 = temp;
return Math.round(G__13746);
})());
}
});
sevengui.temperature_converter.temperature_input = (function sevengui$temperature_converter$temperature_input(state,updated_temp,val){
var invalidated_temp = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(updated_temp,cljs.core.cst$kw$celsius))?cljs.core.cst$kw$fahrenheit:cljs.core.cst$kw$celsius);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$class,(cljs.core.truth_((function (){var and__4221__auto__ = cljs.core.not_empty(val);
if(cljs.core.truth_(and__4221__auto__)){
return isNaN(val);
} else {
return and__4221__auto__;
}
})())?"invalid-input":null),cljs.core.cst$kw$value,val,cljs.core.cst$kw$on_DASH_change,(function (p1__13747_SHARP_){
return sevengui.temperature_converter.update_temperatures(state,updated_temp,invalidated_temp,p1__13747_SHARP_.target.value);
})], null)], null);
});
sevengui.temperature_converter.temperature_converter_component = (function sevengui$temperature_converter$temperature_converter_component(){
var state = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$fahrenheit,"",cljs.core.cst$kw$celsius,""], null));
return (function (){
var map__13748 = cljs.core.deref(state);
var map__13748__$1 = cljs.core.__destructure_map(map__13748);
var fahrenheit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13748__$1,cljs.core.cst$kw$fahrenheit);
var celsius = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13748__$1,cljs.core.cst$kw$celsius);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$task$temperature_DASH_converter,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h2,"Task 2: Temperature Converter"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$input_DASH_container,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,"Celsius:"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [sevengui.temperature_converter.temperature_input,state,cljs.core.cst$kw$celsius,sevengui.temperature_converter.format_temp(celsius)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$input_DASH_container,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,"Fahrenheit:"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [sevengui.temperature_converter.temperature_input,state,cljs.core.cst$kw$fahrenheit,sevengui.temperature_converter.format_temp(fahrenheit)], null)], null)], null);
});
});
