var Hapi = require('hapi');
var server = new Hapi.Server()

server.connection({
  host: "localhost",
  port: 3000
})

server.route({
  path: '/',
  method: 'GET',
  handler: function(req, res) {
    res('Hello World!')
  }
})

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
