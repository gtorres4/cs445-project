var plato = require('plato');

var files = [
  './spec/*.js',
];

var outputDir = './unit-test-output';

// null options for this example
var options = {
  title: 'My Code Coverage'
};

var callback = function (report){
  console.log("Done with code report");
};

plato.inspect(files, outputDir, options, callback);
