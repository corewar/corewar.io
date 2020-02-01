export enum MessageType {

    CoreAccess = "CORE_ACCESS",
    RunProgress = "RUN_PROGRESS",
    RoundEnd = "ROUND_END",
    TaskCount = "TASK_COUNT",
    CoreInitialise = "CORE_INITIALISE",
    RoundStart = "ROUND_START",
    NextExecution = "NEXT_EXECUTION",
    MatchEnd = "MATCH_END",
    HillEnd = "HILL_END",
    WarriorDead = "WARRIOR_DEAD"
}

export interface IMessage {

    type: MessageType;
    /* eslint-disable-next-line */
    payload: any;
}