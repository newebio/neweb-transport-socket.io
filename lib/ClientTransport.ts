import SocketIOClient = require("socket.io-client");
import {
    IClientTransport,
    IClientTransportInputMessage,
    IClientTransportOutputMessage,
} from "neweb-core";
import { Subject } from "rxjs";
export interface IClientTransportConfig {
    address: string;
    opts?: SocketIOClient.ConnectOpts;
}
export class ClientTransport implements IClientTransport {
    public onConnect = new Subject<void>();
    public onDisconnect = new Subject<void>();
    public onConnecting = new Subject<void>();
    public inputMessage = new Subject<IClientTransportInputMessage>();
    public outputMessage = new Subject<IClientTransportOutputMessage>();
    protected io: SocketIOClient.Socket;
    constructor(protected config: IClientTransportConfig) {}
    public start() {
        this.io = SocketIOClient(this.config.address, this.config.opts);
        this.outputMessage.subscribe((message) => this.io.send(message));
        this.io.on("connect", () => this.onConnect.next());
        this.io.on("disconnect", () => this.onDisconnect.next());
        this.io.on("connecting", () => this.onConnecting.next());
        this.io.on("error", () => this.onDisconnect.next());
        this.io.on("message", (message: any) =>
            this.inputMessage.next(message),
        );
    }
    public stop() {
        this.io.removeAllListeners();
        this.io.close();
    }
}
export default ClientTransport;
