"use strict";

module.exports = function(grunt) {
    var options = {
	config : {
	    src: "gruntconfig/*.js"
	}
    };
    var configs = require("load-grunt-configs")(grunt, options);
    grunt.loadNpmTasks("grunt-mocha-test");
    grunt.loadNpmTasks("grunt-eslint");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-plato");
    grunt.loadNpmTasks("grunt-i18n-abide");
    grunt.loadNpmTasks("grunt-html2js");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-ngmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-csslint");
    grunt.loadNpmTasks('grunt-angular-gettext');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig(configs);

    grunt.registerTask("mocha", ["mochaTest"]);
    grunt.registerTask("test", ["mocha", "eslint", "csslint", "plato"]);
    grunt.registerTask("build", ["translation:compile", "clean", "copy:fonts", "cssmin", "html2js", "ngmin", "uglify"]);
    grunt.registerTask("default", ["test", "build"]);

    grunt.registerTask("translation:compile", ["nggettext_compile", "abideCompile"]);
    grunt.registerTask("translation:init", ["abideExtract", "abideCreate:server", "nggettext_extract", "abideCreate:client", "translation:compile"]);
    grunt.registerTask("translation:merge", ["abideExtract", "nggettext_extract", "abideMerge:server", "abideMerge:client", "translation:compile"]);
};
