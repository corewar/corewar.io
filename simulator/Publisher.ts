import { IMessage, MessageType } from "./interface/IMessage";
import { IPublisher } from "./interface/IPublisher";
import { IPublishProvider } from "./interface/IPublishProvider";

export class Publisher implements IPublisher {

    private publishProvider: IPublishProvider;

    private typeEnabled: boolean[];

    private typeDictionary = [
        "CORE_ACCESS",
        "RUN_PROGRESS",
        "ROUND_END",
        "TASK_COUNT",
        "CORE_INITIALISE",
        "ROUND_START"
    ];

    constructor() {

        this.setAllMessagesEnabled(true);
    }

    public setPublishProvider(publishProvider: IPublishProvider) {

        this.publishProvider = publishProvider;
    }

    public publish(message: IMessage): void {

        if (!this.publishProvider) {
            return;
        }

        if (!this.typeEnabled[message.type]) {
            return;
        }

        this.publishProvider.publishSync(
            this.typeDictionary[message.type],
            message.payload
        )
    }

    public setAllMessagesEnabled(enabled: boolean): void {

        this.typeEnabled = [];
        for (var i = 0; i < MessageType.Count; i++) {
            this.typeEnabled.push(enabled);
        }
    }

    public setMessageTypeEnabled(type: MessageType, enabled: boolean): void {

        this.typeEnabled[type] = enabled;
    }
}