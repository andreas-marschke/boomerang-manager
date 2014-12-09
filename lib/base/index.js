"use strict";
/* eslint-disable no-console*/
/* Logging utility Function called by Objects to create this.log function */

function Base(logger) {
    if (typeof logger === "object") {
	this.log = logger;
    } else {
	this.log = console;

	// "polyfill debug()",
	this.log.debug = console.info;
	this.log.fatal = console.error;
    }
}

module.exports = Base;
