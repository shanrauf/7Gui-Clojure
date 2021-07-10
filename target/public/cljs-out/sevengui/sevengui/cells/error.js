// Compiled by ClojureScript 1.10.866 {:static-fns true, :optimize-constants true, :optimizations :advanced}
goog.provide('sevengui.cells.error');
goog.require('cljs.core');
goog.require('cljs.core.constants');
if((typeof sevengui !== 'undefined') && (typeof sevengui.cells !== 'undefined') && (typeof sevengui.cells.error !== 'undefined') && (typeof sevengui.cells.error.ref_error !== 'undefined')){
} else {
sevengui.cells.error.ref_error = "#REF!";
}
if((typeof sevengui !== 'undefined') && (typeof sevengui.cells !== 'undefined') && (typeof sevengui.cells.error !== 'undefined') && (typeof sevengui.cells.error.circular_ref_error !== 'undefined')){
} else {
sevengui.cells.error.circular_ref_error = "#CIRCULAR!";
}
if((typeof sevengui !== 'undefined') && (typeof sevengui.cells !== 'undefined') && (typeof sevengui.cells.error !== 'undefined') && (typeof sevengui.cells.error.name_error !== 'undefined')){
} else {
sevengui.cells.error.name_error = "#NAME?";
}
if((typeof sevengui !== 'undefined') && (typeof sevengui.cells !== 'undefined') && (typeof sevengui.cells.error !== 'undefined') && (typeof sevengui.cells.error.value_error !== 'undefined')){
} else {
sevengui.cells.error.value_error = "#VALUE";
}
if((typeof sevengui !== 'undefined') && (typeof sevengui.cells !== 'undefined') && (typeof sevengui.cells.error !== 'undefined') && (typeof sevengui.cells.error.operator_error !== 'undefined')){
} else {
sevengui.cells.error.operator_error = "#OPERATOR?";
}
if((typeof sevengui !== 'undefined') && (typeof sevengui.cells !== 'undefined') && (typeof sevengui.cells.error !== 'undefined') && (typeof sevengui.cells.error.errors !== 'undefined')){
} else {
sevengui.cells.error.errors = cljs.core.PersistentArrayMap.createAsIfByAssoc([sevengui.cells.error.ref_error,"Contains Self Reference",sevengui.cells.error.circular_ref_error,"Contains Circular Reference",sevengui.cells.error.name_error,"Unresolved Reference",sevengui.cells.error.operator_error,"Unresolved Operator",sevengui.cells.error.value_error,"Invalid Value"]);
}
sevengui.cells.error.get_error = (function sevengui$cells$error$get_error(name){
var or__4223__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(sevengui.cells.error.errors,name);
if(cljs.core.truth_(or__4223__auto__)){
return or__4223__auto__;
} else {
return "Unknown error";
}
});
sevengui.cells.error.get_error_name = (function sevengui$cells$error$get_error_name(error){
var or__4223__auto__ = cljs.core.cst$kw$error.cljs$core$IFn$_invoke$arity$1(cljs.core.ex_data(error));
if(cljs.core.truth_(or__4223__auto__)){
return or__4223__auto__;
} else {
return "#ERROR!";
}
});
sevengui.cells.error.throw_error = (function sevengui$cells$error$throw_error(name,data){
var description = sevengui.cells.error.get_error(name);
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(description,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$error,name,cljs.core.cst$kw$description,description,cljs.core.cst$kw$expr,data], null));
});
sevengui.cells.error.log_error = (function sevengui$cells$error$log_error(id,e){
var map__13763 = cljs.core.ex_data(e);
var map__13763__$1 = cljs.core.__destructure_map(map__13763);
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13763__$1,cljs.core.cst$kw$error);
var description = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13763__$1,cljs.core.cst$kw$description);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13763__$1,cljs.core.cst$kw$expr);
return console.warn(["Error: \n",cljs.core.str.cljs$core$IFn$_invoke$arity$1(error),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__4223__auto__ = description;
if(cljs.core.truth_(or__4223__auto__)){
return or__4223__auto__;
} else {
return "Unknown error";
}
})())," at ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(id),"\n","Expression: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(expr),"\n"].join(''));
});
