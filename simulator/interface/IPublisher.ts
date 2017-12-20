import { IMessage } from "./IMessage";
import { IPublishProvider } from "./IPublishProvider";

export interface IPublisher {
    
    publish(message: IMessage): void;
    setPublishProvider(publishProvider: IPublishProvider): void;
}