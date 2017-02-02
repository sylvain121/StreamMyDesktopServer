var jpg = require('jpeg-turbo');
var resize = require('node-bitmap-resize');
var preallocated = null;
var options = null;
var resizePacket = {
  data: null,
  width:0,
  height: 0,
  destwidth: 0,
  destheight: 0
};


module.exports.initSync = function(local_width, local_height, distant_width, distant_height) {

  resizePacket.width = local_width;
  resizePacket.height = local_height;
  resizePacket.destwidth = distant_width;
  resizePacket.destheight = distant_height;

  options = {
    format: jpg.FORMAT_BGRA,
    width: distant_width,
    height: distant_height,
    subsampling: jpg.SAMP_440,

  }

  preallocated = new Buffer(jpg.bufferSize(options))

}

module.exports.encodeFrameSync = function(buffer) {

  resizePacket.data = buffer;
  var resized = resize.resizeSync(resizePacket);

  return  jpg.compressSync(resized, preallocated, options)

}

