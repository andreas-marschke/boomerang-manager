"use strict";

module.exports = {
    tasks: {
	abideExtract: {
	    js: {
		src: "lib/**/*.js",
		dest: "locale/templates/messages.pot",
		options: {
		    language: "JavaScript"
		}
	    },
	    html: {
		src: "lib/**/views/*.html",
		dest: "locale/templates/messages.pot",
		options: {
		    language: "Jinja"
		}
	    }
	},
	abideCreate: {
	    server: {
		options: {
		    template: "locale/templates/messages.pot",
		    languages: ["de", "en-US"],
		    localeDir: './locale/lang/'
		}
	    },
	    client: {
		options: {
		    template: "locale/templates/client.pot",
		    languages: ["de", "en-US"],
		    localeDir: './locale/lang/'
		}
	    }
	},
	abideMerge: {
	    server: {
		options: {
		    template: 'locale/templates/messages.pot',
		    localeDir: './locale/lang/'
		}
	    },
	    client: {
		options: {
		    template: 'locale/templates/client.pot',
		    localeDir: './locale/lang/'
		}
	    }
	},
	abideCompile: {
	    json: {
		dest: "./locale/lang/",
		options: {
		    type: "json",
		    localeDir: "./locale/lang/"
		}
	    }
	},
	nggettext_extract: {
	    pot: {
		files: {
		    'locale/templates/client.pot': ['assets/js/**/templates/**/*.html']
		}
	    }
	},
	nggettext_compile: {
	    all: {
		files: {
		    'assets/build/js/translations.js': ['locale/lang/**/client.pot']
		}
	    }
	}
    }
};
