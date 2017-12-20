import { IMessage } from "./interface/IMessage";
import { IPublisher } from "./interface/IPublisher";
import { IPublishProvider } from "./interface/IPublishProvider";

export class Publisher implements IPublisher {

    private publishProvider: IPublishProvider;

    constructor(publishProvider: IPublishProvider) {

        this.publishProvider = publishProvider;
    }

    public publish(message: IMessage): void {
        
        // if (!this.publishProvider) {
        //     return;
        // }


    }
}