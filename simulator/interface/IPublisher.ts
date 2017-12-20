import { IMessage, MessageType } from "./IMessage";
import { IPublishProvider } from "./IPublishProvider";

export interface IPublisher {
    
    publish(message: IMessage): void;
    setPublishProvider(publishProvider: IPublishProvider): void;
    setAllMessagesEnabled(enabled: boolean): void;
    setMessageTypeEnabled(type: MessageType, enabled: boolean): void;
}
