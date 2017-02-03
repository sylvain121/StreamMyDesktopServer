App.service('screenService', function($window) {

  
  var fullScreen = false;

  this.isFullScreen = function() {
    return fullScreen;
  }

  this.screen = $window.screen;

  $window.onresize = function(event) {
    var maxHeight = $window.screen.height,
      maxWidth = $window.screen.width,
      curHeight = $window.innerHeight,
      curWidth = $window.innerWidth;
    if (maxWidth == curWidth && maxHeight == curHeight) {
      fullScreen = true;
    } else {
      fullScreen = false;
    }

  }
});

