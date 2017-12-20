import { IMessage, MessageType } from "./interface/IMessage";
import { IPublisher } from "./interface/IPublisher";
import { IPublishProvider } from "./interface/IPublishProvider";

export class Publisher implements IPublisher {

    private publishProvider: IPublishProvider;

    private typeDictionary = [
        "CORE_ACCESS",
        "RUN_PROGRESS",
        "ROUND_END",
        "TASK_COUNT",
        "CORE_INITIALISE",
        "ROUND_START"
    ];

    constructor(publishProvider: IPublishProvider) {

        this.publishProvider = publishProvider;
    }

    public publish(message: IMessage): void {
        
        if (!this.publishProvider) {
            return;
        }
        
        this.publishProvider.publishSync(
            this.typeDictionary[message.type],
            message.payload
        )
    }
}