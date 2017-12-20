export enum MessageType {

    CoreAccess,
    RunProgress,
    RoundEnd,
    TaskCount,
    CoreInitialise,
    RoundStart
}

export interface IMessage {

    type: MessageType;
    payload: any;
}