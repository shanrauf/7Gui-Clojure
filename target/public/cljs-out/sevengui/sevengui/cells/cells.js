// Compiled by ClojureScript 1.10.866 {:static-fns true, :optimize-constants true, :optimizations :advanced}
goog.provide('sevengui.cells.cells');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('reagent.core');
goog.require('clojure.set');
goog.require('sevengui.cells.parser');
goog.require('sevengui.cells.resolver');
goog.require('sevengui.cells.error');
goog.require('sevengui.cells.cell_ref');
if((typeof sevengui !== 'undefined') && (typeof sevengui.cells !== 'undefined') && (typeof sevengui.cells.cells !== 'undefined') && (typeof sevengui.cells.cells.blank_cell !== 'undefined')){
} else {
sevengui.cells.cells.blank_cell = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$expr,null,cljs.core.cst$kw$value,null], null);
}
sevengui.cells.cells.generate_row = (function sevengui$cells$cells$generate_row(row){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__13938_SHARP_){
var id = sevengui.cells.cell_ref.generate_cell_ref(p1__13938_SHARP_,row);
return (new cljs.core.List(null,id,(new cljs.core.List(null,reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$id,id], null),sevengui.cells.cells.blank_cell], 0))),null,(1),null)),(2),null));
}),sevengui.cells.cell_ref.columns);
});
sevengui.cells.cells.generate_spreadsheet_state = (function sevengui$cells$cells$generate_spreadsheet_state(){
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$columns,sevengui.cells.cell_ref.columns,cljs.core.cst$kw$rows,sevengui.cells.cell_ref.rows,cljs.core.cst$kw$sheet,cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc,cljs.core.PersistentArrayMap.EMPTY,cljs.core.flatten(cljs.core.map.cljs$core$IFn$_invoke$arity$2(sevengui.cells.cells.generate_row,sevengui.cells.cell_ref.rows)))], null);
});
sevengui.cells.cells.set_cell_BANG_ = (function sevengui$cells$cells$set_cell_BANG_(cell,expr,value,err){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(cell,cljs.core.assoc,cljs.core.cst$kw$expr,expr,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$input,expr,cljs.core.cst$kw$value,value,cljs.core.cst$kw$err,err], 0));
});
sevengui.cells.cells.set_editting_BANG_ = (function sevengui$cells$cells$set_editting_BANG_(cell,is_editting){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cell,cljs.core.assoc,cljs.core.cst$kw$is_DASH_editting,is_editting);
});
sevengui.cells.cells.set_input_BANG_ = (function sevengui$cells$cells$set_input_BANG_(cell,input){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cell,cljs.core.assoc,cljs.core.cst$kw$input,input);
});
sevengui.cells.cells.set_cell_error_BANG_ = (function sevengui$cells$cells$set_cell_error_BANG_(cell,id,expr,error){
sevengui.cells.error.log_error(id,error);

return sevengui.cells.cells.set_cell_BANG_(cell,expr,(0),sevengui.cells.error.get_error_name(error));
});
sevengui.cells.cells.eval_cell_expr = (function sevengui$cells$cells$eval_cell_expr(state,id,expr){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.first(expr),"=")){
return sevengui.cells.cell_ref.value_or_number(expr);
} else {
return sevengui.cells.resolver.resolve_cell_expr(state,id,(function (){var G__13939 = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(expr,(1));
return (sevengui.cells.parser.m_parse_cell_expr.cljs$core$IFn$_invoke$arity$1 ? sevengui.cells.parser.m_parse_cell_expr.cljs$core$IFn$_invoke$arity$1(G__13939) : sevengui.cells.parser.m_parse_cell_expr.call(null,G__13939));
})());
}
});
sevengui.cells.cells.extract_refs = (function sevengui$cells$cells$extract_refs(expr){
return cljs.core.set(sevengui.cells.cell_ref.expand_ranges(cljs.core.flatten(sevengui.cells.cell_ref.find_refs((function (){var G__13940 = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(expr,(1));
return (sevengui.cells.parser.m_parse_cell_expr.cljs$core$IFn$_invoke$arity$1 ? sevengui.cells.parser.m_parse_cell_expr.cljs$core$IFn$_invoke$arity$1(G__13940) : sevengui.cells.parser.m_parse_cell_expr.call(null,G__13940));
})()))));
});
sevengui.cells.cells.eval_dependent_cell = (function sevengui$cells$cells$eval_dependent_cell(state){
return (function (id,_,old_val,new_val){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(old_val),cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(new_val))){
var cell = sevengui.cells.cell_ref.get_cell(cljs.core.cst$kw$sheet.cljs$core$IFn$_invoke$arity$1(state),id);
var c = cljs.core.deref(cell);
var expr = cljs.core.cst$kw$expr.cljs$core$IFn$_invoke$arity$1(c);
try{return sevengui.cells.cells.set_cell_BANG_(cell,expr,sevengui.cells.cells.eval_cell_expr(state,id,expr),false);
}catch (e13941){var e = e13941;
return sevengui.cells.cells.set_cell_error_BANG_(cell,id,expr,e);
}} else {
return null;
}
});
});
sevengui.cells.cells.update_watchers = (function sevengui$cells$cells$update_watchers(state,id,last_expr,new_expr){
var old_refs = (cljs.core.truth_(last_expr)?sevengui.cells.cells.extract_refs(last_expr):cljs.core.List.EMPTY);
var new_refs = (cljs.core.truth_(new_expr)?sevengui.cells.cells.extract_refs(new_expr):cljs.core.List.EMPTY);
var removed_refs = clojure.set.difference.cljs$core$IFn$_invoke$arity$2(old_refs,new_refs);
var added_refs = clojure.set.difference.cljs$core$IFn$_invoke$arity$2(new_refs,old_refs);
var sheet = cljs.core.cst$kw$sheet.cljs$core$IFn$_invoke$arity$1(state);
var seq__13944_13952 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (old_refs,new_refs,removed_refs,added_refs,sheet){
return (function (p1__13942_SHARP_){
return sevengui.cells.cell_ref.get_cell(sheet,p1__13942_SHARP_);
});})(old_refs,new_refs,removed_refs,added_refs,sheet))
,removed_refs));
var chunk__13945_13953 = null;
var count__13946_13954 = (0);
var i__13947_13955 = (0);
while(true){
if((i__13947_13955 < count__13946_13954)){
var watched_13956 = chunk__13945_13953.cljs$core$IIndexed$_nth$arity$2(null,i__13947_13955);
if(cljs.core.truth_(watched_13956)){
cljs.core.remove_watch(watched_13956,id);
} else {
}


var G__13957 = seq__13944_13952;
var G__13958 = chunk__13945_13953;
var G__13959 = count__13946_13954;
var G__13960 = (i__13947_13955 + (1));
seq__13944_13952 = G__13957;
chunk__13945_13953 = G__13958;
count__13946_13954 = G__13959;
i__13947_13955 = G__13960;
continue;
} else {
var temp__5753__auto___13961 = cljs.core.seq(seq__13944_13952);
if(temp__5753__auto___13961){
var seq__13944_13962__$1 = temp__5753__auto___13961;
if(cljs.core.chunked_seq_QMARK_(seq__13944_13962__$1)){
var c__4649__auto___13963 = cljs.core.chunk_first(seq__13944_13962__$1);
var G__13964 = cljs.core.chunk_rest(seq__13944_13962__$1);
var G__13965 = c__4649__auto___13963;
var G__13966 = cljs.core.count(c__4649__auto___13963);
var G__13967 = (0);
seq__13944_13952 = G__13964;
chunk__13945_13953 = G__13965;
count__13946_13954 = G__13966;
i__13947_13955 = G__13967;
continue;
} else {
var watched_13968 = cljs.core.first(seq__13944_13962__$1);
if(cljs.core.truth_(watched_13968)){
cljs.core.remove_watch(watched_13968,id);
} else {
}


var G__13969 = cljs.core.next(seq__13944_13962__$1);
var G__13970 = null;
var G__13971 = (0);
var G__13972 = (0);
seq__13944_13952 = G__13969;
chunk__13945_13953 = G__13970;
count__13946_13954 = G__13971;
i__13947_13955 = G__13972;
continue;
}
} else {
}
}
break;
}

