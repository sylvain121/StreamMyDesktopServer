class ControlIO {

    constructor(io) {
        this.socket = io("/control");

        this.socket.on("connect", () => {
            console.log("connected");
            this.isConnected = true;
        });
        this.socket.on("disconnect", () => {
            this.isConnected = false;
        })
    }

    requestControl(callback) {
        this.socket.on('ackRequestControl', callback);
        this.socket.emit("requestControl", { screen: true, keyboard: true, mouse: true });
    }

    setVideoParameters(videoParameters, callback) {

        /* {
           width,
           height,
           fps,
           codec,
           transport
         } */

        this.socket.on("ackVideoParameters", data => {
            callback(data);
        });

        this.socket.emit("setVideoParameters", videoParameters);
    }
    sendStartCommand(callback) {
        this.socket.on("ackStart", callback)
        this.socket.emit("start");
    }

    sendStopCommand(callback) {
        this.socket.on("ackStop", callback)
        this.socket.emit("stop");
    }


    ping(callback) {
        this.socket.on("ackPing", callback);
        this.socket.emit("ping");
    }


    get isRunning() {
        return this.running;
    }





}