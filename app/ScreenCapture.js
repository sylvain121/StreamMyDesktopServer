const encoder = require('node-avcodec-h264-encoder');
const { screen } = require('robotjs');

var runnning = false;
var options = {
  screen: {
    width: 0,
    height: 0,
  },
  distant: {
    width: 0
    height: 0
  },
  fps: 0
}


var socket = null;

module.exports.start = function(opt, s) {
  socket = s;
  options = opt 
  if(running) return "already running";
  timer = setInterval(getFrame, 1000/25);

}

module.exports.stop = function() {
  clearInterval(timer);
}


function getFrame() {
  var img = screen.capture();
  options.screen.width = img.width;
  options.screen.height = img.height;

  if(!runnning) {
    encoder.initSync(options.screen.width, options.screen.height, options.distant.width, options.distant.height);
    running = true;
  }

  var frame = encoder.encodeFrameSync(img.image); 
  if(frame !== undefined) {
    socket.write(frame);
  }
}

