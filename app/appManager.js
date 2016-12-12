var instance = {

  screen: {
    distant: {
      width: 0,
      height: 0
    },
    local: {
      width:0,
      height:0
    }
  },
  setScreenEncoder: function(encoder) {
    this.screenEncoder = encoder;
  },
  setDistantScreenSize: function(width, height) {
    screen.distant.width = width;
    screen.distant.height = height;
  },
  screenEncoderStart: function(socket) {
    this.screenEncoder.start(this.options, socket);
  },
  screenEncoderStop: function() {
    this.screenEncoder.stop();
  }


}



module.exports.getInstance = function() {
  return instance;
}

