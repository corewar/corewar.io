import { IMessage } from './IMessage'

export interface IPublishStrategy {
    queue(message: IMessage): void
    dequeue(): IMessage
    clear(): void
}
