var net = require('net');
var userSocket = null;
var appManager = require('./appManager.js');
var port = 8001;

module.exports.getSocket = function() {
  return userSocket;
};

module.exports.getPort = function() {
  return port;
}

module.exports.getWriteFn = function() {
  if(userSocket) return userSocket.write();
  return null;
}

var server = net.createServer(function(socket) {

  socket.on('connect', function() {
      console.log("new socket connected");
      if (!userSocket) {
        userSocket = socket;
      } else {
        socket.end();
      }

    })
    .on('close', function() {
      console.log("Socket Disconnected");
      if (userSocket === socket) {
        userSocket = null;
      }
    })
});



server.listen(port, function() {
  console.log("tcp socket open on port "+port);
});

