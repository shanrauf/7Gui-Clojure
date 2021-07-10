// Compiled by ClojureScript 1.10.866 {:static-fns true, :optimize-constants true, :optimizations :advanced}
goog.provide('sevengui.cells.cell_ref');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('clojure.string');
goog.require('sevengui.cells.error');
if((typeof sevengui !== 'undefined') && (typeof sevengui.cells !== 'undefined') && (typeof sevengui.cells.cell_ref !== 'undefined') && (typeof sevengui.cells.cell_ref.ref_regex !== 'undefined')){
} else {
sevengui.cells.cell_ref.ref_regex = /([a-zA-Z]+)(\d\d*)/;
}
if((typeof sevengui !== 'undefined') && (typeof sevengui.cells !== 'undefined') && (typeof sevengui.cells.cell_ref !== 'undefined') && (typeof sevengui.cells.cell_ref.ref_col_regex !== 'undefined')){
} else {
sevengui.cells.cell_ref.ref_col_regex = /^[a-zA-Z]+$/;
}
if((typeof sevengui !== 'undefined') && (typeof sevengui.cells !== 'undefined') && (typeof sevengui.cells.cell_ref !== 'undefined') && (typeof sevengui.cells.cell_ref.ref_row_regex !== 'undefined')){
} else {
sevengui.cells.cell_ref.ref_row_regex = /^\d\d*$/;
}
if((typeof sevengui !== 'undefined') && (typeof sevengui.cells !== 'undefined') && (typeof sevengui.cells.cell_ref !== 'undefined') && (typeof sevengui.cells.cell_ref.ref_range_regex !== 'undefined')){
} else {
sevengui.cells.cell_ref.ref_range_regex = /^[a-zA-Z]+\d\d*?:[a-zA-Z]+\d\d*?$/;
}
if((typeof sevengui !== 'undefined') && (typeof sevengui.cells !== 'undefined') && (typeof sevengui.cells.cell_ref !== 'undefined') && (typeof sevengui.cells.cell_ref.exact_ref_pattern_regex !== 'undefined')){
} else {
sevengui.cells.cell_ref.exact_ref_pattern_regex = /^[a-zA-Z]+\d\d*?(?::[a-zA-Z]+\d\d*?)?$/;
}
if((typeof sevengui !== 'undefined') && (typeof sevengui.cells !== 'undefined') && (typeof sevengui.cells.cell_ref !== 'undefined') && (typeof sevengui.cells.cell_ref.columns !== 'undefined')){
} else {
sevengui.cells.cell_ref.columns = cljs.core.seq("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
}
if((typeof sevengui !== 'undefined') && (typeof sevengui.cells !== 'undefined') && (typeof sevengui.cells.cell_ref !== 'undefined') && (typeof sevengui.cells.cell_ref.rows !== 'undefined')){
} else {
sevengui.cells.cell_ref.rows = cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.range.cljs$core$IFn$_invoke$arity$2((0),(100))));
}
sevengui.cells.cell_ref.generate_cell_ref = (function sevengui$cells$cell_ref$generate_cell_ref(col,row){
var id = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(col),cljs.core.str.cljs$core$IFn$_invoke$arity$1(row)].join('').toUpperCase();
if(cljs.core.truth_((function (){var and__4221__auto__ = cljs.core.re_seq(sevengui.cells.cell_ref.ref_col_regex,col);
if(cljs.core.truth_(and__4221__auto__)){
return cljs.core.re_seq(sevengui.cells.cell_ref.ref_row_regex,row);
} else {
return and__4221__auto__;
}
})())){
return id;
} else {
return Error("Invalid cell reference");
}
});
sevengui.cells.cell_ref.is_ref_range_QMARK_ = (function sevengui$cells$cell_ref$is_ref_range_QMARK_(ref){
return cljs.core.boolean$(cljs.core.re_find(sevengui.cells.cell_ref.ref_range_regex,ref));
});
sevengui.cells.cell_ref.value_or_number = (function sevengui$cells$cell_ref$value_or_number(value){
var num = Number(value);
if(cljs.core.truth_((function (){var or__4223__auto__ = clojure.string.blank_QMARK_(value);
if(or__4223__auto__){
return or__4223__auto__;
} else {
return Number.isNaN(num);
}
})())){
return value;
} else {
return num;
}
});
sevengui.cells.cell_ref.get_cell = (function sevengui$cells$cell_ref$get_cell(sheet,ref){
var c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(sheet,ref);
if(cljs.core.not(c)){
sevengui.cells.error.throw_error(sevengui.cells.error.name_error,ref);
} else {
}

return c;
});
sevengui.cells.cell_ref.ref__GT_expr = (function sevengui$cells$cell_ref$ref__GT_expr(sheet,ref){
return cljs.core.cst$kw$expr.cljs$core$IFn$_invoke$arity$1(sevengui.cells.cell_ref.get_cell(sheet,ref));
});
sevengui.cells.cell_ref.ref__GT_col = (function sevengui$cells$cell_ref$ref__GT_col(ref){
return cljs.core.second(cljs.core.re_find(sevengui.cells.cell_ref.ref_regex,ref));
});
sevengui.cells.cell_ref.ref__GT_row = (function sevengui$cells$cell_ref$ref__GT_row(ref){
return cljs.core.last(cljs.core.re_find(sevengui.cells.cell_ref.ref_regex,ref));
});
sevengui.cells.cell_ref.ref__GT_col_idx = (function sevengui$cells$cell_ref$ref__GT_col_idx(ref){
return sevengui.cells.cell_ref.columns.indexOf(sevengui.cells.cell_ref.ref__GT_col(ref));
});
sevengui.cells.cell_ref.ref__GT_row_num = (function sevengui$cells$cell_ref$ref__GT_row_num(ref){
return (sevengui.cells.cell_ref.ref__GT_row(ref) | (0));
});
/**
 * Convert ref into a number e.g. A1 = 1, A2 = 2
 */
