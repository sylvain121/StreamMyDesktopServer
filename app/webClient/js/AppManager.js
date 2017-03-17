App.service("AppManager", function($log) {

    this.isConnected = false;
    this.isValidParameters = false;
    this.streamRunning = false;


    this.controller = new ControlIO(io);
    this.screen = new ScreenIO(io);
    this.keyboard = new KeyboardIO(io);
    this.mouse = new MouseIO(io);

    this.controller.ping(pong => {
        if (pong)
            this.isConnected = true;
    });

    this.startStream = parameters => {

        this.controller.requestControl(response => {
            if (response.screen) {
                this.screen.connect();
                $log.info("screen connected");
                this.screen.setFrameHandler(this.frameHandler);
            }
            if (response.keyboard) {
                this.keyboard.connect();
                $log.info("keyboard connected");
            }
            if (response.mouse) {
                this.mouse.connect();
                $log.info("mouse connected");
            }

            this.controller.setVideoParameters(parameters, response => {
                if (response) {
                    this.isValidParameters = true;
                } else {
                    this.isValidParameters = false;
                }

                if (this.isValidParameters) {
                    this.controller.sendStartCommand(() => {
                        $log.info("stream started");
                        this.streamRunning = true;
                    });
                }
            });
        });
    }

    this.stopStream = () => {
        this.controller.sendStopCommand(response => {
            if (response) {
                this.screen.close();
                this.keyboard.close();
                this.mouse.close();
                this.streamRunning = false;
                $log.info("stream Stopped");
            }
        })
    }

    this.getKeyboard = () => {
        if (this.keyboard.isConnected) return this.keyboard;
    }

    this.getMouse = () => {
        if (this.mouse.isConnected) return this.mouse;
    }

    this.setFrameHandler = frameHadler => {
        this.frameHandler = frameHadler;
    }
});