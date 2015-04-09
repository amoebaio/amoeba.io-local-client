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
    //    callback
    if (this.entity[context.request.method]) {
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

        if (context.response) {
            params.push(function(err, result) {
                context.response.error = err;
                context.response.result = result;
                next();
            });
        }
        this.entity[context.request.method].apply(this.entity, params);

    } else {
        throw new Error("Object '" + context.request.path + "' has no method '" + context.request.method + "'");
    }
};

module.exports = exports = LocalClient;
