"use strict";

/* eslint-disable no-underscore-dangle, camelcase */

module.exports = {
    directoryContents: [
	"beacon_0000.db",
	"clicks_0000.db",
	"resource_0000.db",
	"forms_0000.db",
	"users.db",
	"webcollections.db",
	"tmp.data",
	"code.log",
	"trash.xml"
    ],
    expectedContents: [
	"beacon_0000",
	"clicks_0000",
	"resource_0000",
	"forms_0000",
	"users",
	"webcollections"
    ],
    databases: {
	beacon_0000: [{
	    "customTiming":{},
	    "ip": "2ce0c5e727508b04af7b0ed2c242ea",
	    "cookies":{ "GUID":"abcdef123456890" },
	    "headers":{
		"host":"localhost:4001",
		"accept-language": [ "en-US" ],
		"accept":[ "image/png" ],
		"dnt":"0",
		"referer":"http://localhost:4000/a/b/c"
	    },
	    "agent":{
		"family":"Other",
		"major":"0",
		"minor":"0",
		"patch":"0",
		"device":{
		    "family":"Other",
		    "major":"0",
		    "minor":"0",
		    "patch":"0"
		},
		"os":{
		    "family":"Other",
		    "major":"0",
		    "minor":"0",
		    "patch":"0"
		}
	    },
	    "created":{ "$$date":1417834645689 },
	    "collection":"demo-webpage",
	    "_id":"a3W4C4xE5Z3n6lFt"
	}],
	clicks_0000: [{
	    "element": "DIV",
	    "id": "",
	    "class": "col-md-8",
	    "x": 445,
	    "y": 140,
	    "document": {
	        "height": 381,
	        "width": 1438
	    },
	    "viewport": {
	        "height": 381,
	        "width": 1438
	    },
	    "customTiming": {},
	    "ip": "2ce0c5e727508b04af7b0ed2c242ea",
	    "cookies": {
	        "application": {
		    "aCookie": "bcde",
		    "fooCookie": [
		        1,
		        2,
		        3
		    ]
		}
	    },
	    "headers": {
	        "host": "localhost:4001",
	        "connection": "keep-alive",
	        "pragma": "no-cache",
	        "cache-control": "no-cache",
	        "accept": [
		    "image/webp",
		    {
		        "name": "*/*",
		        "rank": "0.8"
		    }
		],
	        "dnt": "1",
	        "referer": "http://localhost:4000/shop/article/4",
	        "accept-encoding": [
		    "gzip",
		    " deflate",
		    " sdch"
		],
	        "accept-language": [
		    "de-DE",
		    {
		        "name": "de",
		        "rank": "0.8"
		    },
		    {
		        "name": "en-US",
		        "rank": "0.6"
		    },
		    {
		        "name": "en",
		        "rank": "0.4"
		    }
		]
	    },
	    "agent": {
	        "family": "Chrome",
	        "major": "39",
	        "minor": "0",
	        "patch": "2171",
	        "device": {
		    "family": "Other",
		    "major": "0",
		    "minor": "0",
		    "patch": "0"
		},
	        "os": {
		    "family": "Linux",
		    "major": "0",
		    "minor": "0",
		    "patch": "0"
		}
	    },
	    "created": {
	        "$$date": 1417873763515
	    },
	    "collection": "demo-webpage",
	    "_id": "9fySz3CeCQM9oKBM"
	}],
	resource_0000: [{
	    "refer": "rcuOrHgpSMLx7QMP",
	    "rt": {
	        "name": "http://localhost:4000/js/homepage.js",
	        "in": {
		    "type": "script"
		},
	        "st": 145.223999999871,
	        "dur": 601.6270000000077,
	        "fet": {
		    "st": 145.223999999871
		},
	        "res": {
		    "end": 746.8509999998787,
		    "st": 232.7079999995476
		},
	        "dns": {
		    "st": 145.223999999871,
		    "end": 145.223999999871
		},
	        "con": {
		    "st": 145.223999999871,
		    "end": 145.223999999871
		},
	        "req": {
		    "st": 231.02499999731663
		}
	    },
	    "collection": "demo-webpage",
	    "_id": "BKVvItQwOu2Ia5K7"
	}],
	forms_0000: [{
	    "refer": "rcuOrHgpSMLx7QMP",
	    "collection": "demo-webpage",
	    "_id": "BKVvItQwOu2Ia5K7"
	}],
	webcollections: [{
	    "_id" : "d34db33f",
	    "types" : [
		"beacon",
		"clicks",
		"resource",
		"forms"
	    ],
	    "name" : "demo-webpage",
	    "owner" : "0000",
	    "locations" : [{
		"url" : "http://localhost:4000",
		"shared" : false
	    }]
	}],
	users: [{
	    "_id" : "0000",
	    "name" : "user",
	    "via" : "local"
	}]
    },
    path: {
	webcollections:  {
	    resolve: function() {
		return "/some/path/that/doesn't/exist";
	    },
	    dirname: function() {
		return "/some/path/that/doesn't/exist";
	    },
	    join: function() {
		return  "/some/path/that/doesn't/exist" + "/" + arguments[1];
	    }
	}
    },
    fs: {
	webcollections: {
	    readdir: function(path, callback) {
		callback(null, module.exports.directoryContents);
	    },
	    readdirSync: function() {
		return module.exports.directoryContents ;
	    },
	    mkdirP: function(path, auth, callback) {
		callback();
	    },
	    mkdir: function(path, auth, callback) {
		callback();
	    },
	    exists: function(path, callback) {
		callback(null, true);
	    },
	    existsSync: function() {
		return true;
	    },
	    readFile: function(path, opts, callback) {
		if (path.match("webcollections.db")) {
		    callback(null, JSON.stringify(module.exports.databases.webcollections[0]));
		} else if (path.match("users.db")) {
		    callback(null, JSON.stringify(module.exports.databases.users));
		} else if (path.match("beacon_0000.db")) {
		    callback(null, JSON.stringify(module.exports.databases.beacon_0000[0]));
		} else if (path.match("clicks_0000.db")) {
		    callback(null, JSON.stringify(module.exports.databases.clicks_0000[0]));
		} else if (path.match("resource_0000.db")) {
		    callback(null, JSON.stringify(module.exports.databases.resource_0000[0]));
		} else if (path.match("forms_0000.db")) {
		    callback(null, JSON.stringify(module.exports.databases.forms_0000[0]));
		} else {
		    callback(null, "");
		}
	    },
	    unlink: function(path, callback) {
		callback(null);
	    },
	    rename: function(oldName, newName, callback) {
		callback();
	    },
	    writeFile: function(filename, data, opts, callback) {
		if (typeof opts === "function") {
		    opts();
		} else {
		    callback();
		}
	    },
	    appendFile: function(filname, data, opts, callback) {
		if (typeof opts === "function") {
		    opts();
		} else {
		    callback();
		}
	    }
	},
	empty: {
	    readdir: function(path, callback) {
		callback(null, []);
	    },
	    readdirSync: function() {
		return module.exports.directoryContents ;
	    },
	    mkdirP: function(path, auth, callback) {
		callback();
	    },
	    mkdir: function(path, auth, callback) {
		callback();
	    },
	    exists: function(path, callback) {
		callback(true);
	    },
	    readFile: function(path, opts, callback) {
		callback(null, "");
	    },
	    unlink: function(path, callback) {
		callback(null);
	    },
	    rename: function(oldName, newName, callback) {
		callback();
	    },
	    writeFile: function(filename, data, opts, callback) {
		if (typeof opts === "function") {
		    opts();
		} else {
		    callback();
		}
	    },
	    appendFile: function(filname, data, opts, callback) {
		if (typeof opts === "function") {
		    opts();
		} else {
		    callback();
		}
	    }
	}
    }
};
