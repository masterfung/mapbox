var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var filePath = path.join(__dirname, "data/raw/waypoints.txt")

var output = fs.readFileSync(filePath, 'utf-8', function(err, data) {
  if (err) {
    throw err;
  }
  return data;
});

module.exports = output;
