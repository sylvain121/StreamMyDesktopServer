var jpg_encoder = require('jpeg-turbo');
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


module.exports.initSync = function(local_width, local_height, distant_width, distant_height, depth) {

  resizePacket.width = local_width;
  resizePacket.height = local_height;
  resizePacket.destwidth = distant_width;
  resizePacket.destheight = distant_height;

  options = {
    format: jpg_encoder.FORMAT_BGRA,
    width: distant_width,
    height: distant_height,
    subsampling: jpg_encoder.SAMP_440,

  }
  console.log("init resizer : ",  local_width, local_height, distant_width, distant_height, depth);
  resize.initSync(local_width, local_height, distant_width, distant_height, depth)
  console.log("init turbo-jpeg buffer");
  preallocated = new Buffer(jpg_encoder.bufferSize(options))

}

module.exports.encodeFrameSync = function(buffer) {

  resizePacket.data = buffer;
  var resized = resize.resizeSync(resizePacket.data);
  return  jpg_encoder.compressSync(resized, preallocated, options)

}

