import { IPublishStrategy } from './interface/IPublishStrategy'
import { IMessage } from './interface/IMessage'

export class LatestOnlyStrategy implements IPublishStrategy {
    private message: IMessage

    constructor() {
        this.message = null
    }

    public queue(message: IMessage): void {
        this.message = message
    }

    public dequeue(): IMessage {
        if (!this.message) {
            return null
        }

        const message = this.message

        return message
    }

    public clear(): void {
        this.message = null
    }
}
