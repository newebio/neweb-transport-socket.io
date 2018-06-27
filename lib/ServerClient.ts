import {
    IServerTransportClient,
    IServerTransportClientInputMessage,
    IServerTransportClientOutputMessage,
} from "neweb-core";
import SocketIO = require("socket.io");
import { Subject } from "rxjs";
export interface IServerClientConfig {
    socket: SocketIO.Socket;
}
export class ServerClient implements IServerTransportClient {
    public inputMessage = new Subject<IServerTransportClientInputMessage>();
    public outputMessage = new Subject<IServerTransportClientOutputMessage>();
    constructor(protected config: IServerClientConfig) {
        this.config.socket.on("message", (message) =>
            this.inputMessage.next(message),
        );
        this.outputMessage.subscribe((message) =>
            this.config.socket.send(message),
        );
    }
    public getExtraInfo() {
        return {
            request: this.config.socket.request,
        };
    }
    public getSessionId() {
        return "";
    }
}
export default ServerClient;
