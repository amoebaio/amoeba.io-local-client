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
        //no params
        var params = [];
        if (typeof(context.request.params) == "undefined") {
            //one param
        } else if (typeof(context.request.params.length) == "undefined") {
            params = [context.request.params];
            //array of params
        } else {
            params = context.request.params.slice(0);
        }
        if (typeof(callback) != "undefined") {
            params.push(callback);
        }
        this.use[context.request.method].apply(this.use, params);

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
