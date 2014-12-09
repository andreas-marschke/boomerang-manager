"use strict";

module.exports = function(grunt) {
    return {
	tasks: {
	    pkg: grunt.file.readJSON("package.json")
	}
    };
};
