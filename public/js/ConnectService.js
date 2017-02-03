App.service("ConnectService", function() {

  this.parameters = {
    width: null,
    height: null,
    fps: null,
    codec: null,
    mode: null,
  };


  var isRunning = false;

  this.isRunning = function() {
    return isRunning;
  }

  var frameHandler = null;

  this.screenSocket = io("/screen");
  this.screenSocket.emit("ping");
  this.controllerSocket = io("/control");
  this.keyboardSocket = io("/keyboard");
  this.mouseSocket = io("/mouse");

  this.setFrameHandler = function(handler) {
    console.log("frame handler : " + typeof handler);
    frameHandler = handler;
  }

  this.screenSocket.on('frame', function(frame) {
    frameHandler(frame);
  });


  this.setStreamParameters = function(width, height, fps) {
    this.controllerSocket.emit("distant_screen_size", {
      width: width,
      height: height,
      fps: fps
    });
  }
  this.setCodecType = function(codec) {
    this.controllerSocket.emit("video_codec", "jpeg");
  }
  this.setTransportMode = function(mode) {
    this.controllerSocket.emit("video_connexion_mode", "websocket");
  }

  this.sendStartCommand = function() {
    console.log("request start stream");
    this.controllerSocket.emit("start");
    isRunning = true;
  }

  this.sendStopCommand = function() {
      this.controllerSocket.emit("stop");
      isRunning = false;
    },
    this.keyDown = function(key) {
      this.keyboardSocket.emit("down", key);
    }
  this.keyUp = function(key) {
    this.keyboardSocket.emit("up", key);
  }


});

