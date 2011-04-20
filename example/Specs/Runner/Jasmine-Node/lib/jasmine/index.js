var fs = require('fs');
var sys = require('sys');

var filename = __dirname + '/jasmine.js';
var src = fs.readFileSync(filename);
var jasmine = process.compile(src + '\njasmine;', filename);


jasmine.runSpecs = function(specs, reporter){

  for (var i = 0, len = specs.length; i < len; ++i){
    var filename = specs[i];
    require(filename.replace(/\.js$/, ""));
  }

  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.reporter = reporter;

  jasmineEnv.execute();
};

jasmine.getAllSpecFiles = function(dir){
  var files = fs.readdirSync(dir);
  var specs = [];

  for (var i = 0, len = files.length; i < len; ++i){
    var filename = dir + '/' + files[i];
    if (fs.statSync(filename).isFile() && filename.match(/\.js$/)){
      specs.push(filename);
    }else if (fs.statSync(filename).isDirectory()){
      var subfiles = this.getAllSpecFiles(filename);
      subfiles.forEach(function(result){
        specs.push(result);
      });
    }
  }
  return specs;
};

jasmine.printRunnerResults = function(runner){
  var results = runner.results();
  var suites = runner.suites();
  var msg = '';
  msg += suites.length + ' test' + ((suites.length === 1) ? '' : 's') + ', ';
  msg += results.totalCount + ' assertion' + ((results.totalCount === 1) ? '' : 's') + ', ';
  msg += results.failedCount + ' failure' + ((results.failedCount === 1) ? '' : 's') + '\n';
  return msg;
};

function now(){
  return new Date().getTime();
}

jasmine.asyncSpecWait = function(){
  var wait = jasmine.asyncSpecWait;
  wait.start = now();
  wait.done = false;
  (function innerWait(){
    waits(10);
    runs(function() {
      if (wait.start + wait.timeout < now()) {
        expect('timeout waiting for spec').toBeNull();
      } else if (wait.done) {
        wait.done = false;
      } else {
        innerWait();
      }
    });
  })();
};
jasmine.asyncSpecWait.timeout = 4 * 1000;
jasmine.asyncSpecDone = function(){
  jasmine.asyncSpecWait.done = true;
};

for ( var key in jasmine) {
  exports[key] = jasmine[key];
}
