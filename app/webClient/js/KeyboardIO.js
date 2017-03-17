class KeyboardIO {

    constructor(io) {
        this.io = io;
    }

    connect() {
        this.socket = this.io("/keyboard");

        this.socket.on("connect", () => {
            this.isConnected = true;
        });
        this.socket.on("disconnect", () => {
            this.isConnected = false;
        })

    }

    keyDown(key) {
        if (this.isConnected)
            this.socket.emit("down", key);
    }

    keyUp(key) {
        if (this.isConnected)
            this.socket.emit("up", key);
    }
    close() {
        this.socket.close();
    }
}