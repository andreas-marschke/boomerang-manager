"use strict";

var Base = require("../base"),
    path = require("path"),
    Authentication = require("../authentication"),
    nunjucks = require("nunjucks"),
    cookieParser = require("cookie-parser"),
    express = require("express"),
    bodyParser = require("body-parser");

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader([path.join(__dirname, "views"),
								  path.join(__dirname, "../common/layout"),
								  path.join(__dirname, "../common/macros")]));

function UserManagement(config, datastore, logger) {
    Base.call(this, logger);
    this.config = config || {};
    this.datastore = datastore;
}

UserManagement.prototype.router = function() {
    var app = express();
    env.express(app);
    app.use(cookieParser());

    // Authentication.requiresLogin.bind(this)
    app.get("/usermanagement", function(req, res) {
	this.log.info({ session: req.session }, "User currently viewing usermanagement");
	res.render("usermanagement.html", {
	    title: req.gettext("Usermanagement")
	});
    }.bind(this));

    app.get("/api/users", this.users.bind(this));
    app.get("/api/user/:id", this.users.bind(this));

    app.get("/api/user/:id/collections", this.collections.bind(this));
    app.get("/api/user/:id/:collection/sizes", this.collectionSizes.bind(this));
    app.get("/api/user/:id/:collection/types", this.collectionTypes.bind(this));

    app.post("/api/user/create", bodyParser.json({ extended: true }), this.userCreate.bind(this));
    app.post("/api/user/remove", bodyParser.json({ extended: true }), this.userRemove.bind(this));

    app.post("/api/user/:id/collection/create", bodyParser.urlencoded({ extended: true }), this.collectionCreate.bind(this));
    app.post("/api/user/:id/collection/remove", bodyParser.urlencoded({ extended: true }), this.collectionRemove.bind(this));

    app.post("api/user/:id/:collection/type/create", bodyParser.urlencoded({ extended: true }), this.typeCreate.bind(this));
    app.post("api/user/:id/:collection/type/remove", bodyParser.urlencoded({ extended: true }), this.typeRemove.bind(this));
    return app;
};

UserManagement.prototype.users = function(req, res) {
    this.datastore.users().then(function(users) {
	if (typeof req.params.id === "undefined" ) {
	    res.json(users);
	} else {
	    res.json(users.filter(function(user) { return user.id === req.params.id; })[0]);
	}
    }, function(error) {
	res.json(error);
    });
};

UserManagement.prototype.collections = function(req, res) {
    if (typeof req.params.id === "undefined") {
	res.json([]);
	return null;
    }

    this.datastore.collections(req.params.id).then(function (collections) {
	res.json(collections);
    }, function (error) {
	res.json([error]);
    });

    return null;
};

UserManagement.prototype.collectionSizes = function(req, res) {
    if(typeof req.params.id === "undefined" && typeof req.params.collection === "undefined") {
	res.json([]);
	return null;
    }

    this.datastore.collectionSize(req.params.id, req.params.collection).then(function (sizes) {
	res.json(sizes);
    },function (error) {
	res.json([error]);
    });

    return null;
};

UserManagement.prototype.collectionTypes = function(req, res) {
    if (typeof req.params.id === "undefined" || typeof req.params.collection === "undefined") {
	res.json([]);
	return null;
    }

    this.datastore.typesByUserCollection(req.params.id, req.params.collection).then(function (types) {
	res.json(types);
	return null;
    }, function (error) {
	res.json([error]);
	return null;
    });

    return null;
};


UserManagement.prototype.userCreate = function (req, res) {
    if (typeof req.body.name === "undefined" || typeof req.body.via === "undefined") {
	res.json({ status: "error", message: req.gettext("Username or Auth-Method are missing!") });
	return null;
    }

    this.datastore.createUser(req.body.name, req.body.via).then(function (result) {
	res.json({ id: result});
	return null;
    },function (error) {
	res.json({ status: "error", message: req.gettext("Error while creating user in database") });
	return null;
    });

    return null;
};

UserManagement.prototype.userRemove = function (req, res) {
    if (typeof req.body.name === "undefined" || typeof req.body.id === "undefined") {
	res.json({ status: "error", message: req.gettext("Username or id have not been given") });
	return null;
    }

    this.datastore.removeUser(req.body.id, req.body.name).then(function(result) {
	res.json({ status: "success"});
    }, function(error) {
	res.json(error);
    });

    return null;
};

UserManagement.prototype.collectionCreate = function (req, res) {
    if (typeof req.body.data === "undefined") {
	res.json();
	return null;
    }

    return null;
};

UserManagement.prototype.collectionRemove = function (req, res) {

};

UserManagement.prototype.typeCreate = function (req, res) {

};

UserManagement.prototype.typeRemove = function (req, res) {


};


module.exports = UserManagement;
