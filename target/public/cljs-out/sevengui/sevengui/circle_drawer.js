// Compiled by ClojureScript 1.10.866 {:static-fns true, :optimize-constants true, :optimizations :advanced}
goog.provide('sevengui.circle_drawer');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('reagent.core');
goog.require('sevengui.util');
if((typeof sevengui !== 'undefined') && (typeof sevengui.circle_drawer !== 'undefined') && (typeof sevengui.circle_drawer.default_radius !== 'undefined')){
} else {
sevengui.circle_drawer.default_radius = (10);
}
if((typeof sevengui !== 'undefined') && (typeof sevengui.circle_drawer !== 'undefined') && (typeof sevengui.circle_drawer.minimum_radius !== 'undefined')){
} else {
sevengui.circle_drawer.minimum_radius = (5);
}
if((typeof sevengui !== 'undefined') && (typeof sevengui.circle_drawer !== 'undefined') && (typeof sevengui.circle_drawer.initial_state !== 'undefined')){
} else {
sevengui.circle_drawer.initial_state = new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$circles,cljs.core.PersistentVector.EMPTY,cljs.core.cst$kw$selected_DASH_circle,null,cljs.core.cst$kw$undo_DASH_stack,cljs.core.PersistentVector.EMPTY,cljs.core.cst$kw$redo_DASH_stack,cljs.core.PersistentVector.EMPTY,cljs.core.cst$kw$popup_DASH_active,false,cljs.core.cst$kw$slider_DASH_active,false], null);
}
sevengui.circle_drawer.selected_QMARK_ = (function sevengui$circle_drawer$selected_QMARK_(state,c){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(c),cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$selected_DASH_circle.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state))));
});
sevengui.circle_drawer.same_circles_QMARK_ = (function sevengui$circle_drawer$same_circles_QMARK_(c1,c2){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(c1),cljs.core.cst$kw$id.cljs$core$IFn$_invoke$arity$1(c2));
});
sevengui.circle_drawer.equivalent_circles_QMARK_ = (function sevengui$circle_drawer$equivalent_circles_QMARK_(c1,c2){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$r.cljs$core$IFn$_invoke$arity$1(c1),cljs.core.cst$kw$r.cljs$core$IFn$_invoke$arity$1(c2));
});
sevengui.circle_drawer.some_circle_selected_QMARK_ = (function sevengui$circle_drawer$some_circle_selected_QMARK_(state){
return cljs.core.boolean$(cljs.core.cst$kw$selected_DASH_circle.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state)));
});
sevengui.circle_drawer.popup_active_QMARK_ = (function sevengui$circle_drawer$popup_active_QMARK_(state){
return cljs.core.cst$kw$popup_DASH_active.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state));
});
sevengui.circle_drawer.slider_active_QMARK_ = (function sevengui$circle_drawer$slider_active_QMARK_(state){
return cljs.core.cst$kw$slider_DASH_active.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state));
});
sevengui.circle_drawer.can_undo_QMARK_ = (function sevengui$circle_drawer$can_undo_QMARK_(state){
return cljs.core.seq(cljs.core.cst$kw$undo_DASH_stack.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state)));
});
sevengui.circle_drawer.can_redo_QMARK_ = (function sevengui$circle_drawer$can_redo_QMARK_(state){
return cljs.core.seq(cljs.core.cst$kw$redo_DASH_stack.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state)));
});
sevengui.circle_drawer.undo_BANG_ = (function sevengui$circle_drawer$undo_BANG_(state){
var map__13322 = cljs.core.deref(state);
var map__13322__$1 = cljs.core.__destructure_map(map__13322);
var undo_stack = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13322__$1,cljs.core.cst$kw$undo_DASH_stack);
var redo_stack = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13322__$1,cljs.core.cst$kw$redo_DASH_stack);
var circles = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13322__$1,cljs.core.cst$kw$circles);
if(sevengui.circle_drawer.can_undo_QMARK_(state)){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state,cljs.core.assoc,cljs.core.cst$kw$popup_DASH_active,false,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$selected_DASH_circle,null,cljs.core.cst$kw$circles,cljs.core.last(undo_stack),cljs.core.cst$kw$undo_DASH_stack,cljs.core.pop(undo_stack),cljs.core.cst$kw$redo_DASH_stack,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(redo_stack,circles)], 0));
} else {
return null;
}
});
sevengui.circle_drawer.redo_BANG_ = (function sevengui$circle_drawer$redo_BANG_(state){
var map__13323 = cljs.core.deref(state);
var map__13323__$1 = cljs.core.__destructure_map(map__13323);
var undo_stack = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13323__$1,cljs.core.cst$kw$undo_DASH_stack);
var redo_stack = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13323__$1,cljs.core.cst$kw$redo_DASH_stack);
var circles = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13323__$1,cljs.core.cst$kw$circles);
if(sevengui.circle_drawer.can_redo_QMARK_(state)){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state,cljs.core.assoc,cljs.core.cst$kw$popup_DASH_active,false,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$selected_DASH_circle,null,cljs.core.cst$kw$circles,cljs.core.last(redo_stack),cljs.core.cst$kw$redo_DASH_stack,cljs.core.pop(redo_stack),cljs.core.cst$kw$undo_DASH_stack,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(undo_stack,circles)], 0));
} else {
return null;
}
});
sevengui.circle_drawer.set_undo_stack_BANG_ = (function sevengui$circle_drawer$set_undo_stack_BANG_(state,stack){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,cljs.core.cst$kw$undo_DASH_stack,stack);
});
sevengui.circle_drawer.set_redo_stack_BANG_ = (function sevengui$circle_drawer$set_redo_stack_BANG_(state,stack){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,cljs.core.cst$kw$redo_DASH_stack,stack);
});
sevengui.circle_drawer.d__GT_r = (function sevengui$circle_drawer$d__GT_r(d){
return (d / (2));
});
sevengui.circle_drawer.r__GT_d = (function sevengui$circle_drawer$r__GT_d(r){
return (r * (2));
});
sevengui.circle_drawer.distance_between = (function sevengui$circle_drawer$distance_between(x1,y1,x2,y2){
var G__13324 = ((function (){var G__13325 = (y2 - y1);
var G__13326 = (2);
return Math.pow(G__13325,G__13326);
})() + (function (){var G__13327 = (x2 - x1);
var G__13328 = (2);
return Math.pow(G__13327,G__13328);
})());
return Math.sqrt(G__13324);
});
sevengui.circle_drawer.get_closest_circle = (function sevengui$circle_drawer$get_closest_circle(state,p__13329){
var vec__13330 = p__13329;
var x0 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13330,(0),null);
var y0 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13330,(1),null);
return cljs.core.cst$kw$c.cljs$core$IFn$_invoke$arity$1(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (prev,c){
var map__13333 = c;
var map__13333__$1 = cljs.core.__destructure_map(map__13333);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13333__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13333__$1,cljs.core.cst$kw$y);
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13333__$1,cljs.core.cst$kw$r);
var distance_from_circle = sevengui.circle_drawer.distance_between(x0,y0,x,y);
var mouse_within_circle = (distance_from_circle < r);
var closer_circle = (distance_from_circle < cljs.core.cst$kw$d.cljs$core$IFn$_invoke$arity$1(prev));
if(((mouse_within_circle) && (closer_circle))){
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$d,distance_from_circle,cljs.core.cst$kw$c,c], null);
} else {
return prev;
}
}),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$d,Infinity,cljs.core.cst$kw$c,null], null),cljs.core.cst$kw$circles.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state))));
});
sevengui.circle_drawer.generate_circle = (function sevengui$circle_drawer$generate_circle(id,x,y,r){
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$id,((((typeof id === 'string') && (sevengui.util.uuid_str_QMARK_(id))))?id:(((id == null))?cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.random_uuid()):(function(){throw (new Error("Id must be a UUID string"))})()
)),cljs.core.cst$kw$x,(cljs.core.truth_(isNaN(x))?(function(){throw (new Error("X coordinate must be a number"))})():x),cljs.core.cst$kw$y,(cljs.core.truth_(isNaN(y))?(function(){throw (new Error("Y coordinate must be a number"))})():y),cljs.core.cst$kw$r,(((r == null))?sevengui.circle_drawer.default_radius:((((typeof r === 'number') && ((r > (0)))))?r:(function(){throw (new Error("Radius must be a number > 0"))})()
))], null);
});
sevengui.circle_drawer.get_dom_event_coords = (function sevengui$circle_drawer$get_dom_event_coords(e){
var rect = e.currentTarget.getBoundingClientRect();
var x = (e.clientX - (rect.left | (0)));
var y = (e.clientY - (rect.top | (0)));
return (new cljs.core.List(null,x,(new cljs.core.List(null,y,null,(1),null)),(2),null));
});
sevengui.circle_drawer.set_circles_BANG_ = (function sevengui$circle_drawer$set_circles_BANG_(state,circles){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,cljs.core.cst$kw$circles,circles);
});
sevengui.circle_drawer.create_circle_BANG_ = (function sevengui$circle_drawer$create_circle_BANG_(state,p__13334){
var vec__13335 = p__13334;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13335,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13335,(1),null);
var map__13338 = cljs.core.deref(state);
var map__13338__$1 = cljs.core.__destructure_map(map__13338);
var circles = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13338__$1,cljs.core.cst$kw$circles);
var undo_stack = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13338__$1,cljs.core.cst$kw$undo_DASH_stack);
var new_circle = sevengui.circle_drawer.generate_circle(null,x,y,sevengui.circle_drawer.default_radius);
sevengui.circle_drawer.set_circles_BANG_(state,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(circles,new_circle));

