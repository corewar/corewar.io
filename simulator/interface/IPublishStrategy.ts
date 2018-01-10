import { IMessage, MessageType } from "./IMessage";

export interface IPublishStrategy {

    queue(message: IMessage): void;
    dequeue(): IMessage;
}