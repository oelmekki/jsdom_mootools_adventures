var sys = require('sys');
var fs  = require( 'fs' );


function writeFile(filename, text) {
	var file = fs.openSync( filename, 'w' );
	fs.writeSync( file, text );
	fs.closeSync( file );
}

function elapsed(startTime, endTime) {
	return (endTime - startTime)/1000;
}

function ISODateString(d) {
	function pad(n) { return n < 10 ? '0'+n : n; }
	
	return d.getFullYear() + '-'
		+ pad(d.getMonth()+1) +'-'
		+ pad(d.getDate()) + 'T'
		+ pad(d.getHours()) + ':'
		+ pad(d.getMinutes()) + ':'
		+ pad(d.getSeconds());
}

/**
 * Generates JUnit XML for the given spec run.
 * Allows the test results to be used in java based CI
 * systems like CruiseControl and Hudson.
 */
var JUnitXmlReporter = function(savePath) {
	this.savePath = savePath || fs.realpathSync( __dirname + '/../../../reports/' );
};

JUnitXmlReporter.prototype = {
	reportRunnerResults: function(runner) {
		this.log("Runner Finished.");
    this.done(runner, console.log );
	},
	
	reportRunnerStarting: function(runner) {
		this.log("Runner Started.");
	},
	
	reportSpecResults: function(spec) {
		var resultText = "Failed.";
		
		if (spec.results().passed()) {
			resultText = "Passed.";
		}
		
		spec.endTime = new Date();
		
		this.log(resultText);
	},
	
	reportSpecStarting: function(spec) {
//	spec.startTime = new Date();
//  var parent_suite = spec.suite.parentSuite;
//	
//	if (! parent_suite.startTime) {
//		parent_suite.startTime = new Date();
//	}
		
		this.log(spec.suite.description + ' : ' + spec.description + ' ... ');
	},
	
	reportSuiteResults: function(suite) {
		var output = [],
			fileName = 'TEST-' + suite.description.replace(/\s/g, '') + '.xml',
			results = suite.results(),
			items = results.getItems(),
			item,
			spec,
			expectedResults,
			trace,
			i,
			j;
			
//    var parent_suite = ( suite.parentSuite || suite );
//		suite.endTime = new Date();
		
		output.push('<?xml version="1.0" encoding="UTF-8" ?>' + "\n");
		output.push('<testsuite name="' + this.replaceEntities( suite.description ) + '" errors="0" failures="' 
			+ results.failedCount + '" tests="' + results.totalCount + /*'" time="' 
			+ elapsed(parent_suite.startTime, suite.endTime) + '" timestamp="' + ISODateString(parent_suite.startTime) + */ '">');
		
		for (i = 0; i < items.length; i++) {
			item = items[i];
			spec = suite.specs()[i];
			
      if ( spec ){
        output.push(' <testcase classname="' + this.replaceEntities( suite.description ) + '" name="' + this.replaceEntities( item.description ) + /*'" time="' + elapsed(spec.startTime, spec.endTime) + */ '">');

        
        if (!item.passed()) {
          expectedResults = item.getItems();
          
          for (j = 0; j < expectedResults.length; j++) {
            trace = expectedResults[j].trace;
            
            if (trace instanceof Error) {
              output.push('<failure>' + this.replaceEntities( trace.message ) + '</failure>');
              break;
            }
          }
        }
        
        output.push('</testcase>');
      }
		}
		
		output.push('</testsuite>');
		
		writeFile(this.savePath + '/' + fileName, output.join(''));
		
		this.log(suite.description + ": " + results.passedCount + " of " + results.totalCount + " passed.");
	},
	
	log: function(str) {
		var console = jasmine.getGlobal().console;
		
		if (console && console.log) {
			console.log(str);
		}
	},


  replaceEntities: function( str ){
    return str.replace( /</g, '&lt;' ).replace( />/g, '&gt;' ).replace( /"/g, "'" );
  }
};

exports.Reporter = new JUnitXmlReporter();

