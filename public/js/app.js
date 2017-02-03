var App = angular.module("StreamMyDesktop", ['ngMaterial']);
App.controller('appController', function($scope, screenService){

  $scope.fullscreen = screenService.isFullscreen;

});
