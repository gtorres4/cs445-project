var plato = require('plato');

var files = [
  './classes/*.js',
];

var outputDir = './output';

// null options for this example
var options = {
  title: 'My Code Coverage'
};

var callback = function (report){
  console.log("Done with code report");
};

plato.inspect(files, outputDir, options, callback);
