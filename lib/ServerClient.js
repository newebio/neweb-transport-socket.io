"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
class ServerClient {
    constructor(config) {
        this.config = config;
        this.inputMessage = new rxjs_1.Subject();
        this.outputMessage = new rxjs_1.Subject();
        this.config.socket.on("message", (message) => this.inputMessage.next(message));
        this.outputMessage.subscribe((message) => this.config.socket.send(message));
    }
    getExtraInfo() {
        return {
            request: this.config.socket.request,
        };
    }
    getSessionId() {
        return "";
    }
}
exports.ServerClient = ServerClient;
exports.default = ServerClient;
