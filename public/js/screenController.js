App.controller("screenController", function($scope, $window, ConnectService) {

  $scope.width = 1280;
  $scope.height = 720;

  var frameCanvas = document.getElementById("frameCanvas");
  var frameContext = frameCanvas.getContext("2d");

  ConnectService.setFrameHandler(frameHandler);


  function frameHandler(frame) {
    var img = new Image();
    img.src = 'data:image/jpg;base64,' + frame;
    img.onload = function() {
      frameContext.drawImage(img, 0, 0, frameCanvas.width, frameCanvas.height);
    }

  }

  $window.addEventListener("keydown", function(event) {
    console.log("down", event.key);
    ConnectService.keyDown(event.key);
  });

  $window.addEventListener("keyup", function(event) {
    console.log("up", event.key);
    ConnectService.keyUp(event.key); 
  });

  $window.addEventListener("mousemove", function(event) {
    //console.log(event);
  });
});

