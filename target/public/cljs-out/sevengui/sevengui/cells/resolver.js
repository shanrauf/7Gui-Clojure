// Compiled by ClojureScript 1.10.866 {:static-fns true, :optimize-constants true, :optimizations :advanced}
goog.provide('sevengui.cells.resolver');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('sevengui.cells.operator');
goog.require('sevengui.cells.cell_ref');
goog.require('sevengui.cells.error');
sevengui.cells.resolver.resolve_symbol = (function sevengui$cells$resolver$resolve_symbol(state,id,sym){
if(sevengui.cells.cell_ref.cell_reference_pattern_QMARK_(cljs.core.str.cljs$core$IFn$_invoke$arity$1(sym))){
return sevengui.cells.cell_ref.resolve_cell_refs(state,id,cljs.core.str.cljs$core$IFn$_invoke$arity$1(sym));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(sym,cljs.core.cst$sym$_ud800_)){
return "\uD800\uDCCF \u00A1ASTROLABE! \uD800\uDCCF";
} else {
return sevengui.cells.operator.operator_sym__GT_operator(sym);

}
}
});
sevengui.cells.resolver.resolve_cell_expr = (function sevengui$cells$resolver$resolve_cell_expr(state,id,expr){
if(cljs.core.list_QMARK_(expr)){
return sevengui.cells.operator.eval_operation(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__13806_SHARP_){
return (sevengui.cells.resolver.resolve_cell_expr.cljs$core$IFn$_invoke$arity$3 ? sevengui.cells.resolver.resolve_cell_expr.cljs$core$IFn$_invoke$arity$3(state,id,p1__13806_SHARP_) : sevengui.cells.resolver.resolve_cell_expr.call(null,state,id,p1__13806_SHARP_));
}),expr));
} else {
if((expr instanceof cljs.core.Symbol)){
return sevengui.cells.resolver.resolve_symbol(state,id,expr);
} else {
if((expr == null)){
return sevengui.cells.error.throw_error(sevengui.cells.error.value_error,expr);
} else {
return expr;

}
}
}
});
