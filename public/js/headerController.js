App.controller("headerController", function($scope, ConnectService) {

  $scope.codec = "jpeg";
  $scope.codecs = ["jpeg"];

   $scope.allRes = [{
    width: 1920,
    height: 1080,
    name: "1920x1080"
  }, {
    width: 1280,
    height: 720,
    name: "1280x720"
  }]

  $scope.selectedResolution = 1; 

  $scope.isRunning = ConnectService.isRunning;

  $scope.fps = 20;
  $scope.frameRates = [10, 20, 24, 30, 60];

  $scope.start = function() {
    console.log($scope.allRes[$scope.selectedResolution].width, $scope.allRes[$scope.selectedResolution].height, $scope.fps);
    ConnectService.setTransportMode('websocket');
    ConnectService.setCodecType($scope.codec);
    ConnectService.setStreamParameters($scope.allRes[$scope.selectedResolution].width, $scope.allRes[$scope.selectedResolution].height, $scope.fps);
    ConnectService.sendStartCommand();
  }

  $scope.stop = function() {
    ConnectService.sendStopCommand();
  }


});

