"use strict";

var Base = require("../base"),
    path = require("path"),
    express = require("express"),
    nunjucks = require("nunjucks");

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader([path.join(__dirname, "views"),
								  path.join(__dirname, "../common/layout"),
								  path.join(__dirname, "/../common/macros")]));
env.addGlobal("environment", process.env.NODE_ENV);

function ErrorHandler(config, logger) {
    Base.call(this, logger);
    this.config = config;
    return this;
}

ErrorHandler.prototype.router = function() {
    var app = express();
    env.express(app);

    app.use(function(req, res) {
	res.status(404);
	if (req.accepts("html")) {
	    res.render("404.html", { title: req.gettext("404 - Not Found!")});
	    return null;
	} else if (req.accepts("json")) {
	    res.send({ error: "Not Found", code: 404, back: req.get("referrer")});
	    return null;
	} else {
	    res.type("txt").send("404 - Not Found!");
	    return null;
	}
    });
    return app;
};

module.exports.ErrorHandler = ErrorHandler;