var seq__13948 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (old_refs,new_refs,removed_refs,added_refs,sheet){
return (function (p1__13943_SHARP_){
return sevengui.cells.cell_ref.get_cell(sheet,p1__13943_SHARP_);
});})(old_refs,new_refs,removed_refs,added_refs,sheet))
,added_refs));
var chunk__13949 = null;
var count__13950 = (0);
var i__13951 = (0);
while(true){
if((i__13951 < count__13950)){
var to_watch = chunk__13949.cljs$core$IIndexed$_nth$arity$2(null,i__13951);
if(cljs.core.truth_(to_watch)){
cljs.core.add_watch(to_watch,id,sevengui.cells.cells.eval_dependent_cell(state));
} else {
}


var G__13973 = seq__13948;
var G__13974 = chunk__13949;
var G__13975 = count__13950;
var G__13976 = (i__13951 + (1));
seq__13948 = G__13973;
chunk__13949 = G__13974;
count__13950 = G__13975;
i__13951 = G__13976;
continue;
} else {
var temp__5753__auto__ = cljs.core.seq(seq__13948);
if(temp__5753__auto__){
var seq__13948__$1 = temp__5753__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__13948__$1)){
var c__4649__auto__ = cljs.core.chunk_first(seq__13948__$1);
var G__13977 = cljs.core.chunk_rest(seq__13948__$1);
var G__13978 = c__4649__auto__;
var G__13979 = cljs.core.count(c__4649__auto__);
var G__13980 = (0);
seq__13948 = G__13977;
chunk__13949 = G__13978;
count__13950 = G__13979;
i__13951 = G__13980;
continue;
} else {
var to_watch = cljs.core.first(seq__13948__$1);
if(cljs.core.truth_(to_watch)){
cljs.core.add_watch(to_watch,id,sevengui.cells.cells.eval_dependent_cell(state));
} else {
}


var G__13981 = cljs.core.next(seq__13948__$1);
var G__13982 = null;
var G__13983 = (0);
var G__13984 = (0);
seq__13948 = G__13981;
chunk__13949 = G__13982;
count__13950 = G__13983;
i__13951 = G__13984;
continue;
}
} else {
return null;
}
}
break;
}
});
sevengui.cells.cells.on_update_cell_BANG_ = (function sevengui$cells$cells$on_update_cell_BANG_(state,cell,new_expr){
var c = cljs.core.deref(cell);
var last_expr = cljs.core.cst$kw$expr.cljs$core$IFn$_invoke$arity$1(c);
var id = cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(c);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(last_expr,new_expr)){
try{sevengui.cells.cells.set_cell_BANG_(cell,new_expr,sevengui.cells.cells.eval_cell_expr(state,id,new_expr),false);

return sevengui.cells.cells.update_watchers(state,id,last_expr,new_expr);
}catch (e13985){var e = e13985;
return sevengui.cells.cells.set_cell_error_BANG_(cell,id,new_expr,e);
}} else {
return null;
}
});
sevengui.cells.cells.ignore_blur_event_QMARK_ = (function sevengui$cells$cells$ignore_blur_event_QMARK_(e){
return e.currentTarget.contains(e.relatedTarget);
});
sevengui.cells.cells.focus_was_on_input_QMARK_ = (function sevengui$cells$cells$focus_was_on_input_QMARK_(e){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(e.target,e.currentTarget);
});
sevengui.cells.cells.on_blur_cell_BANG_ = (function sevengui$cells$cells$on_blur_cell_BANG_(state,e,cell){
if(cljs.core.not(sevengui.cells.cells.ignore_blur_event_QMARK_(e))){
sevengui.cells.cells.set_editting_BANG_(cell,false);

if(sevengui.cells.cells.focus_was_on_input_QMARK_(e)){
return sevengui.cells.cells.on_update_cell_BANG_(state,cell,e.target.value);
} else {
return null;
}
} else {
return null;
}
});
sevengui.cells.cells.move_focus = (function sevengui$cells$cells$move_focus(target,direction){
var row = target.parentElement;
var rows = row.parentElement.children;
var siblings = row.children;
var idx = Array.from(siblings).indexOf(target);
return (function (){var G__13986 = direction;
var G__13986__$1 = (((G__13986 instanceof cljs.core.Keyword))?G__13986.fqn:null);
switch (G__13986__$1) {
case "left":
return target.previousSibling;

break;
case "right":
var or__4223__auto__ = target.nextSibling;
if(cljs.core.truth_(or__4223__auto__)){
return or__4223__auto__;
} else {
return target;
}

break;
case "up":
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(Array.from(row.previousSibling.children),idx);

break;
case "down":
if(cljs.core.truth_(row.nextSibling)){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(Array.from(row.nextSibling.children),idx);
} else {
return target;
}

break;
case "first":
return cljs.core.second(cljs.core.second(rows).children);

break;
case "last":
return cljs.core.last(cljs.core.last(rows).children);

break;
case "first-in-row":
return cljs.core.second(siblings);

break;
case "last-in-row":
return cljs.core.last(siblings);

break;
case "first-in-col":
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(Array.from(cljs.core.second(rows).children),idx);

break;
case "last-in-col":
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(Array.from(cljs.core.last(rows).children),idx);

break;
default:
return false;

}
})().focus();
});
sevengui.cells.cells.on_keydown_input_BANG_ = (function sevengui$cells$cells$on_keydown_input_BANG_(state,e,cell){
e.stopPropagation();

var key = e.key;
var parent = e.target.parentElement;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["Tab",null,"Enter",null], null), null),key)){
sevengui.cells.cells.on_update_cell_BANG_(state,cell,e.target.value);
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(key,"Escape")){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(cell,cljs.core.assoc,cljs.core.cst$kw$input,"",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$is_DASH_editting,false], 0));

