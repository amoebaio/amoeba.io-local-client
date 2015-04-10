
QUnit.test("LocalClient", function(assert) {
    amoeba.path("auth").invoke("login", {
        login: 'admin',
        password: 'admin'
    }, function(err, result) {
        assert.equal(err, null);
        assert.equal(result.res, "login ok");
    });
    amoeba.path("auth").invoke("login", {
        login: 'admins',
        password: 'admin'
    }, function(err, result) {
        assert.equal(result, null);
        assert.equal(err.res, "login fail");
    });
    try {
        amoeba.path("auth").invoke("logins", {
            login: 'admins',
            password: 'admin'
        });
    } catch (e) {
        assert.equal(e.message, "Object 'auth' has no method 'logins'");
    }

});

QUnit.test("LocalClient has no method", function(assert) {
    var done = assert.async();

    try {
        amoeba.path("auth").invoke("logins", {
            login: 'admins',
            password: 'admin'
        });
    } catch (e) {
        assert.equal(e.message, "Object 'auth' has no method 'logins'");
        done();
    }

});
