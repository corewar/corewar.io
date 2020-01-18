import { IMessage, MessageType } from "@simulator/interface/IMessage";
import { IPublishProvider } from "@simulator/interface/IPublishProvider";

export interface IPublisher {
    
    queue(message: IMessage): void;
    publish(): void;
    republish(): void;
    clear(): void;
    setPublishProvider(publishProvider: IPublishProvider): void;
}
