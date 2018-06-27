import SocketIO = require("socket.io");
import { IServerTransport, IServerTransportClient } from "neweb-core";
import { Subject } from "rxjs";
import { ServerClient } from "./ServerClient";
export interface IServerTransportConfig {
    io: SocketIO.Server;
}
export class ServerTransport implements IServerTransport {
    public io: SocketIO.Server;
    public onConnect = new Subject<IServerTransportClient>();
    constructor(protected config: IServerTransportConfig) {
        this.io = config.io || SocketIO();
        this.io.on("connect", this.onNewSocket);
    }
    protected onNewSocket = (socket: SocketIO.Socket) =>
        new ServerClient({ socket });
}
export default ServerTransport;
