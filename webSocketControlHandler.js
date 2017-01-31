const app = require('./appManager.js').getInstance();

module.exports = function(socket) {
  socket.on("distant_screen_size", data => {
      app.setDistantConfiguration(data.width, data.height, data.fps);
    })
    .on("video_connexion_mode", data => {
    var res = app.setSocket(data.mode);
      socket.emit(res);
   })
    .on("options", data => {
      app.setDistantConfiguration(data.width, data.height, data.fps);
    })

}
