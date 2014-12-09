"use strict";

var bunyan = require("bunyan");

function Logging(config) {
    this.config = this.checkConfig(config || {});

    this.datastore = bunyan.createLogger({
	name: "boomerang-express-datastore",
	immediate: true,
	streams: [{
	    stream: process.stdout,
	    level: this.config.datastore.level
	}]
    });

    this.application = bunyan.createLogger({
	name: "boomerang-express-application",
	immediate: false,
	streams: [{
	    stream: process.stdout,
	    level: this.config.application.level
	}]
    });

    this.web = require("express-bunyan-logger")({
	name: "boomerang-express-web",
	immediate: false,
	parseUA: false,
	serializers: {
	    req: function (req) {
		return {
		    method: req.method,
		    headers: req.headers
		};
	    },
	    res: function () { return null; },
	    body: function () { return null; },
	    "req-headers": function () { return null; }
	},
	streams: [{
	    stream: process.stdout,
	    level: this.config.web.level
	}]
    });
}

Logging.prototype.checkConfig = function(config) {

    if(typeof config.datastore === "undefined") {
	config.datastore = {};
    }

    if (typeof config.datastore.level === "undefined") {
	config.datastore.level = "debug";
    }

    if(typeof config.application === "undefined") {
	config.application = {};
    }

    if (typeof config.application.level === "undefined") {
	config.application.level = "debug";
    }

    if(typeof config.web === "undefined") {
	config.web = {};
    }

    if (typeof config.web.level === "undefined") {
	config.web.level = "debug";
    }

    return config;
};

module.exports = Logging;
