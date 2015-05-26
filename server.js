// load modules
var Hapi = require('hapi');
var path = require('path');
var payload = require('./payload');
var server = module.exports = new Hapi.Server();

// state management
var state = "not started";
var coordinateCounter = 0;
var counter = null;


// Uses Promise to resolve coordinates based on index
var coordinateRetriever = function(index) {
  return new Promise(function(resolve, reject) {
    payload().then(function(output) {
      console.log(index, output[index], output)
      resolve(output[index]);
    });
  });
};

// helper function routes handling and state
var startCoordinateCounter = function () {
  var next = function () {
    if (state === "started") {
      coordinateCounter++;
    } else {
      clearInterval(counter);
    }
  }
  clearInterval(counter);
  counter = setInterval(next, 2000);
}

// server connection after running, port 3000
server.connection({
  host: "localhost",
  port: 3000
});

// declaration of file path and html rendering engines
server.views({
  engines: {
    html: require('handlebars')
  },
  path: path.join(__dirname, 'public'),
  helpersPath: path.join(__dirname, 'helpers')
});

// basic home route
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


// No side effects
server.route({
  path: "/data/coordinate-fetch",
  method: "GET",
  config: {
    handler: function(req, res) {
      coordinateRetriever(coordinateCounter).then(function(result) {
        res(JSON.stringify(result));
      });
    }
  }
});


// Side effect: state = start
server.route({
  path: "/data/start",
  method: "GET",
  config: {
    handler: function(req, res) {
      // Guard clause
      if (state === "started") {
        return;
      }

      state = "started";
      startCoordinateCounter();
      res(state);
    }
  }
});


// Side effect: state = paused
server.route({
  path: "/data/pause",
  method: "GET",
  config: {
    handler: function(req, res) {

      // Guard clause
      if (state !== "started") {
        return;
      }

      state = "paused";
      res(state);
    }
  }
});

// Side Effect: state = not started
server.route({
  path: "/data/restart",
  method: "GET",
  config: {
    handler: function(req, res) {
      coordinateCounter = 0;
      state = "not started";
      res(state);
    }
  }
});

// register plugins to bring about better console details (logging)
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
