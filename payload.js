var fs = require('fs');
var path = require('path');

var filePath = path.join(__dirname, "data/raw/waypoints.txt")

// var output = JSON.parse(fs.readFileSync(filePath, 'utf-8'));//, function(err, data) {
//   // if (err) {
//     // throw err;
//   // }
//   // output = JSON.parse(data);
// // });
//
// module.exports = output;
//
//
//

module.exports = function () {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, "utf-8", function (err, output) {
      if (err) {
        reject(err);
        // throw err;
      }
      resolve(JSON.parse(output));
    });
  });
};
