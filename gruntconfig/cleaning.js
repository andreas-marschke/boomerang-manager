"use strict";

module.exports = {
    tasks: {
	clean: {
	    options: {},
	    build: ["assets/build"],
	    src: ["lib/routes/*~", "*.js~"],
	    rpmTmp: ["tmp-*"],
	    complexity: "complexity*"
	}
    }
};
