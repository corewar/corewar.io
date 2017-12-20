import { IMessage } from "./IMessage";

export interface IPublisher {
    
    publish(message: IMessage): void;
}