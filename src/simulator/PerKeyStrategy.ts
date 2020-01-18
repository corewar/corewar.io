import { IPublishStrategy } from "@simulator/interface/IPublishStrategy";
import { IMessage } from "@simulator/interface/IMessage";
import { MessageType } from "@simulator/interface/IMessage";

export class PerKeyStrategy implements IPublishStrategy {

    private key: (IMessage) => number;
    private type: MessageType;
    private payloads: { [key: number]: IMessage; } = {};

    constructor(key: (IMessage) => number) {

        this.key = key;
    }

    public queue(message: IMessage): void {

        this.type = message.type;
        this.payloads[this.key(message.payload)] = message.payload;
    }

    public dequeue(): IMessage {

        const payloads = Object.keys(this.payloads).map(k => this.payloads[k]);

        if (payloads.length === 0) {
            return null;
        }

        return {
            type: this.type,
            payload: payloads
        };
    }

    public clear(): void {

        this.payloads = {};
    }
}