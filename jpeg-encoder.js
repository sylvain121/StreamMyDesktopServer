var jpg = require('jpeg-turbo');
var resize = require('node-bitmap-resize');
var preallocated = null;
var options = null;

module.exports.initSync = function(local_width, local_height, distant_width, distant_height) {

  options = {
    format: jpg.FORMAT_BGRA,
    width: distant_width,
    height: distant_height,
    subsampling: jpg.SAMP_440,

  }

  preallocated = new Buffer(jpg.bufferSize(options))

}

module.exports.encodeFrameSync = function(buffer) {

  var resized = resize.resize({
    data: buffer,
    width: local_width,
    height: local_height,
    destwidth: distant_width,
    destheight: distant_height
  });

  return  jpg.compressSync(resized, preallocated, options)

}

