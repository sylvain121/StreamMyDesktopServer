const appManager = require('./appManager.js');

module.exports = function(socket) {
  socket.on("start", data => {
    appManager.getInstance().screenEncoderStart(socket);

  })
    .on("stop", data => {

    })
    .on("options", data => {
      appManager.getInstance().setDistantConfiguration(data.width, data.height, data.fps);
    })

}
