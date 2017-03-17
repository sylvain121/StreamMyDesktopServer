const app = require('./appManager.js').getInstance();

module.exports.controlHandler = function(socket) {
    socket.on("setVideoParameters", data => {
            app.setDistantConfiguration(data.width, data.height, data.fps);
            app.setTransportMode(data.transport);
            app.setVideoCodec(data.codec)

            //TODO process response;

            socket.emit("ackVideoParameters", true);
        })
        .on("requestControl", data => {
            console.log(data);
            //{ screen: true, keyboard: true, mouse: true }
            // TODO lock websocket to only allow authorized client
            socket.emit('ackRequestControl', { screen: true, keyboard: true, mouse: true });
        })
        .on("ping", () => {
            console.log("ping");
            socket.emit('pong', true);
        })
        .on("start", () => {
            app.screenEncoderStart();
            socket.emit('ackStart', true);
        })
        .on('stop', () => {
            app.screenEncoderStop();
            socket.emit('ackStop', true);
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