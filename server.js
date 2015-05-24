var Hapi = require('hapi');
var path = require('path');
var payload = require('./payload');
var server = new Hapi.Server();

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
})

server.route({
  path: '/{param*}',
  method: 'GET',
  handler: {
    directory: {
      path: "./public",
      listing: true,
      index: true
    }
  }
})

console.log(payload.length);

server.register({
  register: require('good'),
  options: {
    reporters: [{
      reporter: require('good-console'),
      events:{ response: '*' }
    }]
  }
}, function (err) {

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
