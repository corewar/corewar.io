import { IPublishStrategy } from "./interface/IPublishStrategy";
import { IMessage } from "./interface/IMessage";

export class PerKeyStrategy implements IPublishStrategy {

    private key: (IMessage) => number;
    private messages: { [key: number]: IMessage; } = {};

    constructor(key: (IMessage) => number) {

        this.key = key;
    }

    public queue(message: IMessage): void {

        this.messages[this.key(message.payload)] = message;
    }

    public dequeue(): IMessage[] {

        const messages = Object.keys(this.messages).map(k => <IMessage>this.messages[k]);

        this.messages = {};

        return messages;
    }
}