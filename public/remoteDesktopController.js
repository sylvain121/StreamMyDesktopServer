var App = angular.module("StreamMyDesktop", ['ngMaterial']);
App.controller("screenController", function($scope, $window) {

  var frameCanvas = document.getElementById("frameCanvas");
  var frameContext = frameCanvas.getContext("2d");

  var screenSocket = io("/screen");
  $scope.currentFPS = 20;
  //currently only HD ready resolution
  var width = 1280;
  var height = 720;

  var controllerSocket = io("/control");

  screenSocket.on('frame', function(frame) {
    console.log(frame);
    var img = new Image();
    img.src = 'data:image/jpg;base64,' + frame;
    img.onload = function() {
      frameContext.drawImage(img, 0, 0, frameCanvas.width, frameCanvas.height);
    }
  });



  $scope.start = function() {
    console.log('start streaming');
    controllerSocket.emit("distant_screen_size", {
      width: width,
      height: height,
      fps: $scope.currentFPS
    });
    controllerSocket.emit("video_connexion_mode", "websocket");
    controllerSocket.emit("video_codec", "jpeg");
    controllerSocket.emit("start");
  }

  $scope.stop = function() {
    //TODO
  }

  $window.addEventListener("keydown", function(event) {
    //  socket.emit("keyDown", event.key);
  });

  $window.addEventListener("keyup", function(event) {
    //socket.emit("keyUp", event.key);
  });

  $window.addEventListener("mousemove", function(event) {
    //console.log(event);
  });
});

