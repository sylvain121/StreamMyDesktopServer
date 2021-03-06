/* eslint-env node, es6 */
// app/main.js

// Module to control application life.
const {
  app,
  Tray,
  Menu,
  BrowserWindow
} = require('electron');
const path = require('path');
const iconPath = path.join(__dirname, '/img/cast_off.png');

let appIcon = null;
let win = null;



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {



  var os = require('os');
  var interfaces = os.networkInterfaces();
  var addresses = [];
  for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
      var address = interfaces[k][k2];
      if (address.family === 'IPv4' && !address.internal) {
        addresses.push({
          label: 'http://' + address.address + ':8001/'
        });

      }

    }

  }

  win = new BrowserWindow({
    show: false
  });
  appIcon = new Tray(iconPath);
  var contextMenu = Menu.buildFromTemplate(addresses);
  appIcon.setToolTip('Stream My Desktop');
  appIcon.setContextMenu(contextMenu);


});

