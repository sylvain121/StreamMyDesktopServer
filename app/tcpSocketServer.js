var net = require('net');
var _ = require('lodash');
var userSocket = null;
var InputBuffer = new Buffer(0);
var appManager = require('./appManager.js');


var messageType = ['TYPE_KEY_DOWN', 'TYPE_KEY_UP', 'TYPE_MOUSE_MOTION', 'TYPE_MOUSE_DOWN', 'TYPE_MOUSE_UP', 'TYPE_ENCODER_START', 'TYPE_ENCODER_STOP'];

var server = net.createServer(function(socket) {

  socket.on('connect', function() {
    console.log("new socket connected");
    if (!userSocket) {

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
    .on('data', function(data) {
      InputBuffer = Buffer.concat([InputBuffer, new Buffer(data, 'hex')]);

      if (InputBuffer.length >= 32) {
        var message = {
          int_type: InputBuffer.readInt32LE(0),
          int_x: InputBuffer.readInt32LE(4),
          int_y: InputBuffer.readInt32LE(8),
          int_button: InputBuffer.readInt32LE(12),
          int_keycode: InputBuffer.readInt32LE(16),
          int_width: InputBuffer.readInt32LE(20),
          int_height: InputBuffer.readInt32LE(24),
          int_fps: InputBuffer.readInt32LE(28)

        }
      }
      InputBuffer = InputBuffer.slice(32, InputBuffer.length);
      handleMessage(message);

    });

  function handleMessage(message) {
    message.type = messageType[message.int_type];
    console.log(message);
    switch (message.type) {
      case 'TYPE_ENCODER_START':
        appManager.getInstance().setDistantConfiguration(message.int_width, message.int_height, message.int_fps);
        appManager.getInstance().screenEncoderStart(socket);
        break;
    }
  }

});



server.listen(8001, function() {
  console.log("tcp socket open on port 8001");
});

