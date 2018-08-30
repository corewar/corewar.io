import { IMessage, MessageType } from "./interface/IMessage";
import { IPublisher } from "./interface/IPublisher";
import { IPublishProvider } from "./interface/IPublishProvider";
import { IPublishStrategy } from "./interface/IPublishStrategy";
import * as clone from "clone";

export class Publisher implements IPublisher {

    private publishProvider: IPublishProvider;
    private publishStrategies: IPublishStrategy[];
    private republishStrategies: IPublishStrategy[];

    private typeDictionary = [
        "CORE_ACCESS",
        "RUN_PROGRESS",
        "ROUND_END",
        "TASK_COUNT",
        "CORE_INITIALISE",
        "ROUND_START",
        "NEXT_EXECUTION",
        "MATCH_END"
    ];

    constructor(strategies: IPublishStrategy[]) {

        this.publishStrategies = strategies.map(s => clone(s));
        this.republishStrategies = strategies.map(s => clone(s));
    }

    public setPublishProvider(publishProvider: IPublishProvider): void {

        this.publishProvider = publishProvider;
    }

    public queue(message: IMessage): void {

        this.publishStrategies[message.type].queue(message);
        this.republishStrategies[message.type].queue(message);
    }

    public publish(): void {

        this.doPublish(this.publishStrategies);

        this.publishStrategies
            .forEach(s => {
                s.clear();
            });
    }

    public republish(): void {

        this.doPublish(this.republishStrategies);
    }

    private doPublish(strategies: IPublishStrategy[]) {

        if (!this.publishProvider) {
            return;
        }

        strategies
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

    public clear(): void {

        this.publishStrategies
            .forEach(s => {
                s.clear();
            });

        this.republishStrategies
            .forEach(s => {
                s.clear();
            });
    }
}