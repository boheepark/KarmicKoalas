
var express = require('express')
var app = express();
//app = require('./api');
var http = require('http')
var server = require('http').Server(app);
var port = process.env.PORT || 3001;
app.use(express.static('../'));
//var api = require("./api");

// var bodyParser = require('body-parser');

server.listen(port, ()=>
  console.log('server listening on port: ' + port)
  );
// use socket.io
var io = require('socket.io').listen(server);


//turn off debug
io.set('log level', 1);

// define interactions with client
io.sockets.on('connection', function(socket){

     socket.on('location', function(data) {
      console.log("Incoming location:", data)
      //sending dummy data for group update

      socket.emit('groupUpdate', {'group':[{'latitude': data.coordinates.latitude, 'longitude':  data.coordinates.longitude, 'title': 'Konst' }, {'latitude':data.coordinates.latitude + 0.0008, 'longitude': data.coordinates.longitude, 'title': 'Bo' }]});
    });
    socket.on('error', function(err) {
      console.log("Error", err);
    });
});

module.exports = app;
