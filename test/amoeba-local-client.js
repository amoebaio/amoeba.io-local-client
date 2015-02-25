var assert = require("assert");
var Amoeba = require("amoeba.io");
var LocalClient = require("../lib/amoeba-local-client");

Auth = function() {

};
Auth.prototype.scopeTest = function(data, callback){
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
        amoeba = new Amoeba();
        amoeba.service("auth", new LocalClient(new Auth()));
    });

    it('#invoke success', function(done) {
        amoeba.service("auth").invoke("login", {
            login: 'admin',
            password: 'admin'
        }, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.res, "login ok");
            done();
        });
    });

    it('#invoke error', function(done) {

        amoeba.service("auth").invoke("login", {
            login: 'admins',
            password: 'admin'
        }, function(err, data) {
            assert.equal(data, null);
            assert.equal(err.res, "login fail");
            done();
        });
    });

    it('#invoke scope test', function(done) {
        amoeba.service("auth").invoke("scopeTest", {
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
            amoeba.service("auth").invoke("unlogin", {
                login: 'admins',
                password: 'admin'
            }, function(err, data) {
                assert.ok(false);
            });
        } catch (e) {
            assert.equal(e.message, "Service 'auth' has no method 'unlogin'");
        }
    });
});
