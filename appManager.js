var keyboard = require('./keyBoard.js');
var mouse = require('./mouse.js');
require("node-x11").init();

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
    console.log("set encode type");
    this.screenEncoder = encoder;
  },
  setDistantConfiguration: function(width, height, fps) {
    this.screen.distant.width = width;
    this.screen.distant.height = height;
    this.screen.fps = fps;

    console.log("get local screen size");
    this.screen.screen = this.screenEncoder.getLocalScreenSize(); 
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
    console.log("request encoder start");
    var s = this.videoSocketServer.getSocket();
    if(!s) {
      return "no video Socket connected";
    }

    this.screenEncoder.start(this.screen, this.videoSocketServer.getWriteFn(), this.videoCodec);
  },
  screenEncoderStop: function() {
    this.screenEncoder.stop();
  },
  toggleKeyDown: function(key) {
    keyboard.toggleKeyDown(key);
  },
  toggleKeyUp: function(key){
    keyboard.toggleKeyUp(key);
  },
  mouseMove: function(x, y){
    if(!mouse.isConfigured()) mouse.setParameters(this.screen);
    mouse.move(x, y);
  },
  mouseClick: function(button, state){
    mouse.toggle(button, state);
  }
}



module.exports.getInstance = function() {
  return instance;
}

