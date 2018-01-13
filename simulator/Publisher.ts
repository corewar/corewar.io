import { IMessage, MessageType } from "./interface/IMessage";
import { IPublisher } from "./interface/IPublisher";
import { IPublishProvider } from "./interface/IPublishProvider";
import { IPublishStrategy } from "./interface/IPublishStrategy";

export class Publisher implements IPublisher {

    private publishProvider: IPublishProvider;
    private publishStrategies: IPublishStrategy[];

    private typeDictionary = [
        "CORE_ACCESS",
        "RUN_PROGRESS",
        "ROUND_END",
        "TASK_COUNT",
        "CORE_INITIALISE",
        "ROUND_START",
        "NEXT_EXECUTION"
    ];

    constructor(strategies: IPublishStrategy[]) {

        this.publishStrategies = strategies;
    }

    public setPublishProvider(publishProvider: IPublishProvider): void {

        this.publishProvider = publishProvider;
    }

    public queue(message: IMessage): void {

        this.publishStrategies[message.type].queue(message);
    }

    public publish(): void {

        if (!this.publishProvider) {
            return;
        }

        this.publishStrategies
            .forEach(s => {
                var message = s.dequeue();

                if (!message) {
                    return;
                }

                this.publishProvider.publishSync(
                    this.typeDictionary[message.type],
                    message.payload
                );
            });
    }
}