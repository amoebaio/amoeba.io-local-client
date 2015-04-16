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
