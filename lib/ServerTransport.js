"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SocketIO = require("socket.io");
const rxjs_1 = require("rxjs");
const ServerClient_1 = require("./ServerClient");
class ServerTransport {
    constructor(config = {}) {
        this.config = config;
        this.onConnect = new rxjs_1.Subject();
        this.onNewSocket = (socket) => new ServerClient_1.ServerClient({ socket });
        this.io = config.io || SocketIO();
        this.io.on("connect", this.onNewSocket);
    }
}
exports.ServerTransport = ServerTransport;
exports.default = ServerTransport;