parent.focus();
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(key,"Enter")){
return sevengui.cells.cells.move_focus(parent,cljs.core.cst$kw$down);
} else {
return null;
}
});
sevengui.cells.cells.on_keydown_cell_BANG_ = (function sevengui$cells$cells$on_keydown_cell_BANG_(state,e,cell){
e.preventDefault();

var key = e.key;
var target = e.target;
var G__13988 = key;
switch (G__13988) {
case "ArrowRight":
return sevengui.cells.cells.move_focus(target,cljs.core.cst$kw$right);

break;
case "ArrowLeft":
return sevengui.cells.cells.move_focus(target,cljs.core.cst$kw$left);

break;
case "ArrowUp":
return sevengui.cells.cells.move_focus(target,cljs.core.cst$kw$up);

break;
case "ArrowDown":
return sevengui.cells.cells.move_focus(target,cljs.core.cst$kw$down);

break;
case "Home":
if(cljs.core.truth_(e.ctrlKey)){
return sevengui.cells.cells.move_focus(target,cljs.core.cst$kw$first);
} else {
if(cljs.core.truth_(e.altKey)){
return sevengui.cells.cells.move_focus(target,cljs.core.cst$kw$first_DASH_in_DASH_col);
} else {
return sevengui.cells.cells.move_focus(target,cljs.core.cst$kw$first_DASH_in_DASH_row);

}
}

break;
case "End":
if(cljs.core.truth_(e.ctrlKey)){
return sevengui.cells.cells.move_focus(target,cljs.core.cst$kw$last);
} else {
if(cljs.core.truth_(e.altKey)){
return sevengui.cells.cells.move_focus(target,cljs.core.cst$kw$last_DASH_in_DASH_col);
} else {
return sevengui.cells.cells.move_focus(target,cljs.core.cst$kw$last_DASH_in_DASH_row);

}
}

break;
case "Delete":
case "Backspace":
return sevengui.cells.cells.on_update_cell_BANG_(state,cell,null);

break;
case "Enter":
case " ":
return sevengui.cells.cells.set_editting_BANG_(cell,true);

break;
default:
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(key),(1))){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(cell,cljs.core.assoc,cljs.core.cst$kw$input,key,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$is_DASH_editting,true], 0));
} else {
return null;
}

}
});
sevengui.cells.cells.cell_component = (function sevengui$cells$cells$cell_component(state,col,row){
var cell = sevengui.cells.cell_ref.get_cell(cljs.core.cst$kw$sheet.cljs$core$IFn$_invoke$arity$1(state),sevengui.cells.cell_ref.generate_cell_ref(col,row));
var c = cljs.core.deref(cell);
var input = (function (){var or__4223__auto__ = cljs.core.cst$kw$input.cljs$core$IFn$_invoke$arity$1(c);
if(cljs.core.truth_(or__4223__auto__)){
return or__4223__auto__;
} else {
return cljs.core.cst$kw$expr.cljs$core$IFn$_invoke$arity$1(c);
}
})();
var is_editting = (function (){var or__4223__auto__ = cljs.core.cst$kw$is_DASH_editting.cljs$core$IFn$_invoke$arity$1(c);
if(cljs.core.truth_(or__4223__auto__)){
return or__4223__auto__;
} else {
return false;
}
})();
var error = cljs.core.cst$kw$err.cljs$core$IFn$_invoke$arity$1(c);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td$cell,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$class,(cljs.core.truth_(error)?"invalid-input":null),cljs.core.cst$kw$tab_DASH_index,(cljs.core.truth_(is_editting)?(-1):(0)),cljs.core.cst$kw$on_DASH_key_DASH_down,(function (p1__13990_SHARP_){
return sevengui.cells.cells.on_keydown_cell_BANG_(state,p1__13990_SHARP_,cell);
}),cljs.core.cst$kw$on_DASH_blur,(function (p1__13991_SHARP_){
return sevengui.cells.cells.on_blur_cell_BANG_(state,p1__13991_SHARP_,cell);
}),cljs.core.cst$kw$on_DASH_double_DASH_click,(function (){
return sevengui.cells.cells.set_editting_BANG_(cell,true);
})], null),(cljs.core.truth_(is_editting)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$auto_DASH_focus,true,cljs.core.cst$kw$value,input,cljs.core.cst$kw$on_DASH_change,(function (p1__13992_SHARP_){
return sevengui.cells.cells.set_input_BANG_(cell,p1__13992_SHARP_.target.value);
}),cljs.core.cst$kw$on_DASH_key_DASH_down,(function (p1__13993_SHARP_){
return sevengui.cells.cells.on_keydown_input_BANG_(state,p1__13993_SHARP_,cell);
})], null)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$value,(function (){var or__4223__auto__ = error;
if(cljs.core.truth_(or__4223__auto__)){
return or__4223__auto__;
} else {
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(c));
}
})()], null))], null);
});
sevengui.cells.cells.row_component = (function sevengui$cells$cells$row_component(state,row){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,row], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td$row,row], null),cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (col){
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [sevengui.cells.cells.cell_component,state,col,row], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,col], null));
}),cljs.core.cst$kw$columns.cljs$core$IFn$_invoke$arity$1(state)))], null);
});
sevengui.cells.cells.cells_component = (function sevengui$cells$cells$cells_component(){
var state = sevengui.cells.cells.generate_spreadsheet_state();
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$cells_DASH_container,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h2,"Task 7: Cells"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$cells,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$table,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tbody,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,""], null),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (col){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,col], null),col], null);
}),cljs.core.cst$kw$columns.cljs$core$IFn$_invoke$arity$1(state))], null),cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__13994_SHARP_){
return sevengui.cells.cells.row_component(state,p1__13994_SHARP_);
}),cljs.core.cst$kw$rows.cljs$core$IFn$_invoke$arity$1(state)))], null)], null)], null)], null);
});
