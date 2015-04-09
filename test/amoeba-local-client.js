var assert = require("assert");
var Amoeba = require("../../amoeba.io");
var LocalClient = require("../lib/amoeba-local-client");

var tester = {};

require("../data/auth.js");

describe('LocalClient', function() {
    var amoeba;

    beforeEach(function() {
        tester.res = 0;
        amoeba = new Amoeba();
        amoeba.use("auth").as(new LocalClient(new Auth(tester)));
    });

    it('#invoke empty method', function(done) {
        amoeba.use("auth").invoke("method1");
        setTimeout(function() {
            assert.equal(tester.res, 1);
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
            assert.equal(tester.res, 5);
            done();
        }, 10);
    });

    it('#invoke params method without callback', function(done) {
        amoeba.use("auth").invoke("method4", [1, 2, 3]);
        setTimeout(function() {
            assert.equal(tester.res, 6);
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

    it('#invoke params method with callback', function(done) {
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

    it('#on', function(done) {
        amoeba.use("auth").on("updated", function() {
            done();
        });

        amoeba.use("auth").invoke("event1");
    });

    it('#on auth:*', function(done) {
        amoeba.use("auth").on("*", function() {
            done();
        });

        amoeba.use("auth").invoke("event1");
    });
    
    it('#on *:updated', function(done) {
        amoeba.use("*").on("updated", function() {
            done();
        });

        amoeba.use("auth").invoke("event1");
    });

    it('#on *:*', function(done) {
        amoeba.use("*").on("*", function() {
            done();
        });

        amoeba.use("auth").invoke("event1");
    });


});
