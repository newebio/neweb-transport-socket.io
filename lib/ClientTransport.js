"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SocketIOClient = require("socket.io-client");
const rxjs_1 = require("rxjs");
class ClientTransport {
    constructor(config) {
        this.config = config;
        this.onConnect = new rxjs_1.Subject();
        this.onDisconnect = new rxjs_1.Subject();
        this.onConnecting = new rxjs_1.Subject();
        this.inputMessage = new rxjs_1.Subject();
        this.outputMessage = new rxjs_1.Subject();
    }
    start() {
        this.io = SocketIOClient(this.config.address, this.config.opts);
        this.outputMessage.subscribe((message) => this.io.send(message));
        this.io.on("connect", () => this.onConnect.next());
        this.io.on("disconnect", () => this.onDisconnect.next());
        this.io.on("connecting", () => this.onConnecting.next());
        this.io.on("error", () => this.onDisconnect.next());
        this.io.on("message", (message) => this.inputMessage.next(message));
    }
    stop() {
        this.io.removeAllListeners();
        this.io.close();
    }
}
exports.ClientTransport = ClientTransport;
exports.default = ClientTransport;
