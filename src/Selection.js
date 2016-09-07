/* global exports */
"use strict";
// var Data_Tuple = require("../Data.Tuple");
exports.d3SelectFn    = function (selector)           { return d3.select(selector); }
exports.d3SelectAllFn = function (selector)           { return d3.selectAll(selector); }

exports.appendFn    = function (tag, selection)       { return selection.append(tag); }
exports.bindDataFn  = function (array, selection)     { return selection.data(array); }
exports.bindDataFnK = function (array, keyFn, selection) { return selection.data(array, keyFn); }
exports.enterFn     = function (selection)            { return selection.enter(); }
exports.exitFn      = function (selection)            { return selection.exit(); }
exports.filterFn    = function (selector, selection)  { return selection.filter(selector); }
exports.filterFnP   = function (predicate, selection) { return selection.filter(predicate); }
exports.insertFn    = function (selector, selection)  { return selection.insert(selector); }
exports.removeFn    = function (selection)            { return selection.remove(); }
exports.selectAllFn = function (selector, selection)  { return selection.selectAll(selector); }
exports.selectElFn  = function (element)              { return d3.select(element); }
exports.selectFn    = function (selector, selection)  { return selection.select(selector); }
exports.styleFn     = function (key, val, selection)  { return selection.style(key, val); }
exports.styleFnP    = function (key, val, selection)  { return selection.style(key, val); }
exports.styleFnPP   = function (key, val, selection)  { return selection.style(key, function (d, i) { return val(d)(i); }) }
exports.textFn      = function (text, selection)      { return selection.text(text); }
exports.textFnP     = function (text, selection)      { return selection.text(text); }
exports.textFnPP    = function (text, selection)      { return selection.text(function (d,i) { return text(d)(i); }); }

// custom version of mkEffFn1 which passes a row containing data including element and 'this'
// enables callbacks in the D3 style which rely on 'this' for access to the D3Element associated with the datum
exports.onFn =  function (selection, eventType, callback) {
                    selection.on(eventType, callback);
                    return selection;
                  }
// NB we default 'prop' to duplicate of datum
exports.mkCallback = function (fn) {
                        return function(d) {
                          return fn(getCallBackParams(d, this, d))();
                        };
                      };

// another callback-making function, this time taking a property name and bundling that with
exports.onFnWithProperty = function (selection, eventType, callback, propname, prop) {
                                selection.on(eventType, callback);
                                selection.property(propname, prop);
                                return selection;
                             }
exports.mkCallbackWithProp = function mkCallbackWithProp(fn) {
                                return function(propName) {
                                  return function(d) {
                                    return fn(getCallBackParams(d, this, this[propName]))();
                                  }
                                };
                              };

// utility function to package up the parameter block for a callback
function getCallBackParams(d, elem, prop) {
  var cbParams = { datum: d
                 , elem: elem
                 , prop: prop    // NB - untyped assignment - only use in mkCallback fns
                 , timestamp: d3.event.timeStamp
                 , meta:      d3.event.metaKey
                 , shift:     d3.event.shiftKey
                 , ctrl:      d3.event.ctrlKey
                 , alt:       d3.event.altKey };
  return cbParams;
}