var sys = require('sys');

var ansi = {
	green: '\033[32m',
	red: '\033[31m',
	yellow: '\033[33m',
	none: '\033[0m'
};

var start = 0;
var columnCounter = 0;
var elapsed = 0;
var log = [];

function noop(){}

ConsoleReporter = {
	verbose: true,
	colors: true,

	log: function(str){
	},

	reportRunnerStarting: function(runner) {
		sys.puts('Started');
		start = Number(new Date);
	},

	reportSuiteResults: function(suite) {
		var specResults = suite.results();
		var path = [];
		while(suite) {
			path.unshift(suite.description);
			suite = suite.parentSuite;
		}
		var description = path.join(' ');

		if (this.verbose)
			log.push('Spec ' + description);

		specResults.items_.forEach(function(spec){
			if (spec.failedCount > 0 && spec.description) {
				if (!this.verbose)
						log.push(description);
				log.push('	it ' + spec.description);
				spec.items_.forEach(function(result){
					log.push('	' + result.trace.stack + '\n');
				});
			}
		});
	},

	reportSpecResults: function(spec) {
		var result = spec.results();
		var msg = '';
		if (result.passed())
		{
			msg = (this.colors) ? (ansi.green + '.' + ansi.none) : '.';
//			} else if (result.skipped) {	TODO: Research why "result.skipped" returns false when "xit" is called on a spec?
//				msg = (this.colors) ? (ansi.yellow + '*' + ansi.none) : '*';
		} else {
			msg = (this.colors) ? (ansi.red + 'F' + ansi.none) : 'F';
		}
		sys.print(msg);
		if (columnCounter++ < 50) return;
		columnCounter = 0;
		sys.print('\n');
	},


	reportRunnerResults: function(runner) {
		elapsed = (Number(new Date) - start) / 1000;
		sys.puts('\n');
		log.forEach(function(log){
			sys.puts(log);
		});
		sys.puts('Finished in ' + elapsed + ' seconds');

		var summary = jasmine.printRunnerResults(runner);
		if(this.colors)
		{
			if(runner.results().failedCount === 0 )
				sys.puts(ansi.green + summary + ansi.none);
			else
				sys.puts(ansi.red + summary + ansi.none);
		} else {
			sys.puts(summary);
		}
		(this.done||noop)(runner, log);
	},

	reportSpecStarting: function(){
	}
};

exports.Reporter = ConsoleReporter;
