var net = require('net');

var server = net.createServer(function(socket){

});


server.listen(8000, function(){
  console.log("tcp socket open on port 8000");
});
