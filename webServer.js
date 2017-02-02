/* eslint-env es6 */
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const robot = require('robotjs');

const screenSocketHandler = require('./screenSocketHandler');
const webSocketControlHandler = require('./webSocketControlHandler.js');


var screenUserSocket = null;

app.use(express.static(__dirname+'/public'));

var current = {
  keyboard: null,
  mouse: null,
  screen: null,
  control: null
}


module.exports.getScreen = function(){
  return {
    getSocket: function() {
      return screenUserSocket
    },
    getWriteFn : function() {
      if(screenUserSocket) return function(frame){
        screenUserSocket.emit('frame', frame);
      } 
      return null;
    }
  }
}



var screen = io.of('/screen')
  .on('connection', (s)=> {
    console.log('new screen client');
    if(!screenUserSocket) {
      screenUserSocket = s;
    }
    else {
      s.close();
    }
  })
  .on('disconnect', (s) => {
    console.log('screen disconnect');
  })

var keyboard = io.of('/keyboard')
  .on('connection', (s)=> {
    console.log('new screen client');
  })
  .on('disconnect', (s) => {
    console.log('screen disconnect');
  })

var mouse = io.of('/mouse')
  .on('connection', (s)=> {
    console.log('new screen client');
  })
  .on('disconnect', (s) => {
    console.log('screen disconnect');
  })

var control = io.of('/control')
  .on('connection', (s)=> {
    console.log('new control connection');
    webSocketControlHandler(s);
  })
  .on('disconnect', (s) => {
    console.log('control disconnected');
  })






http.listen(3000, function(){
  console.log('listening on *:3000');
  //TODO display http server ready

});
