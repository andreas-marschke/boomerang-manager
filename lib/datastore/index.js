"use strict";

var Base = require("../base");

function Datastore(config, logger) {
    var Engine;

    Base.call(this, logger);

    this.config = this.checkConfig(config || {});

    if (this.config.active === "none") {
	return this;
    }

    this.log.info("Trying to start engine:", this.config.active,
		  "with config:", JSON.stringify(this.config[this.config.active]));
    try {
	Engine = require("./" + this.config.active + "/index.js");
    } catch(ex) {
	this.log.error("An error occured!");
	this.log.trace(ex);
	return this;
    }
    if (typeof Engine === "function") {
	this.engine = new Engine(this.config[this.config.active], this.log);
    }
    return this;
}

Datastore.prototype.connect = function() {
    return this.engine.connect();
};

Datastore.prototype.checkConfig = function(config) {
    var none = {
	active: "none",
	none: {}
    };

    if(typeof config.active === "undefined" || typeof config[config.active] === "undefined") {
	return none;
    }

    return config;
};

Datastore.prototype.collectionSize = function(user, collection) {
    return this.engine.collectionSize(user, collection);
};

Datastore.prototype.typesByUserCollection = function(user, collection) {
    return this.engine.typesByUserCollection(user, collection);
};

Datastore.prototype.collectionSizeByType = function(user, collection, type) {
    return this.engine.collectionSizeByType(user, collection, type);
};

module.exports = Datastore;
