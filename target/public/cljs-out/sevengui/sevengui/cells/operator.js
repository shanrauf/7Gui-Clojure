// Compiled by ClojureScript 1.10.866 {:static-fns true, :optimize-constants true, :optimizations :advanced}
goog.provide('sevengui.cells.operator');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('clojure.string');
goog.require('sevengui.cells.error');
if((typeof sevengui !== 'undefined') && (typeof sevengui.cells !== 'undefined') && (typeof sevengui.cells.operator !== 'undefined') && (typeof sevengui.cells.operator.operator_regex !== 'undefined')){
} else {
sevengui.cells.operator.operator_regex = /([A-Z]+)\s*\((.*)?\)/i;
}
sevengui.cells.operator.numeric_only = (function sevengui$cells$operator$numeric_only(args){
var invalid_args = cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__13780_SHARP_){
return (!(typeof p1__13780_SHARP_ === 'number'));
}),cljs.core.flatten(args));
if(cljs.core.seq(invalid_args)){
return sevengui.cells.error.throw_error(sevengui.cells.error.value_error,invalid_args);
} else {
return true;
}
});
sevengui.cells.operator.arg_count = (function sevengui$cells$operator$arg_count(n){
return (function (args){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(args),n)){
return sevengui.cells.error.throw_error(sevengui.cells.error.value_error,args);
} else {
return true;
}
});
});
sevengui.cells.operator.min_arg_count = (function sevengui$cells$operator$min_arg_count(n){
return (function (args){
if((cljs.core.count(args) < n)){
return sevengui.cells.error.throw_error(sevengui.cells.error.value_error,args);
} else {
return true;
}
});
});
sevengui.cells.operator.all_inputs_allowed = (function sevengui$cells$operator$all_inputs_allowed(_){
return true;
});
sevengui.cells.operator.apply_operation = (function sevengui$cells$operator$apply_operation(f,validation_fn){
return (function (args){
if(cljs.core.truth_((validation_fn.cljs$core$IFn$_invoke$arity$1 ? validation_fn.cljs$core$IFn$_invoke$arity$1(args) : validation_fn.call(null,args)))){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,cljs.core.flatten(args));
} else {
return null;
}
});
});
sevengui.cells.operator.generic_operation = (function sevengui$cells$operator$generic_operation(f,validation_fn){
return (function (args){
if(cljs.core.truth_((validation_fn.cljs$core$IFn$_invoke$arity$1 ? validation_fn.cljs$core$IFn$_invoke$arity$1(args) : validation_fn.call(null,args)))){
var G__13781 = cljs.core.flatten(args);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__13781) : f.call(null,G__13781));
} else {
return null;
}
});
});
sevengui.cells.operator.avg = (function sevengui$cells$operator$avg(var_args){
var args__4835__auto__ = [];
var len__4829__auto___13783 = arguments.length;
var i__4830__auto___13784 = (0);
while(true){
if((i__4830__auto___13784 < len__4829__auto___13783)){
args__4835__auto__.push((arguments[i__4830__auto___13784]));

var G__13785 = (i__4830__auto___13784 + (1));
i__4830__auto___13784 = G__13785;
continue;
} else {
}
break;
}

var argseq__4836__auto__ = ((((0) < args__4835__auto__.length))?(new cljs.core.IndexedSeq(args__4835__auto__.slice((0)),(0),null)):null);
return sevengui.cells.operator.avg.cljs$core$IFn$_invoke$arity$variadic(argseq__4836__auto__);
});

(sevengui.cells.operator.avg.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return (cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.flatten(args)) / cljs.core.count(cljs.core.flatten(args)));
}));

(sevengui.cells.operator.avg.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(sevengui.cells.operator.avg.cljs$lang$applyTo = (function (seq13782){
var self__4817__auto__ = this;
return self__4817__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13782));
}));

/**
 * 'count' implementation based on Excel spec
 */
