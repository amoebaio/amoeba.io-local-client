(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
LocalClient = function(entity) {
    this.entity = entity;
};

LocalClient.prototype.init = function(amoeba, oncomplete) {
    //initialize emit function
    this.entity.emit = function(event, data) {
        amoeba.emit(event, data);
    };
    if (oncomplete) {
        oncomplete(null, {
            success: true
        });
    }
};

LocalClient.prototype.invoke = function(context, next) {

    if (this.entity[context.request.method]) {
        //clone arguments
        var args = Array.prototype.slice.call(context.request.arguments);

        if (context.response) {
            args.push(function(err, result) {
                context.response.error = err;
                context.response.result = result;
                next();
            });
        }
        this.entity[context.request.method].apply(this.entity, args);
        if (!context.response) {
            next();
        }

    } else {
        throw new Error("Object '" + context.request.path + "' has no method '" + context.request.method + "'");
    }
};

module.exports = exports = LocalClient;

},{}]},{},[1]);
