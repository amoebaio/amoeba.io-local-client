Auth = function(tester) {
    this.tester = tester;
};

Auth.prototype.method1 = function(callback) {
    this.tester.res = 1;
    if (callback) {
        assert.ok(false);
    }
};

Auth.prototype.method2 = function(callback) {
    callback(null, "ok");
};

Auth.prototype.method3 = function(param, callback) {
    this.tester.res = param.set;
    if (callback) {
        assert.ok(false);
    }
};
Auth.prototype.method4 = function(param1, param2, param3, callback) {
    this.tester.res = param1 + param2 + param3;
    if (callback) {
        assert.ok(false);
    }
};
Auth.prototype.method5 = function(param, callback) {
    callback(null, param.set);
};
Auth.prototype.method6 = function(param1, param2, param3, callback) {
    callback(null, param1 + param2 + param3);
};

Auth.prototype.scopeTest = function(data, callback) {
    this.login(data, callback);
};

Auth.prototype.login = function(data, callback) {
    if (data.login == "admin" && data.password == "admin") {
        callback(null, {
            "res": "login ok"
        });
    } else {
        callback({
            "res": "login fail"
        }, null);
    }
};

Auth.prototype.event1 = function() {
    this.emit("updated", {
        test: 2
    });
};