sevengui.cells.operator.count_fn = (function sevengui$cells$operator$count_fn(var_args){
var args__4835__auto__ = [];
var len__4829__auto___13788 = arguments.length;
var i__4830__auto___13789 = (0);
while(true){
if((i__4830__auto___13789 < len__4829__auto___13788)){
args__4835__auto__.push((arguments[i__4830__auto___13789]));

var G__13790 = (i__4830__auto___13789 + (1));
i__4830__auto___13789 = G__13790;
continue;
} else {
}
break;
}

var argseq__4836__auto__ = ((((0) < args__4835__auto__.length))?(new cljs.core.IndexedSeq(args__4835__auto__.slice((0)),(0),null)):null);
return sevengui.cells.operator.count_fn.cljs$core$IFn$_invoke$arity$variadic(argseq__4836__auto__);
});

(sevengui.cells.operator.count_fn.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return cljs.core.count(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__13786_SHARP_){
return (!((p1__13786_SHARP_ == null)));
}),cljs.core.flatten(args)));
}));

(sevengui.cells.operator.count_fn.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(sevengui.cells.operator.count_fn.cljs$lang$applyTo = (function (seq13787){
var self__4817__auto__ = this;
return self__4817__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13787));
}));

/**
 * 'counta' implementation based on Excel spec
 */
sevengui.cells.operator.counta = (function sevengui$cells$operator$counta(var_args){
var args__4835__auto__ = [];
var len__4829__auto___13792 = arguments.length;
var i__4830__auto___13793 = (0);
while(true){
if((i__4830__auto___13793 < len__4829__auto___13792)){
args__4835__auto__.push((arguments[i__4830__auto___13793]));

var G__13794 = (i__4830__auto___13793 + (1));
i__4830__auto___13793 = G__13794;
continue;
} else {
}
break;
}

var argseq__4836__auto__ = ((((0) < args__4835__auto__.length))?(new cljs.core.IndexedSeq(args__4835__auto__.slice((0)),(0),null)):null);
return sevengui.cells.operator.counta.cljs$core$IFn$_invoke$arity$variadic(argseq__4836__auto__);
});

(sevengui.cells.operator.counta.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return cljs.core.count(cljs.core.flatten(args));
}));

(sevengui.cells.operator.counta.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(sevengui.cells.operator.counta.cljs$lang$applyTo = (function (seq13791){
var self__4817__auto__ = this;
return self__4817__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13791));
}));

