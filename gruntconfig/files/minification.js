"use strict";

module.exports.htmltemplates = {
    usermanagement: {
	src: ["assets/js/applications/usermanagement/**/*.html"],
	dest: "assets/build/js/usermanagement-templates.js",
	options: {
	    base: "assets",
	    target: "js",
	    module: "usermanagement.templates"
	}
    }
};

module.exports.fontscopy = [
    "assets/vendor/bootstrap/dist/fonts/*.{eot,otf,svg,ttf,woff}",
    "assets/vendor/font-awesome/fonts/*.{eot,otf,svg,ttf,woff}"
];

module.exports.css = [
    "assets/vendor/bootstrap/dist/css/bootstrap.min.css",
    "assets/vendor/font-awesome/css/font-awesome.css",
    "assets/css/**/*.css"
];

module.exports.ngfiles = {
    usermanagement: {
	src: [
	    "assets/js/applications/usermanagement/**/*.js",
	    "assets/build/js/usermanagement-templates.js"
	],
	dest: "assets/build/js/usermanagement.min.js"
    }
};

module.exports.js = {
    "assets/build/js/base.min.js": [
	"assets/vendor/jquery/dist/jquery.js",
	"assets/vendor/bootstrap/dist/js/bootstrap.js"
    ],
    "assets/build/js/angular-applications.min.js" :[
	"assets/build/js/usermanagement.min.js"
    ],
    "assets/build/js/angular.min.js": [
	"assets/vendor/angular/angular.js",
	"assets/vendor/angular-bootstrap/ui-bootstrap-tpls.js",
	"assets/vendor/angular-ui-router/release/angular-ui-router.js",
	"assets/vendor/angular-gettext/dist/angular-gettext.js",
	"assets/vendor/angular-resource/angular-resource.js",
	"assets/build/js/angular-applications.min.js"
    ],
    "assets/build/js/graphing.min.js": [
	"assets/vendor/d3/d3.js",
	"assets/vendor/d3.chart/d3.chart.js"
    ],
    "assets/build/js/build.min.js": [
	"assets/build/js/base.min.js",
	"assets/build/js/angular.min.js",
	"assets/build/js/graphing.min.js"
    ]
};
