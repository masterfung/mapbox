var Code = require('code');
var Hapi = require('hapi');
var Lab = require('lab');
var path = require('path');
var shot = require('shot');
var server = require('../server');

// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


lab.test('Simple addition problem: 1 + 1 equals 2', function (done) {

    expect(1+1).to.equal(2);
    done();
});


describe('routing', function () {
  it('GET /', function (done) {
    var output = 'localhost:3000|/'

    var dispatch = function (req, res) {

        res.writeHead(200, { 'Content-Type': 'text/plain', 'Content-Length': output.length });
        res.end(req.headers.host + '|' + req.url);
      };

    shot.inject(dispatch, 'http://localhost:3000/', function (res) {

        expect(res.headers.date).to.exist();
        expect(res.headers.connection).to.exist();
        expect(res.headers['transfer-encoding']).to.not.exist();
        expect(res.payload).to.equal(output);
        done();
      });
  });
});

describe('payload', function() {
  it('Checks whether payload exist', function(done) {
    var fs = require('fs');
    var dirPath = path.join(__dirname, '../data/raw/');

    fs.readdir(dirPath, function(err, files) {
      if (err) {
        console.log("Reading file error: ", err);
      }
      expect(files).to.exist();
    });
    done();
  })
})

describe('payload', function () {
  it('fetching first data point', function (done) {

    var payload = require('../payload');

    var firstOutput;
    var first = 0;

    var coordinateRetriever = function(index) {
      return new Promise(function(resolve, reject) {
        payload().then(function(output) {
          console.log(index, output[index]);
          resolve(output[index]);
        });
      });
    };

    firstOutput = coordinateRetriever(first).then(function(result) {
      result;
    });

    expect(typeof(firstOutput)).to.equal('object');
    done();
  });
});
