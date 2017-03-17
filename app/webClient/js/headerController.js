App.controller("headerController", function($scope, AppManager, $log) {

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


    $scope.$watch(AppManager.streamRunning, () => {
        console.log("running : " + AppManager.streamRunning);
    })

    $scope.selectedResolution = 1;

    $scope.running = AppManager.streamRunning;

    $scope.fps = 30;
    $scope.frameRates = [10, 20, 24, 30, 60];

    $scope.start = function(codec, resolution, fps) {

        var parameters = {
            width: $scope.allRes[resolution].width,
            height: $scope.allRes[resolution].height,
            fps: fps,
            codec: codec,
            transport: 'websocket'
        };
        $log.debug(parameters)

        AppManager.startStream(parameters);
    }

    $scope.stop = function() {
        AppManager.stopStream();
    }


});