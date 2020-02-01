export enum MessageType {

    CoreAccess = 0,
    RunProgress,
    RoundEnd,
    TaskCount,
    CoreInitialise,
    RoundStart,
    NextExecution,
    MatchEnd,
    HillEnd,
    WarriorDead,
    Count
}

export interface IMessage {

    type: MessageType;
    /* eslint-disable-next-line */
    payload: any;
}