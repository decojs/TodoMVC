'use strict';

var testSuite = require('./test.js');
var fs = require('fs');
var argv = require('optimist').default('laxMode', false).default('browser', 'chrome').argv;
var rootUrl = 'http://localhost:8000/';
var frameworkNamePattern = /^[a-z-_]+$/;

var excludedFrameworks = [
	// this implementation deviates from the specification to such an extent that they are 
	// not worth testing via a generic mechanism
	'gwt',
	// selenium webdriver cannot see the shadow dom
	'polymer',
	// these implementations cannot be run offline, because they are hosted
	'derby', 'firebase-angular', 'meteor', 'socketstream',
	// YUI is a special case here, it is not hosted, but fetches JS files dynamically 
	'yui',
	// these frameworks take a long time to start-up, and there is no easy way to determine when they are ready
	'cujo', 'montage',
	// sammyjs fails intermittently, it would appear that its state is sometimes updated asynchronously?
	'sammyjs',
	// these are examples that have been removed or are empty folders
	'emberjs_require', 'dermis', 'react-backbone'
];

// collect together the framework names from each of the subfolders
var list = [{ name: 'decojs', path: '..' }];

// if a specific framework has been named, just run this one
if (argv.framework) {
	list = list.filter(function (framework) {
		return framework.name === argv.framework;
	});

	if (list.length === 0) {
		console.log('You have either requested an unknown or an un-supported framework');
	}
}

// run the tests for each framework
list.forEach(function (framework) {
	testSuite.todoMVCTest(
		framework.name,
		rootUrl + framework.path + '/index.html', argv.speedMode,
		argv.laxMode, argv.browser);
});
