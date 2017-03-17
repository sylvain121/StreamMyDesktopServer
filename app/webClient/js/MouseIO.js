class MouseIO {

    constructor(io) {
        this.io = io;
    }

    connect() {
        this.socket = this.io("/mouse");

        this.socket.on("connect", () => {
            this.isConnected = true;
        });
        this.socket.on("disconnect", () => {
            this.isConnected = false;
        });
    }

    mouseMove(x, y) {
        if (this.isConnected)
            this.socket.emit("move", { x: x, y: y });
    }

    mouseButton(button, action) {
        if (this.isConnected) {
            if (action === "mouseup") action = "up";
            if (action === "mousedown") action = "down";
            this.socket.emit("click", { button: button, state: action });
        }
    }
    close() {
        this.socket.close();
    }
}