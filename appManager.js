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
    console.log("video codec : "+videoCodec);
    switch(videoCodec) {
      case "jpeg":
        this.videoCodec = "jpeg";
        break;
      default:
        return "unknow codec type : "+videoCodec;
    }
  },
  setTransportMode: function(mode) {
    console.log("transport mode : "+ mode);
    switch (mode) {
      case 'websocket':
        this.transport_mode = mode;
        this.videoSocketServer = require('./webServer.js').getScreen();
        return {
          mode: "websocket",
          port: null
        }
      case 'tcp':
        this.transport_mode = mode;
        this.videoSocketServer = require('./tcpSocketServer.js');
        return {
          mode: "tcp",
          port: this.videoSocketServer.getPort()
        }
        break;
      case 'udp':

        break;
      default:
        return "error", "unknow transport mode : " + mode;
    }
  },
  screenEncoderStart: function() {
    var s = this.videoSocketServer.getSocket();
    if(!s) {
      return "no video Socket connected";
    }

    this.screenEncoder.start(this.screen, this.videoSocketServer.getWriteFn(), this.videoCodec);
  },
  screenEncoderStop: function() {
    this.screenEncoder.stop();
  },
  handleKeyboardEvent: function(event) {

  },
  handleMouseEvent: function(event) {
    console.log("KEY PRESSED : "+ event);
  }


}



module.exports.getInstance = function() {
  return instance;
}

