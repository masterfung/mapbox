var Hapi = require('hapi');
var path = require('path');
var payload = require('./payload');
var server = new Hapi.Server();

var stop = false;
var pause = false;
var start = false;
var coordinateCounter = 0;

var coordinateRetriever = function(index) {
  return new Promise(function(resolve, reject) {
    payload().then(function(output) {
      resolve(output[index]);
    });
  });
};

// coordinateRetriever(0).then(function(results) {
//   console.log("moo", results);
// });

server.connection({
  host: "localhost",
  port: 3000
});

server.views({
  engines: {
    html: require('handlebars')
  },
  path: path.join(__dirname, 'public'),
  helpersPath: path.join(__dirname, 'helpers')
});

server.route({
  path: '/{param*}',
  method: 'GET',
  handler: {
    directory: {
      path: "./public",
      index: true
    }
  }
});

server.route({
  path: "/data/coordinate-fetch",
  method: "GET",
  config: {
    handler: function(req, res) {
      // res(JSON.stringify([37.77906506406423, -122.39044204830788]))
      if (stop === false && pause === false && start === false) {
        coordinateRetriever(coordinateCounter).then(function(result) {
          res(JSON.stringify(result));
        });
        coordinateCounter++;
      }
    }
  }
});

server.route({
    method: '*',
    path: '/{p*}', // catch-all path
    handler: function (request, reply) {
        reply.file('./public/notfound/404.html').code(404);
    }
});

payload().then(function (output) {
  output.forEach(function(x) {
    console.log(x);
  });
});

server.register([
  {
    register: require('good'),
    options: {
      reporters: [{
        reporter: require('good-console'),
        events:{ response: '*' }
      }]
    }
  }
], function (err) {

  if (err) {
    throw err;
  }



  // Starting the server

  server.start(function(err) {
    if (err) {
      console.log("Something went wrong: "+ err);
    }
    console.log('Hapi Server is running on port 3000!');
  });


});
