"use strict";
/* global it, describe */
/* eslint-disable vars-on-top*/

var assert = require("chai").assert;

describe("Boomerang Manager Server: Logging", function() {
    it("Should require", function(){
	require("../../../lib/logging");
    });

    it("Should instantiate a Logging Object", function(){
	var Logging = require("../../../lib/logging");
	var logging = new Logging();
	assert.instanceOf(logging, Logging);
	assert.isObject(logging.datastore);
	assert.isObject(logging.application);
	assert.isFunction(logging.web);
    });

    it("Should have a default config if no config was given", function(){
	var Logging = require("../../../lib/logging");
	var input = {};

	var config = {
	    "datastore": {
		"level" : "debug"
	    },
	    "web": {
		"level" : "debug"
	    },
	    "application": {
		"level" : "debug"
	    }
	};
	var logging = new Logging(input);
	assert.deepEqual(logging.config, config);
    });

    it("Should properly set a log level for a defined logging target", function(){
	var Logging = require("../../../lib/logging");

	var input = {
	    "datastore": {
	    "level" : "fatal"
	    }
	};

	var config = {
	    "datastore": {
		"level" : "fatal"
	    },
	    "web": {
		"level" : "debug"
	    },
	    "application": {
		"level" : "debug"
	    }
	};
	var logging = new Logging(input);
	assert.deepEqual(logging.config, config);
    });
});
