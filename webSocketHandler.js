const app = require('./appManager.js').getInstance();

module.exports.controlHandler = function(socket) {
  socket.on("distant_screen_size", data => {
      app.setDistantConfiguration(data.width, data.height, data.fps);
    })
    .on("video_connexion_mode", data => {
      var res = app.setTransportMode(data);
      socket.emit('video_connexion_mode', res);
    })
    .on("video_codec", video_codec => {
      socket.emit('video_codec', app.setVideoCodec(video_codec));
    })
    .on("start", () => {
      app.screenEncoderStart();
    })
    .on('stop', () => {
      app.screenEncoderStop();
    })

}
module.exports.keyboardHandler = function(socket) {
  socket.on("down", key => {
      app.toggleKeyDown(key);
    })
    .on("up", key => {
      app.toggleKeyUp(key);
    })
}
module.exports.mouseHandler = function(socket) {
  socket.on("move", data => {
    app.mouseMove(data.x, data.y);
  })
    .on("click", data => {
      app.mouseClick(data.button, data.state);
    })
}
