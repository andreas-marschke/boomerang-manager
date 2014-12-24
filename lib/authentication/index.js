"use strict";

var Base = require("../base"),
    path = require("path"),
    passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    nunjucks = require("nunjucks"),
    express = require("express"),
    session = require("express-session"),
    cookieParser = require("cookie-parser"),
    bodyParser = require("body-parser");

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader([path.join(__dirname, "views"),
								  path.join(__dirname, "../common/layout"),
								  path.join(__dirname, "../common/macros")]));

env.addGlobal("environment", process.env.NODE_ENV);

function Authentication(config, logger) {
    var routingSetup = {
	successRedirect: "/",
	failureRedirect: "/login/error",
	session: true
    };

    Base.call(this, logger);
    this.config = config;

    this.passport = passport;
    this.passport.serializeUser(this.serializeUser.bind(this));
    this.passport.deserializeUser(this.deserializeUser.bind(this));

    this.authenticationMiddleware = [];
    this.config.active.forEach(function(activeAuthType) {
	if (activeAuthType === "local") {

	    this.passport.use(this.hasLocalStrategy());
	    this.authenticationMiddleware.push(passport.authenticate(activeAuthType, routingSetup));
	}
    }.bind(this));

    return this;
}

Authentication.prototype.router = function() {
    var app = express();

    app.use(cookieParser(this.config.session.secret));
    app.use(session({
	saveUninitialized: true,
	resave: true,
	maxAge: this.config.session.maxAge,
	domain: this.config.session.domain,
	httpOnly: this.config.session.httpOnly,
	keys: this.config.session.keys,
	secret: this.config.session.secret,
	name: "boomerangmanager"
    }));

    app.use(passport.initialize());
    env.express(app);

    app.set("x-powered-by", null);
    app.settings["x-powered-by"] = null;

    app.get("/login", function(req, res) {
	res.render("login.html", { title: req.gettext("Login") });
    });
    app.get("/login/error", function(req, res) {
	res.render("login.html", { error: req.gettext("Login Failed!"), title: req.gettext("Login Error")});
    });
    app.get("/api/auth/methods/active", function(req, res) {
	res.json(this.config.active.map(function(active) { return { name: active }; }));
    }.bind(this));
    app.get("/logout", function(req, res) {
	this.log.info({ session: req.session}, "Session Logout requested");
	req.logout();
	res.redirect("/");
    }.bind(this));

    app.post("/login", bodyParser.urlencoded({ extended: true }), this.authenticationMiddleware);

    return app;
};

Authentication.prototype.hasLocalStrategy = function() {
    return new LocalStrategy(function(username, password, done) {
	var user = this.config.local.users.filter(function(user) {
	    return user.name === username && user.password === password;
	});
	if (user.length === 1) {
	    return done(null, { user: username });
	} else if (user.length === 0) {
	    return done(null, false);
	} else if (user.length > 1) {
	    return done(new Error("More than one user found with the same username and password!"), false);
	} else {
	    return done(null, false);
	}
	return null;
    }.bind(this));
};

Authentication.prototype.serializeUser = function(user, done) {
    this.log.debug({ user: user }, "Serializing user...");
    done(null, user);
};

Authentication.prototype.deserializeUser = function(user, done) {
    this.log.debug({ user: user }, "Deserializing user..");
    done(null, user);
};


Authentication.requiresLogin = function(req, res, next) {
    if (req.session.passport.user) {
	next();
    } else {
	res.removeHeader("x-powered-by");
	res.redirect("/login");
    }
};

module.exports = Authentication;
