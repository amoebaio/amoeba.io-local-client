QUnit.test("LocalClient", function(assert) {
    amoeba.service("auth").invoke("login", {
        login: 'admin',
        password: 'admin'
    }, function(err, data) {
        assert.equal(err, null);
        assert.equal(data.res, "login ok");
    });
    amoeba.service("auth").invoke("login", {
        login: 'admins',
        password: 'admin'
    }, function(err, data) {
        assert.equal(data, null);
        assert.equal(err.res, "login fail");
    });
    try {
        amoeba.service("auth").invoke("logins", {
            login: 'admins',
            password: 'admin'
        });
    } catch (e) {
        assert.equal(e.message, "Service 'auth' has no method 'logins'");
    }

});

QUnit.test("LocalClient has no method", function(assert) {
    var done = assert.async();

    try {
        amoeba.service("auth").invoke("logins", {
            login: 'admins',
            password: 'admin'
        });
    } catch (e) {
        assert.equal(e.message, "Service 'auth' has no method 'logins'");
        done();
    }

});
