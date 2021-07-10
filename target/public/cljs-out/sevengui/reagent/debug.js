// Compiled by ClojureScript 1.10.866 {:static-fns true, :optimize-constants true, :optimizations :advanced}
goog.provide('reagent.debug');
goog.require('cljs.core');
goog.require('cljs.core.constants');
reagent.debug.has_console = (typeof console !== 'undefined');
reagent.debug.tracking = false;
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.warnings !== 'undefined')){
} else {
reagent.debug.warnings = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.track_console !== 'undefined')){
} else {
reagent.debug.track_console = (function (){var o = ({});
(o.warn = (function() { 
var G__12743__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$warn], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__12743 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__12744__i = 0, G__12744__a = new Array(arguments.length -  0);
while (G__12744__i < G__12744__a.length) {G__12744__a[G__12744__i] = arguments[G__12744__i + 0]; ++G__12744__i;}
  args = new cljs.core.IndexedSeq(G__12744__a,0,null);
} 
return G__12743__delegate.call(this,args);};
G__12743.cljs$lang$maxFixedArity = 0;
G__12743.cljs$lang$applyTo = (function (arglist__12745){
var args = cljs.core.seq(arglist__12745);
return G__12743__delegate(args);
});
G__12743.cljs$core$IFn$_invoke$arity$variadic = G__12743__delegate;
return G__12743;
})()
);

(o.error = (function() { 
var G__12746__delegate = function (args){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$error], null),cljs.core.conj,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,args)], 0));
};
var G__12746 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__12747__i = 0, G__12747__a = new Array(arguments.length -  0);
while (G__12747__i < G__12747__a.length) {G__12747__a[G__12747__i] = arguments[G__12747__i + 0]; ++G__12747__i;}
  args = new cljs.core.IndexedSeq(G__12747__a,0,null);
} 
return G__12746__delegate.call(this,args);};
G__12746.cljs$lang$maxFixedArity = 0;
G__12746.cljs$lang$applyTo = (function (arglist__12748){
var args = cljs.core.seq(arglist__12748);
return G__12746__delegate(args);
});
G__12746.cljs$core$IFn$_invoke$arity$variadic = G__12746__delegate;
return G__12746;
})()
);

return o;
})();
}
reagent.debug.track_warnings = (function reagent$debug$track_warnings(f){
(reagent.debug.tracking = true);

cljs.core.reset_BANG_(reagent.debug.warnings,null);

(f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));

var warns = cljs.core.deref(reagent.debug.warnings);
cljs.core.reset_BANG_(reagent.debug.warnings,null);

(reagent.debug.tracking = false);

return warns;
});
