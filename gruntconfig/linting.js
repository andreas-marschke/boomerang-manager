"use strict";

module.exports = {
    tasks :  {
	csslint: {
	    strict: {
		options: {
		    csslintrc: '.csslintrc',
		    formatters: [ { id: "compact", dest: "./reports/csslint.txt" } ]
		},
		src: ["assets/css/**/*.css"]
	    }
	},
	eslint: {
	    options: {
		format: "compact"
	    },
	    target: [
		"Gruntfile.js",
		"app.js",
		"lib/**/*.js",
		"tests/**/*.js",
		"gruntconfig/*.js"
	    ]
	},
	plato: {
	    options: {},
	    "boomerang-express": {
		files: {
		    "complexity/": ["./lib/**/*.js", "./gruntconfigs/**/*.js", "assets/js/**/*.js"]
		}
	    }
	}
    }
};
