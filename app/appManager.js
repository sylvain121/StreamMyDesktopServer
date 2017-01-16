var instance = {

  screen: {
    distant: {
      width: 0,
      height: 0
    },
    screen: {
      width:0,
      height:0
    },
    fps: 30
  },
  setScreenEncoder: function(encoder) {
    this.screenEncoder = encoder;
  },
  setDistantConfiguration: function(width, height, fps) {
    this.screen.distant.width = width;
    this.screen.distant.height = height;
    this.screen.fps = fps;
  },
  screenEncoderStart: function(socket) {
    this.screenEncoder.start(this.screen, socket);
  },
  screenEncoderStop: function() {
    this.screenEncoder.stop();
  }


}



module.exports.getInstance = function() {
  return instance;
}

