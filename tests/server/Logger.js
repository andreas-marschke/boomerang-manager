"use strict";
/* eslint-disable no-console */
/* mock logger to to prevent excessive logging to the console */

module.exports = {
    NoneLogger: {
	"trace": function() {},
	"debug": function() {},
	"info": function() {},
	"warn": function() {},
	"error": function() {},
	"fatal": function() {},
	"critical": function() {}
    },
    InfoLogger: {
	"trace": console.log,
	"debug": console.log,
	"info": console.log,
	"warn": console.log,
	"error": console.log,
	"fatal": console.log,
	"critical": console.log
    },
    TraceLogger : {
	"trace": console.trace,
	"debug": console.trace,
	"info": console.trace,
	"warn": console.trace,
	"error": console.trace,
	"fatal": console.trace,
	"critical": console.trace
    }
};
