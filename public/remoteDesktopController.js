var App = angular.module("StreamMyDesktop", ['ngMaterial']);
App.controller("screenController", function ($scope, $window) {
  
  var socket = io("/screen");
  $scope.currentFPS = 20;
  var width = 1280;
  var height = 720;

  socket.emit('options', {width: width, height: height, fps: $scope.currentFPS});
  console.log({width: width, height: height, fps: $scope.currentFPS});
  socket.emit('start');
  $scope.start = function() {
    socket.emit("startStream", $scope.currentFPS)
  }

  $scope.stop = function() {
    socket.emit("stopStream", $scope.currentFPS)
  }

  $window.addEventListener("keydown", function(event){
  socket.emit("keyDown", event.key);
  });

 $window.addEventListener("keyup", function(event){
  socket.emit("keyUp", event.key); 
 });

  $window.addEventListener("mousemove", function(event){
    //console.log(event);
  });

  socket.on('frame', function(data){
    console.log(data);
  });
});






