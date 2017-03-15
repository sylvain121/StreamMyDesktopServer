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

    $scope.selectedResolution = {};

    $scope.isRunning = ConnectService.isRunning;

    $scope.fps = 20;
    $scope.frameRates = [10, 20, 24, 30, 60];

    $scope.start = function(codec, resolution, fps) {
        console.log(codec, resolution, fps);
        ConnectService.setTransportMode('websocket');
        ConnectService.setCodecType(codec);
        ConnectService.setStreamParameters(resolution.width, resolution.height, fps);
        ConnectService.sendStartCommand();
    }

    $scope.stop = function() {
        ConnectService.sendStopCommand();
    }


});