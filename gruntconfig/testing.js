"use strict";

var testfiles = require("./files/testing.js");

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
		    src: testfiles.mochatestfiles
		},
		"html-cov": {
		    options: {
			reporter: "html-cov",
			quiet: true,
			captureFile: "tests/coverage.html"
		    },
		    src: testfiles.mochatestfiles
		}
	    },
	    karma: {
		options: {
		    configFile: "./karma.config.js",
		    preprocessors: {
/*			"./build/*.js": ["coverage"] */
		    },
		    basePath: "./",
		    files: testfiles.karmafiles
		},
		unit: {
		    singleRun: true,
		    colors: false,
		    browsers: ['PhantomJS']
		}
	    }
	}
    };
};
