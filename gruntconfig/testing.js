"use strict";

var testfiles = require("./testfiles.js");

module.exports = function() {
    return {
	tasks: {
	    mochaTest: {
		test: {
		    options: {
			reporter: "tap",
			quiet: false,
			clearRequireCache: true,
			gc: true
		    },
		    src: testfiles.files
		},
		"html-cov": {
		    options: {
			reporter: "html-cov",
			quiet: true,
			captureFile: "tests/coverage.html"
		    },
		    src: testfiles.files
		}
	    }
	}
    };
};