sevengui.cells.cell_ref.ref_keyfn = (function sevengui$cells$cell_ref$ref_keyfn(ref){
var col_num = ((1) + sevengui.cells.cell_ref.ref__GT_col_idx(ref));
var row_num = ((1) + sevengui.cells.cell_ref.ref__GT_row_num(ref));
return Number((row_num + ((col_num - (1)) * cljs.core.count(sevengui.cells.cell_ref.rows))));
});
sevengui.cells.cell_ref.inc_ref = (function sevengui$cells$cell_ref$inc_ref(ref){
var col = sevengui.cells.cell_ref.ref__GT_col(ref);
var row = Number(sevengui.cells.cell_ref.ref__GT_row(ref));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(row,cljs.core.last(sevengui.cells.cell_ref.rows))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(sevengui.cells.cell_ref.columns,(sevengui.cells.cell_ref.columns.indexOf(col) + (1)))),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.first(sevengui.cells.cell_ref.rows))].join('');
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(col),cljs.core.str.cljs$core$IFn$_invoke$arity$1((row + (1)))].join('');
}
});
sevengui.cells.cell_ref.sort_refs = (function sevengui$cells$cell_ref$sort_refs(refs){
return cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(sevengui.cells.cell_ref.ref_keyfn,refs);
});
sevengui.cells.cell_ref.split_ref = (function sevengui$cells$cell_ref$split_ref(ref){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sevengui.cells.cell_ref.ref__GT_col(ref),sevengui.cells.cell_ref.ref__GT_row(ref)], null);
});
sevengui.cells.cell_ref.expand_range = (function sevengui$cells$cell_ref$expand_range(start_ref,end_ref){
return cljs.core.flatten(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [end_ref,cljs.core.take_while.cljs$core$IFn$_invoke$arity$2((function (p1__13766_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(p1__13766_SHARP_,end_ref);
}),cljs.core.iterate(sevengui.cells.cell_ref.inc_ref,start_ref))], null));
});
sevengui.cells.cell_ref.range__GT_references = (function sevengui$cells$cell_ref$range__GT_references(range){
var vec__13767 = sevengui.cells.cell_ref.sort_refs(clojure.string.split.cljs$core$IFn$_invoke$arity$2(range.toUpperCase(),":"));
var start_ref = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13767,(0),null);
var end_ref = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13767,(1),null);
var vec__13770 = sevengui.cells.cell_ref.split_ref(start_ref);
var start_col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13770,(0),null);
var start_row = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13770,(1),null);
var vec__13773 = sevengui.cells.cell_ref.split_ref(end_ref);
var end_col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13773,(0),null);
var end_row = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13773,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(start_col,end_col)){
return sevengui.cells.cell_ref.expand_range(start_ref,end_ref);
} else {
var next_col = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(sevengui.cells.cell_ref.columns,((1) + sevengui.cells.cell_ref.ref__GT_col_idx(start_ref)));
var next_col_range = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(next_col),cljs.core.str.cljs$core$IFn$_invoke$arity$1(start_row),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(end_ref)].join('');
var last_start_col_ref = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(start_col),cljs.core.str.cljs$core$IFn$_invoke$arity$1(end_row)].join('');
return cljs.core.flatten(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sevengui.cells.cell_ref.expand_range(start_ref,last_start_col_ref),(sevengui.cells.cell_ref.range__GT_references.cljs$core$IFn$_invoke$arity$1 ? sevengui.cells.cell_ref.range__GT_references.cljs$core$IFn$_invoke$arity$1(next_col_range) : sevengui.cells.cell_ref.range__GT_references.call(null,next_col_range))], null));
}
});
sevengui.cells.cell_ref.check_for_self_reference = (function sevengui$cells$cell_ref$check_for_self_reference(cell_ref,id){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cell_ref,id)){
sevengui.cells.error.throw_error(sevengui.cells.error.ref_error,cell_ref);
} else {
}

