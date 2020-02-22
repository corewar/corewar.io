import { IMessage } from '@simulator/interface/IMessage'
import { IPublishProvider } from '@simulator/interface/IPublishProvider'
import { IPublishStrategy } from '@simulator/interface/IPublishStrategy'

export type IPublishStrategyMap = { [messageType: string]: IPublishStrategy }

export interface IPublisher {
    queue(message: IMessage): void
    publish(): void
    republish(): void
    clear(): void
    setPublishProvider(publishProvider: IPublishProvider): void
}
