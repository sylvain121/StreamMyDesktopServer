var appManager = require('./appManager.js');
var screen = require('./ScreenCapture.js');
var tcpsocket = require('./tcpSocketServer.js');


appManager.getInstance().setScreenEncoder(screen);
