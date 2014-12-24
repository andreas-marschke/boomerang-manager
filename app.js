"use strict";
/* eslint-disable no-console,vars-on-top*/

var conf = require("node-conf");

var Datastore = require("./lib/datastore"),
    Logging = require("./lib/logging"),
    Listener = require("./lib/listener");

/* var numcpus = require("os").cpus().length */

var config = conf.load(process.env.NODE_ENV);

if (typeof config.server === "undefined") {
    console.log(new Error("Found invalid config! exiting..."));
    process.exit(1);
}

var log = new Logging(config.logging);

var datastore = new Datastore(config.datastore, log.datastore);
datastore.connect().then(function(instance) {
    var listener = new Listener(config, log, function(app) {


	if (typeof config.routes.active === "object" && config.routes.active.hasOwnProperty("length")) {
	    config.routes.active.forEach(function(route) {
		log.application.info("Loading active route: " + route);
		try {
		    var ApplicationRoute = require("./lib/" + route + "/index.js");
		    var appRoute = new ApplicationRoute(config.routes[route], instance, log.app);
		    var routes = appRoute.router();

		    app.use(routes);
		} catch (ex) {
		    log.application.error(ex);
		}
	    });
	}

	if (typeof config.routes["default"] === "string") {
	    app.set("x-powered-by", null);
	    app.settings["x-powered-by"] = null;

	    app.get("^/$", function(req, res) {
		res.removeHeader("x-powered-by");
		res.redirect(config.routes["default"]);
	    });
	}
    });
    listener.startup();
}, function(err) {
    console.log(new Error("Error: Connect Failed!", err));
});
