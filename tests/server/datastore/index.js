"use strict";
/* global it, describe, beforeEach, afterEach */
/* eslint-disable vars-on-top*/

var expect = require("chai").expect,
    assert = require("chai").assert,
    mockery = require("mockery"),
    fixtures = require("./fixtures"),
    Logging = require("../Logger");

describe("Boomerang Manager Server: Datastore", function() {

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
	require("../../../lib/datastore");
    });

    it("Should instantiate a Logging Object", function(){
	var Datastore = require("../../../lib/datastore");
	var ds = new Datastore({}, Logging.NoneLogger);
	assert.instanceOf(ds, Datastore);
    });

    it("Should have a active config of 'none' if no active config defined", function(){
	var Datastore = require("../../../lib/datastore");
	var ds = new Datastore({}, Logging.NoneLogger);

	assert.equal(ds.config.active, "none");
    });

    it("Should successfully create a promise and call resolve", function(done){
	mockery.registerMock("fs", fixtures.fs.webcollections);
	mockery.registerMock("path", fixtures.path.webcollections);

	var config = {
	    active: "nedb",
	    nedb: {
		directory: "/something/that/doesn't/exist"
	    }
	};

	var Datastore = require("../../../lib/datastore");
	var ds = new Datastore(config, Logging.NoneLogger);

	ds.connect().then(function() {
	    done();
	});
    });
});
