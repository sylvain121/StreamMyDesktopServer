class ScreenIO {

    constructor(io) {
        this.io = io;
    }
    connect() {
        this.socket = this.io("/screen");
        this.socket.on("connect", () => {
            this.isConnected = true;
        });
        this.socket.on("disconnect", () => {
            this.isConnected = false;
        })
    }

    setFrameHandler(handler) {
        this.socket.on('frame', handler);
    }
    close() {
        this.socket.close();
    }

}