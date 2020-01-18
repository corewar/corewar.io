import { IPosition } from "@parser/interface/IToken";

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