sevengui.cells.operator.if_operation = (function sevengui$cells$operator$if_operation(p__13795){
var vec__13796 = p__13795;
var condition_expr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13796,(0),null);
var true_expr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13796,(1),null);
var false_expr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13796,(2),null);
if(cljs.core.truth_(condition_expr)){
return true_expr;
} else {
return false_expr;
}
});
if((typeof sevengui !== 'undefined') && (typeof sevengui.cells !== 'undefined') && (typeof sevengui.cells.operator !== 'undefined') && (typeof sevengui.cells.operator.operators !== 'undefined')){
} else {
sevengui.cells.operator.operators = cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$min,cljs.core.cst$kw$if,cljs.core.cst$kw$sub,cljs.core.cst$kw$mod,cljs.core.cst$kw$or,cljs.core.cst$kw$counta,cljs.core.cst$kw$not,cljs.core.cst$kw$round,cljs.core.cst$kw$div,cljs.core.cst$kw$mul,cljs.core.cst$kw$max,cljs.core.cst$kw$count,cljs.core.cst$kw$and,cljs.core.cst$kw$avg,cljs.core.cst$kw$equal,cljs.core.cst$kw$sum],[sevengui.cells.operator.apply_operation(cljs.core.min,sevengui.cells.operator.numeric_only),sevengui.cells.operator.generic_operation(sevengui.cells.operator.if_operation,sevengui.cells.operator.arg_count((3))),sevengui.cells.operator.apply_operation(cljs.core._,sevengui.cells.operator.numeric_only),sevengui.cells.operator.apply_operation(cljs.core.mod,(function (p1__13799_SHARP_){
var and__4221__auto__ = sevengui.cells.operator.arg_count((2));
if(cljs.core.truth_(and__4221__auto__)){
var and__4221__auto____$1 = p1__13799_SHARP_;
if(cljs.core.truth_(and__4221__auto____$1)){
return sevengui.cells.operator.numeric_only(p1__13799_SHARP_);
} else {
return and__4221__auto____$1;
}
} else {
return and__4221__auto__;
}
})),sevengui.cells.operator.generic_operation((function (p1__13802_SHARP_){
return cljs.core.some(cljs.core.true_QMARK_,p1__13802_SHARP_);
}),sevengui.cells.operator.min_arg_count((2))),sevengui.cells.operator.generic_operation(sevengui.cells.operator.counta,sevengui.cells.operator.all_inputs_allowed),sevengui.cells.operator.apply_operation(cljs.core.not,sevengui.cells.operator.arg_count((1))),sevengui.cells.operator.apply_operation((function (p1__13800_SHARP_){
return Math.round(p1__13800_SHARP_);
}),(function (p1__13801_SHARP_){
var and__4221__auto__ = sevengui.cells.operator.arg_count((1));
if(cljs.core.truth_(and__4221__auto__)){
var and__4221__auto____$1 = p1__13801_SHARP_;
if(cljs.core.truth_(and__4221__auto____$1)){
return sevengui.cells.operator.numeric_only(p1__13801_SHARP_);
} else {
return and__4221__auto____$1;
}
} else {
return and__4221__auto__;
}
})),sevengui.cells.operator.apply_operation(cljs.core._SLASH_,sevengui.cells.operator.numeric_only),sevengui.cells.operator.apply_operation(cljs.core._STAR_,sevengui.cells.operator.numeric_only),sevengui.cells.operator.apply_operation(cljs.core.max,sevengui.cells.operator.numeric_only),sevengui.cells.operator.generic_operation(sevengui.cells.operator.count_fn,sevengui.cells.operator.all_inputs_allowed),sevengui.cells.operator.generic_operation((function (p1__13803_SHARP_){
return cljs.core.every_QMARK_(cljs.core.true_QMARK_,p1__13803_SHARP_);
}),sevengui.cells.operator.min_arg_count((2))),sevengui.cells.operator.generic_operation(sevengui.cells.operator.avg,sevengui.cells.operator.numeric_only),sevengui.cells.operator.apply_operation(cljs.core._EQ_,sevengui.cells.operator.all_inputs_allowed),sevengui.cells.operator.apply_operation(cljs.core._PLUS_,sevengui.cells.operator.numeric_only)]);
}
sevengui.cells.operator.has_operator_QMARK_ = (function sevengui$cells$operator$has_operator_QMARK_(expr){
return cljs.core.re_find(sevengui.cells.operator.operator_regex,expr);
});
sevengui.cells.operator.eval_operation = (function sevengui$cells$operator$eval_operation(s_expr){
if(cljs.core.empty_QMARK_(s_expr)){
return (0);
} else {
var operator = cljs.core.first(s_expr);
var args = cljs.core.rest(s_expr);
return (operator.cljs$core$IFn$_invoke$arity$1 ? operator.cljs$core$IFn$_invoke$arity$1(args) : operator.call(null,args));
}
});
sevengui.cells.operator.operator_sym__GT_operator = (function sevengui$cells$operator$operator_sym__GT_operator(symbol){
var operator = cljs.core.get.cljs$core$IFn$_invoke$arity$2(sevengui.cells.operator.operators,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(clojure.string.lower_case(cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol))));
if(cljs.core.not(operator)){
return sevengui.cells.error.throw_error(sevengui.cells.error.operator_error,symbol);
} else {
return operator;
}
});
