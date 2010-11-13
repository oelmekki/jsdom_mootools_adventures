// Put this file in the parent directory of the runner folder. Also rename the file to Configuration.js

(function(context){

var Configuration = context.Configuration = {};

// Runner name
Configuration.name = 'Test jsdom';


// Presets - combine the sets and the source to a preset to easily run a test
Configuration.presets = {
	
	'all': {
		sets: ['all'],
		source: ['sources']
	}
	
};

// An object with default presets
Configuration.defaultPresets = {
	browser: 'all',
	nodejs: 'all',
	jstd: 'all'
};


/*
 * An object with sets. Each item in the object should have an path key, 
 * that specifies where the spec files are and an array with all the files
 * without the .js extension relative to the given path
 */
Configuration.sets = {

	'all': {
		path: 'all/',
		files: ['TestObject']
	}

};


/*
 * An object with the source files. Each item should have an path key,
 * that specifies where the source files are and an array with all the files
 * without the .js extension relative to the given path
 */
Configuration.source = {

	'sources': {
		path: '../Source/',
		files: [
			'TestObject'
		]
	}

};

})(typeof exports != 'undefined' ? exports : this);
