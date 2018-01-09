import { IPublishStrategy } from "./interface/IPublishStrategy";
import { IMessage } from "./interface/IMessage";

export class LatestOnlyStrategy implements IPublishStrategy {

    private message: IMessage;

    constructor() {

        this.message = null;
    }

    public queue(message: IMessage): void {

        this.message = message;
    }

    public dequeue(): IMessage[] {

        if (!this.message) {
            return [];
        }

        const message = this.message;
        this.message = null;

        return [message];
    }
}