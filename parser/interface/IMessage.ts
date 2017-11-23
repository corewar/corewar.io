import { IPosition } from "./IToken";

export enum MessageType {
    Error,
    Warning,
    Info
}

export interface IMessage {

    type: MessageType;
    position: IPosition;
    text: string;
}
