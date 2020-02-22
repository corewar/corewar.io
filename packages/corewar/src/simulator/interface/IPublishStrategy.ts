import { IMessage } from '@simulator/interface/IMessage'

export interface IPublishStrategy {
    queue(message: IMessage): void
    dequeue(): IMessage
    clear(): void
}
