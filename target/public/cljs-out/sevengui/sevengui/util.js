// Compiled by ClojureScript 1.10.866 {:static-fns true, :optimize-constants true, :optimizations :advanced}
goog.provide('sevengui.util');
goog.require('cljs.core');
goog.require('cljs.core.constants');
if((typeof sevengui !== 'undefined') && (typeof sevengui.util !== 'undefined') && (typeof sevengui.util.uuid_regex !== 'undefined')){
} else {
sevengui.util.uuid_regex = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/;
}
sevengui.util.uuid_str_QMARK_ = (function sevengui$util$uuid_str_QMARK_(s){
return cljs.core.boolean$(cljs.core.re_matches(sevengui.util.uuid_regex,s));
});
