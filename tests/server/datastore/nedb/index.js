"use strict";
/* global it, describe, beforeEach, afterEach */
/* eslint-disable vars-on-top*/

var expect = require("chai").expect,
    assert = require("chai").assert,
    mockery = require("mockery"),
    fixtures = require("../fixtures"),
    Logging = require("../../Logger");

describe("Boomerang Manager Server: Datastore NeDBBackend", function() {

    beforeEach(function(){
	mockery.enable({
	    warnOnReplace: true,
	    warnOnUnregistered: false,
	    useCleanCache: true
	});
    });

    afterEach(function() {
	mockery.resetCache();
	mockery.deregisterAll();
	mockery.disable();
    });

    it("Should require", function(){
	require("../../../../lib/datastore/nedb");
    });

    it("Should initialize an instance of NeDBBackend", function(){
	var NeDBBackend = require("../../../../lib/datastore/nedb");
	var backend = new NeDBBackend({}, Logging.NoneLogger);

	assert.instanceOf(backend, NeDBBackend);
    });

    it("Should load a fake database instance", function(done) {
	mockery.registerMock("fs", fixtures.fs.webcollections);
	mockery.registerMock("path", fixtures.path.webcollections);

	var NeDBBackend = require("../../../../lib/datastore/nedb");
	var backend = new NeDBBackend({directory: "/some/path/doesnt/exist"}, Logging.NoneLogger);

	backend.connect().then(function(datastore) {
	    var databasenames = Object.keys(fixtures.databases);
	    assert.sameMembers(Object.keys(datastore.engine), databasenames);
	    done();
	}, function(error) {
	    assert.isNull(error);
	    done();
	});
    });

    it("Should return a count of one for an existing type, collection with a user", function(done){
	mockery.registerMock("fs", fixtures.fs.webcollections);
	mockery.registerMock("path", fixtures.path.webcollections);

	var NeDBBackend = require("../../../../lib/datastore/nedb");
	var backend = new NeDBBackend({directory: "/some/path/doesnt/exist"}, Logging.NoneLogger);
	var expected = { name: "demo-webpage", count: 1, type: "beacon" };

	backend.connect().then(function(datastore) {
	    datastore.collectionSizeByType("0000", "demo-webpage", "beacon").then(function(data) {
		assert.deepEqual(expected, data);
		done();
	    }, function(errors) {
		assert.isNull(errors);
		done();
	    });
	});
    });

    it("Should return a count of one for an existing collection for a user", function(done){
	mockery.registerMock("fs", fixtures.fs.webcollections);
	mockery.registerMock("path", fixtures.path.webcollections);

	var NeDBBackend = require("../../../../lib/datastore/nedb");
	var backend = new NeDBBackend({directory: "/some/path/doesnt/exist"}, Logging.NoneLogger);
	var expected = [ { name: "demo-webpage", count: 1, type: "beacon" },
			 { name: "demo-webpage", count: 1, type: "clicks" },
			 { name: "demo-webpage", count: 1, type: "resource" },
			 { name: "demo-webpage", count: 1, type: "forms" } ];

	backend.connect().then(function(datastore) {
	    datastore.collectionSize("0000", "demo-webpage").then(function(data) {
		assert.deepEqual(data, expected);
		done();
	    });
	});

    });
});
