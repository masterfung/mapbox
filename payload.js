var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, "data/raw/waypoints.txt")

var state = null;

module.exports = function () {

  return new Promise(function (resolve, reject) {
    var done = function () {
      resolve(state);
    };

    if (state) {
      done();
    } else {
      fs.readFile(filePath, "utf-8", function (err, output) {
        if (err) {
          reject(err);
          // throw err;
        }
        state = JSON.parse(output);
        done();
      });
    }
  });
};
