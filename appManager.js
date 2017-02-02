var instance = {
  transport_mode: null,
  videoSocketServer: null,
  videoCodec: null,

  screen: {
    distant: {
      width: 0,
      height: 0
    },
    screen: {
      width: 0,
      height: 0
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
  setVideoCodec: function (videoCodec){
    switch(videoCodec) {
      case "jpeg":
        this.videoCodec = "jpeg";
        break;
      default:
        return "unknow codec type : "+videoCodec;
    }
  },
  setTransportMode: function(mode) {
    switch (mode) {
      case 'websocket':
      case 'tcp':
        this.transport_mode = mode;
        this.videoSocketServer = require('./tcpSocketServer.js');
        return {
          mode: tcp,
          port: this.videoSocketServer.getPort();
        }
        break;
      case 'udp':

        break;
      default:
        return "error", "unknow video mode : " + socketMode;
    }
  },
  screenEncoderStart: function() {
    var s = this.videoSocketServer.getSocket();
    if(!s) {
      return "no video Socket connected";
    }

    this.screenEncoder.start(this.screen, this.videoSocketServer.getWriteFni, this.videoCodec);
  },
  screenEncoderStop: function() {
    this.screenEncoder.stop();
  },
  handleKeyboardEvent: function(event) {

  },
  handleMouseEvent: function(event) {
    console.log("KEY PRESSED : "
      i + event);
    this.
  }


}



module.exports.getInstance = function() {
  return instance;
}

