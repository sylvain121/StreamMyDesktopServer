App.controller("screenController", function($scope, $window, ConnectService) {

  $scope.width = 1280;
  $scope.height = 720;

  var frameCanvas = document.getElementById("frameCanvas");
  frameCanvas.oncontextmenu = function(e) {
    e.preventDefault();
  };
  var frameContext = frameCanvas.getContext("2d");

  ConnectService.setFrameHandler(frameHandler);

  var isPressed = {
    left: false,
    right: false,
    middle: false
  };

  function frameHandler(frame) {
    var img = new Image();
    img.src = 'data:image/jpg;base64,' + frame;
    img.onload = function() {
      frameContext.drawImage(img, 0, 0, frameCanvas.width, frameCanvas.height);
    }

  }

  var Button

  $window.addEventListener("keydown", function(event) {
    console.log("down", event);
    ConnectService.keyDown(event.keyCode);
  });

  $window.addEventListener("keyup", function(event) {
    console.log("up", event);
    ConnectService.keyUp(event.keyCode);
  });

  $window.addEventListener("mousemove", function(event) {
    var coord = getMousePos(event);
    ConnectService.mouseMove(coord.x, coord.y);
  });
  $window.addEventListener("mouseup", function(event) {
    getMouseButton(event);
  })
  $window.addEventListener("mousedown", function(event) {
    getMouseButton(event);
  })


  function getMouseButton(event) {
    var LEFT = 0x01;
    var RIGHT = 0x02;
    var MIDDLE = 0x04;

    if ((event.buttons & LEFT) != isPressed.left) {
      isPressed.left = !isPressed.left;
      ConnectService.mouseButton("left", event.type);
    }
    if ((event.buttons & RIGHT) != isPressed.right) {
      isPressed.right = !isPressed.right;
      ConnectService.mouseButton("right", event.type);
    }
    if ((event.buttons & MIDDLE) != isPressed.middle) {
      isPressed.middle = !isPressed.middle;
      ConnectService.mouseButton("middle", event.type);
    }



  }

  function getMousePos(evt) {
    var rect = frameCanvas.getBoundingClientRect();
    var x = evt.clientX - rect.left;
    var y = evt.clientY - rect.top;

    if (x < 0) x = 0;
    if (x > frameCanvas.width) x = frameCanvas.width;
    if (y < 0) y = 0;
    if (y > frameCanvas.height) y = frameCanvas.height;

    return {
      x: x,
      y: y
    };

  }
});

