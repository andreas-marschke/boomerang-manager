"use strict";
var NeDB = require("nedb"),
    Promise = require("bluebird"),
    path = require("path"),
    fs = require("fs"),
    Base = require("../../base");



Error.stackTraceLimit = 40;
Promise.longStackTraces();

function NeDBBackend(config, logger) {
    this.config = this.checkConfig(config);

    Base.call(this, logger);
    return this;
}

NeDBBackend.prototype.connect = function() {
    var deferred = Promise.defer();
    var exists = fs.existsSync(path.resolve(this.config.directory));

    if (!exists) {
	this.log.debug("Database Directory did not exist going to fail...");
	deferred.reject(new Error("No such file or directory"));
	return deferred.promise;
    }

    this.load(this.config.directory).then(function() {
	this.log.debug("Connection finished successfully...");

	if (this.engine.hasOwnProperty("webcollections") && this.engine.hasOwnProperty("users")) {
	    deferred.resolve(this);
	    return deferred.promise;
	} else {
	    deferred.reject(new Error("Critical: Vital collections are missing!"));
	    return  deferred.promise;
	}
	deferred.resolve(this);
    }.bind(this), function(err) {
	deferred.reject(new Error("Failed to load files from directory", err));
    });

    return deferred.promise;
};

NeDBBackend.prototype.load = function(directory) {
    var defer = Promise.defer();
    this.log.debug("NeDBBackend: reading directory " + directory);
    fs.readdir(path.resolve(directory), function(error, files){
	if (error) {
	    return defer.reject(error);
	}

	if (files.length === 0) {
	    defer.reject(new Error("No files in directory"));
	}

	return this.loadFiles(files).then(function(engine) {

	    this.engine = engine;
	    this.log.debug("Resolving promise with new engine");
	    defer.resolve(engine);

	}.bind(this), function(error){

	    this.log.error({ error: error}, "Loading the directory" + directory + "went wrong");
	    return defer.reject(error);

	}.bind(this));

    }.bind(this));

    return defer.promise;
};

NeDBBackend.prototype.loadFiles = function(files) {

    var deferred = Promise.defer();
    var engine = {};
    var dbs = files.filter(function(file) { return file.match(/\.db$/g) !== null; });

    this.log.debug("Found db-files: " + dbs.join(", "));

    if (dbs.length === 0) {

	this.log.error(new Error("No database files found!"));
	deferred.reject(new Error("No database files found!"));
	return deferred.promise;
    }

    dbs.forEach(function(db, index, array) {
	engine[db.split(".db")[0]] = new NeDB({
	    filename: path.join(path.resolve(this.config.directory), db),
	    inMemoryOnly: false,
	    autoload: true
	});
	if (index === array.length - 1) {
	    this.log.debug("Finished reading databases.");
	    deferred.resolve(engine);
	}
    }.bind(this));

    return deferred.promise;
};

NeDBBackend.prototype.checkConfig = function(config) {
    return config;
};

NeDBBackend.prototype.collectionSize = function (user, collection) {
    var deferredResults = Promise.defer();

    this.typesByUserCollection(user, collection).then(function(types){

	var resultsPromises = types.map(function(type) {
	    return this.collectionSizeByType(user, collection, type).then(function(sizeObject) {
		return sizeObject;
	    });
	}.bind(this));

	Promise.all(resultsPromises).done(function(data) {
	    this.log.debug( { data: data }, "Found Collection sizes");
	    deferredResults.resolve(data);
	}.bind(this), function(error) {
	    this.log.error( { error: error }, "Getting Collection Size went wrong");
	    deferredResults.reject(error);
	}.bind(this));

    }.bind(this));

    return deferredResults.promise;
};

NeDBBackend.prototype.typesByUserCollection = function(user, collection) {
    var defer = Promise.defer();

    this.query("find", { owner: user, name: collection }, "webcollections").then(function(results) {
	defer.resolve(results[0].types);
    }, function(error) {
	defer.reject(error);
    });

    return defer.promise;
};

NeDBBackend.prototype.collectionSizeByType = function(user, collection, type) {
    var defer = Promise.defer();

    this.query("count", { collection: collection }, type + "_" + user).then(function(count) {
	defer.resolve({ name: collection, count: count, type: type });
    }, function(error) {
	defer.reject(error);
    });

    return defer.promise;
};

NeDBBackend.prototype.users = function() {
    var defer = Promise.defer();

    this.query("find", {}, "users").then(function(users) {
	defer.resolve(this.swapIdFields(users));
    }.bind(this), function(error) {
	defer.reject(error);
    });

    return defer.promise;
};

NeDBBackend.prototype.collections = function(user) {
    var defer = Promise.defer();

    this.query("find", { owner: user }, "webcolections").then(function(collections) {
	defer.resolve(this.swapIdFields(collections));
    }.bind(this),function(error) {
	defer.reject(error);
    });

    return defer.promise;
};

NeDBBackend.prototype.query = function (call, query, database) {

    this.log.debug("Looking for " + JSON.stringify(query) + " in database: " + database);
    var defer = Promise.defer();

    if(typeof this.engine[database] === "undefined") {
	this.log.error("Error no collection for " + database);
	defer.reject(new Error("No such collection " + database));
	return defer.promise;
    }

    if (typeof this.engine[database][call] === "undefined") {
	this.log.error("Error no such method " + call);
	defer.reject(new Error("No such call on collection " + call));
	return defer.promise;
    }

    this.engine[database][call](query, function(err, data) {
	if (err) {
	    this.log.error({ error: err }, "An Error occured whilst querying the database");
	    defer.reject(err);
	    return defer.promise;
	}
	this.log.debug({ data: data }, "Found data for query");
	defer.resolve(data);
	return defer.promise;
    }.bind(this));

    return defer.promise;
};

NeDBBackend.prototype.swapIdFields = function(objects) {
    return objects.map(function(object) {
	object.id = object._id;
	delete object._id;
	return object;
    });
};


module.exports = NeDBBackend;
