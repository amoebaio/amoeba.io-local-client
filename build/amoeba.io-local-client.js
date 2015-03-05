(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
LocalClient = function(use) {
    this.use = use;
};

/**
 * Main point
 * @param  {String}   use
 * @param  {String}   method      [description]
 * @param  {Object}   data        [description]
 * @param  {Function} callback    [description]
 * @return
 */
LocalClient.prototype.invoke = function(use, method, data, callback) {
    if (this.use[method]) {
        this.use[method].apply(this.use, [data, callback]);
    } else {
        throw new Error("Object '" + use + "' has no method '" + method + "'");
    }
};

LocalClient.prototype.on = function(use, event, callback, onadded) {
	//callback=function(){check before event}
    this.use.on(event, callback);
    if (onadded) {
        onadded(null, {
            success: true
        });
    }
};

LocalClient.prototype.removeListener = function(use, event, listener, onremoved) {
    this.use.removeListener(event, listener);
    if (onremoved) {
        onremoved(null, {
            success: true
        });
    }
};
module.exports = exports = LocalClient;

},{}]},{},[1]);
