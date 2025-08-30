import { IMessage } from './interface/IMessage'
import { IPublisher, IPublishStrategyMap } from './interface/IPublisher'
import { IPublishProvider } from './interface/IPublishProvider'
import clone from 'clone'

export class Publisher implements IPublisher {
    private publishProvider: IPublishProvider
    private publishStrategies: IPublishStrategyMap
    private republishStrategies: IPublishStrategyMap

    constructor(strategies: IPublishStrategyMap) {
        this.publishStrategies = Object.keys(strategies).reduce(
            (a: IPublishStrategyMap, c: string) => ({ ...a, [c]: clone(strategies[c]) }),
            {}
        )

        this.republishStrategies = Object.keys(strategies).reduce(
            (a: IPublishStrategyMap, c: string) => ({ ...a, [c]: clone(strategies[c]) }),
            {}
        )
    }

    public setPublishProvider(publishProvider: IPublishProvider): void {
        this.publishProvider = publishProvider
    }

    public queue(message: IMessage): void {
        this.publishStrategies[message.type].queue(message)
        this.republishStrategies[message.type].queue(message)
    }

    public publish(): void {
        this.doPublish(this.publishStrategies)

        Object.keys(this.publishStrategies).forEach(key => {
            this.publishStrategies[key].clear()
        })
    }

    public republish(): void {
        this.doPublish(this.republishStrategies)
    }

    private doPublish(strategies: IPublishStrategyMap): void {
        if (!this.publishProvider) {
            return
        }

        Object.keys(strategies).forEach(key => {
            const strategy = strategies[key]
            const message = strategy.dequeue()

            if (!message) {
                return
            }

            this.publishProvider.publishSync(message.type, message.payload)
        })
    }

    public clear(): void {
        Object.keys(this.publishStrategies).forEach(key => {
            this.publishStrategies[key].clear()
        })

        Object.keys(this.republishStrategies).forEach(key => {
            this.republishStrategies[key].clear()
        })
    }
}