sevengui.circle_drawer.set_undo_stack_BANG_(state,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(undo_stack,circles));

sevengui.circle_drawer.set_redo_stack_BANG_(state,cljs.core.PersistentVector.EMPTY);

return new_circle;
});
sevengui.circle_drawer.adjust_diameter_QMARK_ = (function sevengui$circle_drawer$adjust_diameter_QMARK_(c1,c2){
return ((sevengui.circle_drawer.same_circles_QMARK_(c1,c2)) && ((!(sevengui.circle_drawer.equivalent_circles_QMARK_(c1,c2)))));
});
sevengui.circle_drawer.commit_circle_diameter_BANG_ = (function sevengui$circle_drawer$commit_circle_diameter_BANG_(state){
var map__13340 = cljs.core.deref(state);
var map__13340__$1 = cljs.core.__destructure_map(map__13340);
var selected_circle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13340__$1,cljs.core.cst$kw$selected_DASH_circle);
var circles = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13340__$1,cljs.core.cst$kw$circles);
var undo_stack = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13340__$1,cljs.core.cst$kw$undo_DASH_stack);
sevengui.circle_drawer.set_circles_BANG_(state,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__13339_SHARP_){
if(sevengui.circle_drawer.adjust_diameter_QMARK_(p1__13339_SHARP_,selected_circle)){
return selected_circle;
} else {
return p1__13339_SHARP_;
}
}),circles));

