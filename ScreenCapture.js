var encoder = null;
const { screen } = require('robotjs');


var running = false;
var options = {
  screen: {
    width: 0,
    height: 0,
  },
  distant: {
    width: 0,
    height: 0
  },
  fps: 0
}


var socketSendFn = null;

module.exports.start = function(opt, socketWriteFn, videoCodec) {

  switch(videoCodec) {
    case "jpeg":
      encoder = require('./jpeg-encoder.js');
      break;
      case "h264":
      encoder = require('node-avcodec-h264-encoder');
      break;
  }



  socketSendFn = socketWriteFn;
  options = opt
  if (options.fps === 0) return "Error : no fps specified";
  if (options.distant.width <= 0 || options.distant.height <= 0)
    return "Error : screen size to small w: " + options.distant.width + "h:" + options.distant.height;
  if (running) return "already running";
  console.log("output video dimension, width : " + options.distant.width + " height : " + options.distant.height + " fps : " + options.fps);
  timer = setInterval(getFrame, 1000 / options.fps);

}

module.exports.stop = function() {
  clearInterval(timer);
  running = false;
}


function getFrame() {
  var img = screen.capture();
  options.screen.width = img.width;
  options.screen.height = img.height;

  if (!running) {
    console.log(img);
    console.log(options.screen.width, options.screen.height, options.distant.width, options.distant.height);
    encoder.initSync(options.screen.width, options.screen.height, options.distant.width, options.distant.height);
    running = true;
  }

  var frame = encoder.encodeFrameSync(img.image);
  if (frame !== undefined) {
    socketSendFn(frame);
    //socket.emit('frame', frame);
  }
}

