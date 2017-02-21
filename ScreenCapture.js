var encoder = null;
const x11 = require("node-x11");
const jpg_encoder = require('./jpeg-encoder.js');
const h264_encoder = require('node-avcodec-h264-encoder');
var running = false;
var options = {
  screen: {
    width: 0,
    height: 0,
    bpp: 0
  },
  distant: {
    width: 0,
    height: 0
  },
  fps: 0
}

module.exports.getLocalScreenSize = function() {
    var img = x11.getImage();
  
  return {
    width: img.width,
    height: img.height,
    bpp: img.bits_per_pixel
  };

}


var socketSendFn = null;

module.exports.start = function(opt, socketWriteFn, videoCodec) {
console.log("start encoder");
  switch (videoCodec) {
    case "jpeg":
      encoder = jpg_encoder;
      break;
    case "h264":
      encoder = h264_encoder; 
      break;
  }


console.log("setSocket");
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
  try {
    clearInterval(timer);
  } catch (e) {
    console.error(e);
  }
  running = false;
}


function getFrame() {
  var img = x11.getImage();
  options.screen.width = img.width;
  options.screen.height = img.height;
  options.screen.bpp = img.bits_per_pixel;


  if (!running) {
    console.log("init with parameters : ", options.screen.width, options.screen.height, options.distant.width, options.distant.height, options.screen.bpp);
    encoder.initSync(options.screen.width, options.screen.height, options.distant.width, options.distant.height, options.screen.bpp);
    running = true;
  }

  var frame = encoder.encodeFrameSync(img.data);
  if (frame !== undefined) {
    socketSendFn(frame);
    //socket.emit('frame', frame);
  }
}

