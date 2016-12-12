var net = require('net');
var userSocket = null;


var server = net.createServer(function(socket){

  socket.on('connect', function(){
    console.log("new socket connected");
    if(!userSocket){
      userSocket = socket;
    } else {
      socket.end();
    }

  })
    .on('close', function(){
      console.log("Socket Disconnected");
      if(userSocket === socket) {
        userSocket = null;
      }
    });

});


server.listen(8001, function(){
  console.log("tcp socket open on port 8001");
});