return id;
});
sevengui.cells.cell_ref.check_for_circular_reference = (function sevengui$cells$cell_ref$check_for_circular_reference(sheet,cell_ref,id){
var is_circular_ref = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cell_ref,sevengui.cells.cell_ref.ref__GT_expr(sheet,id));
if(is_circular_ref){
sevengui.cells.error.throw_error(sevengui.cells.error.circular_ref_error,id);
} else {
}

return id;
});
sevengui.cells.cell_ref.cell_reference_pattern_QMARK_ = (function sevengui$cells$cell_ref$cell_reference_pattern_QMARK_(expr){
return cljs.core.boolean$(cljs.core.re_find(sevengui.cells.cell_ref.exact_ref_pattern_regex,expr));
});
sevengui.cells.cell_ref.nil__GT_0 = (function sevengui$cells$cell_ref$nil__GT_0(value){
if((value == null)){
return (0);
} else {
return value;
}
});
sevengui.cells.cell_ref.ref__GT_value = (function sevengui$cells$cell_ref$ref__GT_value(sheet,ref){
var cell = sevengui.cells.cell_ref.get_cell(sheet,ref);
return cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(cell));
});
sevengui.cells.cell_ref.find_refs = (function sevengui$cells$cell_ref$find_refs(expr){
if(cljs.core.list_QMARK_(expr)){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(sevengui.cells.cell_ref.find_refs,expr);
} else {
if((((expr instanceof cljs.core.Symbol)) && (sevengui.cells.cell_ref.cell_reference_pattern_QMARK_(cljs.core.str.cljs$core$IFn$_invoke$arity$1(expr))))){
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(expr);
} else {
return cljs.core.PersistentVector.EMPTY;

}
}
});
sevengui.cells.cell_ref.expand_ranges = (function sevengui$cells$cell_ref$expand_ranges(refs){
return cljs.core.flatten(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__13776_SHARP_){
if(sevengui.cells.cell_ref.is_ref_range_QMARK_(p1__13776_SHARP_)){
return sevengui.cells.cell_ref.range__GT_references(p1__13776_SHARP_);
} else {
return p1__13776_SHARP_;
}
}),refs));
});
sevengui.cells.cell_ref.resolve_cell_refs = (function sevengui$cells$cell_ref$resolve_cell_refs(state,cell_ref,ref){
var ref__$1 = clojure.string.upper_case(ref);
var sheet = cljs.core.cst$kw$sheet.cljs$core$IFn$_invoke$arity$1(state);
if(sevengui.cells.cell_ref.is_ref_range_QMARK_(ref__$1)){
return cljs.core.flatten(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__13777_SHARP_){
return (sevengui.cells.cell_ref.resolve_cell_refs.cljs$core$IFn$_invoke$arity$3 ? sevengui.cells.cell_ref.resolve_cell_refs.cljs$core$IFn$_invoke$arity$3(state,cell_ref,p1__13777_SHARP_) : sevengui.cells.cell_ref.resolve_cell_refs.call(null,state,cell_ref,p1__13777_SHARP_));
}),sevengui.cells.cell_ref.range__GT_references(ref__$1)));
} else {
return cljs.core.flatten((new cljs.core.List(null,sevengui.cells.cell_ref.nil__GT_0(sevengui.cells.cell_ref.ref__GT_value(sheet,sevengui.cells.cell_ref.check_for_circular_reference(sheet,cell_ref,sevengui.cells.cell_ref.check_for_self_reference(cell_ref,ref__$1)))),null,(1),null)));
}
});
