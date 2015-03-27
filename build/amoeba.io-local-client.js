(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
LocalClient = function(use) {
    this.use = use;
};

/**
 * Main point
 * @param  {Object}   context       Object store request, response
 * @param  {Function} callback      function(err, result){}
 * @return
 */
LocalClient.prototype.invoke = function(context, callback) {
    if (this.use[context.request.method]) {
        if(typeof(context.request.params)=="undefined"){
            this.use[context.request.method].apply(this.use, [callback]);
        }else if(typeof(context.request.params.length)=="undefined"){
            this.use[context.request.method].apply(this.use, [context.request.params, callback]);
        }else{
            var params = context.request.params;
            //FIXME
            params.push(callback);
            this.use[context.request.method].apply(this.use, params);
        }
    } else {
        throw new Error("Object '" + context.request.use + "' has no method '" + context.request.method + "'");
    }
};

LocalClient.prototype.on = function(use, event, callback, onadded) {
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
