import { IMessage } from './IMessage'
import { IPublishProvider } from './IPublishProvider'
import { IPublishStrategy } from './IPublishStrategy'

export type IPublishStrategyMap = { [messageType: string]: IPublishStrategy }

export interface IPublisher {
    queue(message: IMessage): void
    publish(): void
    republish(): void
    clear(): void
    setPublishProvider(publishProvider: IPublishProvider): void
}
