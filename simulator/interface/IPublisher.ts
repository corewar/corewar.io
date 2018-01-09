import { IMessage, MessageType } from "./IMessage";
import { IPublishProvider } from "./IPublishProvider";

export interface IPublisher {
    
    queue(message: IMessage): void;
    publish(): void;
    setPublishProvider(publishProvider: IPublishProvider): void;
}
