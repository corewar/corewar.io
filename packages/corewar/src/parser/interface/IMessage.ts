import { IPosition } from './IToken'

export enum MessageType {
    Error = 'ERROR',
    Warning = 'WARNING',
    Info = 'INFO'
}

export interface IMessage {
    type: MessageType
    position: IPosition
    text: string
}
