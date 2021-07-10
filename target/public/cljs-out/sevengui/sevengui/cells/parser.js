// Compiled by ClojureScript 1.10.866 {:static-fns true, :optimize-constants true, :optimizations :advanced}
goog.provide('sevengui.cells.parser');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('clojure.string');
goog.require('cljs.reader');
goog.require('sevengui.cells.cell_ref');
goog.require('sevengui.cells.operator');
goog.require('sevengui.cells.error');
if((typeof sevengui !== 'undefined') && (typeof sevengui.cells !== 'undefined') && (typeof sevengui.cells.parser !== 'undefined') && (typeof sevengui.cells.parser.list_regex !== 'undefined')){
} else {
sevengui.cells.parser.list_regex = /^(\s*\(.*\)\s*)$/;
}
sevengui.cells.parser.special_form_QMARK_ = (function sevengui$cells$parser$special_form_QMARK_(expr){
try{var result = cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(expr);
return (!(((typeof result === 'string') || (typeof result === 'number'))));
}catch (e13918){var _ = e13918;
return true;
}});
sevengui.cells.parser.balanced_QMARK_ = (function sevengui$cells$parser$balanced_QMARK_(var_args){
var G__13920 = arguments.length;
switch (G__13920) {
case 1:
return sevengui.cells.parser.balanced_QMARK_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return sevengui.cells.parser.balanced_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(sevengui.cells.parser.balanced_QMARK_.cljs$core$IFn$_invoke$arity$1 = (function (expr){
return sevengui.cells.parser.balanced_QMARK_.cljs$core$IFn$_invoke$arity$2(clojure.string.split.cljs$core$IFn$_invoke$arity$2(expr,(new RegExp(""))),(0));
}));

(sevengui.cells.parser.balanced_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (p__13921,count){
while(true){
var vec__13922 = p__13921;
var seq__13923 = cljs.core.seq(vec__13922);
var first__13924 = cljs.core.first(seq__13923);
var seq__13923__$1 = cljs.core.next(seq__13923);
var x = first__13924;
var xs = seq__13923__$1;
if((count < (0))){
return false;
} else {
if((x == null)){
return (count === (0));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(x,"(")){
var G__13926 = xs;
var G__13927 = (count + (1));
p__13921 = G__13926;
count = G__13927;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(x,")")){
var G__13928 = xs;
var G__13929 = (count - (1));
p__13921 = G__13928;
count = G__13929;
continue;
} else {
var G__13930 = xs;
var G__13931 = count;
p__13921 = G__13930;
count = G__13931;
continue;

}
}
}
}
break;
}
}));

(sevengui.cells.parser.balanced_QMARK_.cljs$lang$maxFixedArity = 2);

if((typeof sevengui !== 'undefined') && (typeof sevengui.cells !== 'undefined') && (typeof sevengui.cells.parser !== 'undefined') && (typeof sevengui.cells.parser.special_form_rules !== 'undefined')){
} else {
sevengui.cells.parser.special_form_rules = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$no_DASH_range_DASH_outside_DASH_operator,(function (p1__13932_SHARP_){
return (!(sevengui.cells.cell_ref.is_ref_range_QMARK_(p1__13932_SHARP_)));
}),cljs.core.cst$kw$no_DASH_list_DASH_outside_DASH_operator,(function (p1__13933_SHARP_){
return cljs.core.not(cljs.core.re_seq(sevengui.cells.parser.list_regex,p1__13933_SHARP_));
}),cljs.core.cst$kw$balanced_DASH_operations,sevengui.cells.parser.balanced_QMARK_], null);
}
sevengui.cells.parser.validate_special_form = (function sevengui$cells$parser$validate_special_form(expr){
if(cljs.core.every_QMARK_(cljs.core.true_QMARK_,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__13934_SHARP_){
return (p1__13934_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__13934_SHARP_.cljs$core$IFn$_invoke$arity$1(expr) : p1__13934_SHARP_.call(null,expr));
}),cljs.core.vals(sevengui.cells.parser.special_form_rules)))){
return expr;
} else {
return sevengui.cells.error.throw_error(sevengui.cells.error.value_error,expr);
}
});
sevengui.cells.parser.generate_s_expression = (function sevengui$cells$parser$generate_s_expression(expr){
if(cljs.core.truth_(sevengui.cells.operator.has_operator_QMARK_(expr))){
var G__13935 = clojure.string.replace(expr,sevengui.cells.operator.operator_regex,"($1, $2)");
return (sevengui.cells.parser.generate_s_expression.cljs$core$IFn$_invoke$arity$1 ? sevengui.cells.parser.generate_s_expression.cljs$core$IFn$_invoke$arity$1(G__13935) : sevengui.cells.parser.generate_s_expression.call(null,G__13935));
} else {
return expr;
}
});
sevengui.cells.parser.parse_special_form = (function sevengui$cells$parser$parse_special_form(expr){
return cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(sevengui.cells.parser.generate_s_expression(sevengui.cells.parser.validate_special_form(expr)));
});
sevengui.cells.parser.parse_cell_expr = (function sevengui$cells$parser$parse_cell_expr(expr){
if(cljs.core.truth_(sevengui.cells.parser.special_form_QMARK_(expr))){
return sevengui.cells.parser.parse_special_form(expr);
} else {
return cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(expr);
}
});
sevengui.cells.parser.m_parse_cell_expr = cljs.core.memoize(sevengui.cells.parser.parse_cell_expr);
