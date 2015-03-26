var assert = require("assert");
var Amoeba = require("amoeba.io");
var LocalClient = require("../lib/amoeba-local-client");

var tester = 0;

Auth = function() {

};

Auth.prototype.method1 = function() {
    tester = 1;
};

Auth.prototype.method2 = function(callback) {
    callback(null, "ok");
};

Auth.prototype.method3 = function(param) {
    tester = param.set;
};
Auth.prototype.method4 = function(param1, param2, param3) {
    tester = param1 + param2 + param3;
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

describe('LocalClient', function() {
    var amoeba;

    beforeEach(function() {
        tester = 0;
        amoeba = new Amoeba();
        amoeba.use("auth", new LocalClient(new Auth()));
    });

    it('#invoke empty method', function(done) {
        amoeba.use("auth").invoke("method1");
        setTimeout(function() {
            assert.equal(tester, 1);
            done();
        }, 10);
    });

    it('#invoke empty method with callback', function(done) {
        amoeba.use("auth").invoke("method2", function(err, data) {
            assert.equal(data, "ok");
            done();
        });
    });

    it('#invoke param method without callback', function(done) {
        amoeba.use("auth").invoke("method3", {
            "set": 5
        });
        setTimeout(function() {
            assert.equal(tester, 5);
            done();
        }, 10);
    });

    it('#invoke params method without callback', function(done) {
        amoeba.use("auth").invoke("method4", [1, 2, 3]);
        setTimeout(function() {
            assert.equal(tester, 6);
            done();
        }, 10);
    });

    it('#invoke param method with callback', function(done) {
        amoeba.use("auth").invoke("method5", {
            "set": 5
        }, function(err, result) {
            assert.equal(result, 5);
            done();
        });
    });

    it('#invoke param method with callback', function(done) {
        amoeba.use("auth").invoke("method6", [1, 2, 3], function(err, result) {
            assert.equal(result, 6);
            done();
        });
    });


    it('#invoke success', function(done) {
        amoeba.use("auth").invoke("login", {
            login: 'admin',
            password: 'admin'
        }, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.res, "login ok");
            done();
        });
    });

    it('#invoke error', function(done) {

        amoeba.use("auth").invoke("login", {
            login: 'admins',
            password: 'admin'
        }, function(err, data) {
            assert.equal(data, null);
            assert.equal(err.res, "login fail");
            done();
        });
    });

    it('#invoke scope test', function(done) {
        amoeba.use("auth").invoke("scopeTest", {
            login: 'admin',
            password: 'admin'
        }, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.res, "login ok");
            done();
        });
    });

    it('#invoke unknown method', function() {
        try {
            amoeba.use("auth").invoke("unlogin", {
                login: 'admins',
                password: 'admin'
            }, function(err, data) {
                assert.ok(false);
            });
        } catch (e) {
            assert.equal(e.message, "Object 'auth' has no method 'unlogin'");
        }
    });
});
