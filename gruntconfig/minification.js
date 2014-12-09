"use strict";

var minifiable = require("./files/minification.js");
module.exports = function () {

    var html2jsOpts = {
	options: {
	    base: "",
	    target: "js",
	    module: "templates",
	    indentString: "  ",
	    useStrict: true,
	    htmlmin: {
		collapseBooleanAttributes: true,
		collapseWhitespace: true,
		removeAttributeQuotes: false,
		removeComments: true,
		removeEmptyAttributes: true,
		removeRedundantAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true
	    }
	}
    };

    Object.keys(minifiable.htmltemplates).forEach(function(target) {
	html2jsOpts[target] = minifiable.htmltemplates[target];
    });

    return {
	tasks: {
	    copy: {
		fonts: {
		    files: [{
			expand: true,
			flatten: true,
			src: minifiable.fontscopy,
			dest: 'assets/build/fonts',
			filter: 'isFile'
		    }]
		}
	    },
	    html2js: html2jsOpts,
	    uglify: {
		minify: {
		    options: {
			report: 'gzip',
			ASCIIOnly: true,
			preserveComments: false
		    },
		    files: minifiable.js
		}
	    },
	    cssmin: {
		minify: {
		    options: {
			keepSpecialComments:false,
			expand: true
		    },
		    files: [{
			"assets/build/css/build.min.css": minifiable.css
		    }]
		}
	    },
	    ngmin: {
		usermanagement: minifiable.ngfiles.usermanagement
	    }
	}
    };
};
