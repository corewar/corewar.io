export enum MessageType {

    CoreAccess = 0,
    RunProgress,
    RoundEnd,
    TaskCount,
    CoreInitialise,
    RoundStart,
    NextExecution,
    MatchEnd,
    Count
}

export interface IMessage {

    type: MessageType;
    payload: any;
}