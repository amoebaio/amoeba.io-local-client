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
