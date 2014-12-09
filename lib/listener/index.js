"use strict";
var Base = require("../base"),
    express = require("express"),
    http = require("http"),
    https = require("https"),
    fs = require("fs"),
    path = require("path"),
    servestatic = require("serve-static"),
    ErrorHandler = require("../error").ErrorHandler,
    i18n = require("i18n-abide");

var Authentication = require("./../authentication");

function Listener(config, loggers, callback) {
    this.config = config;
    Base.call(this, loggers.app);
    this.loggers = loggers;
    this.callback = callback;
}

Listener.prototype.startup = function() {
    var auth,
	errorHandler = new ErrorHandler({ }, this.loggers.app);

    this.app = express();
    this.app.use(this.loggers.web);
    this.app.use(i18n.abide(this.config.i18n));

    this.app.set("x-powered-by", null);
    this.app.settings["x-powered-by"] = null;

    auth = new Authentication(this.config.authentication, this.loggers.application);
    this.app.use(auth.router());

    try  {
	if (typeof this.callback === "function") {
	    this.callback(this.app);
	}
    } catch(ex) {
	this.loggers.application.trace(ex);
    }

    if(this.config.server.servestatic) {
	this.app.use(servestatic(this.config.server.servestatic, {
	    index: false,
	    lastModified: true,
	    maxAge: 0,
	    etag: true,
	    dotfiles: "deny",

	    setHeaders: function(res) {
		res.removeHeader("x-powered-by");
	    }
	}));
    }

    this.app.use(errorHandler.router());
    this.config.server.listeners.forEach(this.startListener.bind(this));
};

Listener.prototype.startListener = function(listener) {
    if (listener.protocol === "http" ) {
	this.loggers.application.info({ listener: listener }, "Starting HTTP Application Server");
	this.http(listener).listen(listener.port, listener.listen, this.dropSecurityContext.bind(this, listener));
    } else if (listener.protocol === "https" ) {
	this.loggers.application.info({ listener: listener }, "Starting HTTPS Application Server");
	this.https(listener).listen(listener.port, listener.listen, this.dropSecurityContext.bind(this, listener));
    }
};

Listener.prototype.http = function () {
    return http.createServer(this.app);
};

Listener.prototype.https = function  (listener) {
    return https.createServer({
	key: fs.readFileSync(path.resolve(listener.key)),
	cert: fs.readFileSync(path.resolve(listener.cert))
    }, this.app);
};

Listener.prototype.dropSecurityContext = function () {
    if(typeof this.config.security !== "undefined") {
	this.loggers.application.info({context: { user: this.config.security.user, group:this.config.security.group }  }, "Dropping to security context " + (this.config.security.user || "boomerang") + ":" + (this.config.security.group || "boomerang"));
	process.setgid(this.config.security.group || "boomerang");
	process.setuid(this.config.security.user || "boomerang");
    } else {
	this.loggers.application.info({context: { user: "boomerang", group: "boomerang" }}, "Dropping to security context boomerang:boomerang");
	process.setgid("boomerang");
	process.setuid("boomerang");
    }
};

module.exports = Listener;