sevengui.circle_drawer.set_undo_stack_BANG_(state,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(undo_stack,circles));

return sevengui.circle_drawer.set_redo_stack_BANG_(state,cljs.core.PersistentVector.EMPTY);
});
sevengui.circle_drawer.set_selected_circle_BANG_ = (function sevengui$circle_drawer$set_selected_circle_BANG_(state,c){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,cljs.core.cst$kw$selected_DASH_circle,c);
});
sevengui.circle_drawer.select_closest_circle_BANG_ = (function sevengui$circle_drawer$select_closest_circle_BANG_(state,coords){
var G__13343 = sevengui.circle_drawer.get_closest_circle(state,coords);
var fexpr__13342 = (function (p1__13341_SHARP_){
if((!(sevengui.circle_drawer.selected_QMARK_(state,p1__13341_SHARP_)))){
return sevengui.circle_drawer.set_selected_circle_BANG_(state,p1__13341_SHARP_);
} else {
return null;
}
});
return fexpr__13342(G__13343);
});
sevengui.circle_drawer.set_popup_BANG_ = (function sevengui$circle_drawer$set_popup_BANG_(state,is_visible){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,cljs.core.cst$kw$popup_DASH_active,is_visible);
});
sevengui.circle_drawer.set_slider_BANG_ = (function sevengui$circle_drawer$set_slider_BANG_(state,is_visible){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state,cljs.core.assoc,cljs.core.cst$kw$slider_DASH_active,is_visible);
});
sevengui.circle_drawer.on_canvas_left_click_BANG_ = (function sevengui$circle_drawer$on_canvas_left_click_BANG_(state,e){
return sevengui.circle_drawer.set_selected_circle_BANG_(state,sevengui.circle_drawer.create_circle_BANG_(state,sevengui.circle_drawer.get_dom_event_coords(e)));
});
sevengui.circle_drawer.on_canvas_right_click_BANG_ = (function sevengui$circle_drawer$on_canvas_right_click_BANG_(state,e){
e.preventDefault();

if(sevengui.circle_drawer.some_circle_selected_QMARK_(state)){
return sevengui.circle_drawer.set_popup_BANG_(state,true);
} else {
return null;
}
});
sevengui.circle_drawer.on_canvas_mouse_move_BANG_ = (function sevengui$circle_drawer$on_canvas_mouse_move_BANG_(state,e){
if(cljs.core.not(sevengui.circle_drawer.popup_active_QMARK_(state))){
return sevengui.circle_drawer.select_closest_circle_BANG_(state,sevengui.circle_drawer.get_dom_event_coords(e));
} else {
return null;
}
});
sevengui.circle_drawer.on_change_diameter_BANG_ = (function sevengui$circle_drawer$on_change_diameter_BANG_(state,d){
var map__13344 = cljs.core.cst$kw$selected_DASH_circle.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state));
var map__13344__$1 = cljs.core.__destructure_map(map__13344);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13344__$1,cljs.core.cst$kw$id);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13344__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13344__$1,cljs.core.cst$kw$y);
var r = sevengui.circle_drawer.d__GT_r(d);
return sevengui.circle_drawer.set_selected_circle_BANG_(state,sevengui.circle_drawer.generate_circle(id,x,y,r));
});
sevengui.circle_drawer.on_popup_blur_BANG_ = (function sevengui$circle_drawer$on_popup_blur_BANG_(state){
sevengui.circle_drawer.commit_circle_diameter_BANG_(state);

sevengui.circle_drawer.set_selected_circle_BANG_(state,null);

sevengui.circle_drawer.set_slider_BANG_(state,false);

return sevengui.circle_drawer.set_popup_BANG_(state,false);
});
sevengui.circle_drawer.on_undo_BANG_ = (function sevengui$circle_drawer$on_undo_BANG_(state){
return sevengui.circle_drawer.undo_BANG_(state);
});
sevengui.circle_drawer.on_redo_BANG_ = (function sevengui$circle_drawer$on_redo_BANG_(state){
return sevengui.circle_drawer.redo_BANG_(state);
});
sevengui.circle_drawer.popup_component = (function sevengui$circle_drawer$popup_component(state){
var map__13346 = cljs.core.cst$kw$selected_DASH_circle.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state));
var map__13346__$1 = cljs.core.__destructure_map(map__13346);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13346__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13346__$1,cljs.core.cst$kw$y);
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13346__$1,cljs.core.cst$kw$r);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$form$popup,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$left,x,cljs.core.cst$kw$top,y], null),cljs.core.cst$kw$on_DASH_blur,(function (){
return sevengui.circle_drawer.on_popup_blur_BANG_(state);
})], null),(cljs.core.truth_(sevengui.circle_drawer.slider_active_QMARK_(state))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$slider,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"Adjust Diameter"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$type,"range",cljs.core.cst$kw$min,sevengui.circle_drawer.minimum_radius,cljs.core.cst$kw$auto_DASH_focus,true,cljs.core.cst$kw$value,sevengui.circle_drawer.r__GT_d(r),cljs.core.cst$kw$on_DASH_change,(function (p1__13345_SHARP_){
return sevengui.circle_drawer.on_change_diameter_BANG_(state,p1__13345_SHARP_.target.value);
})], null)], null)], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$custom_DASH_button,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,"button",cljs.core.cst$kw$auto_DASH_focus,true,cljs.core.cst$kw$on_DASH_click,(function (){
return sevengui.circle_drawer.set_slider_BANG_(state,true);
})], null),"Adjust Diameter..."], null))], null);
});
sevengui.circle_drawer.circle_component = (function sevengui$circle_drawer$circle_component(state,c){
var map__13347 = c;
var map__13347__$1 = cljs.core.__destructure_map(map__13347);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13347__$1,cljs.core.cst$kw$id);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13347__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13347__$1,cljs.core.cst$kw$y);
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13347__$1,cljs.core.cst$kw$r);
var is_selected = sevengui.circle_drawer.selected_QMARK_(state,c);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$circle,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$class,((is_selected)?"selected-circle":null),cljs.core.cst$kw$key,id,cljs.core.cst$kw$cx,x,cljs.core.cst$kw$cy,y,cljs.core.cst$kw$r,((is_selected)?cljs.core.cst$kw$r.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$selected_DASH_circle.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state))):r)], null)], null);
});
sevengui.circle_drawer.canvas_component = (function sevengui$circle_drawer$canvas_component(state){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$canvas_DASH_container,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$svg,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$on_DASH_click,(function (p1__13348_SHARP_){
return sevengui.circle_drawer.on_canvas_left_click_BANG_(state,p1__13348_SHARP_);
}),cljs.core.cst$kw$on_DASH_mouse_DASH_move,(function (p1__13349_SHARP_){
return sevengui.circle_drawer.on_canvas_mouse_move_BANG_(state,p1__13349_SHARP_);
}),cljs.core.cst$kw$on_DASH_context_DASH_menu,(function (p1__13350_SHARP_){
return sevengui.circle_drawer.on_canvas_right_click_BANG_(state,p1__13350_SHARP_);
})], null),cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__13351_SHARP_){
return sevengui.circle_drawer.circle_component(state,p1__13351_SHARP_);
}),cljs.core.cst$kw$circles.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state))))], null),(cljs.core.truth_(sevengui.circle_drawer.popup_active_QMARK_(state))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sevengui.circle_drawer.popup_component,state], null):null)], null);
});
sevengui.circle_drawer.circle_drawer_component = (function sevengui$circle_drawer$circle_drawer_component(){
var state = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(sevengui.circle_drawer.initial_state);
return (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$task,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h2,"Task 6: Circle Drawer"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$custom_DASH_button,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,"button",cljs.core.cst$kw$disabled,cljs.core.not(sevengui.circle_drawer.can_undo_QMARK_(state)),cljs.core.cst$kw$on_DASH_click,(function (){
return sevengui.circle_drawer.on_undo_BANG_(state);
})], null),"Undo"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$custom_DASH_button,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,"button",cljs.core.cst$kw$disabled,cljs.core.not(sevengui.circle_drawer.can_redo_QMARK_(state)),cljs.core.cst$kw$on_DASH_click,(function (){
return sevengui.circle_drawer.on_redo_BANG_(state);
})], null),"Redo"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sevengui.circle_drawer.canvas_component,state], null)], null);
});
});
