import { IRules, IParseResult, IHillResult } from 'corewar'
import { SendableMessageInfo, ServiceBusMessage } from '@azure/service-bus'

export type Received<T> = T & ServiceBusMessage

export interface ICreateHillMessage extends SendableMessageInfo {
    body: {
        name: string
        rules: IRules
    }
}

export interface IHillCreatedMessage extends SendableMessageInfo {
    body: {
        id: string
        name: string
        rules: IRules
    }
}

export interface IUpdateHillMessage extends SendableMessageInfo {
    body: {
        id: string
        name: string
        rules: IRules
        warriors: {
            redcode: string
        }[]
    }
}

export interface IHillUpdatedMessage extends SendableMessageInfo {
    body: {
        id: string
        name: string
        rules: IRules
        warriors: {
            redcode: string
        }[]
    }
}

export interface IDeleteHillMessage extends SendableMessageInfo {
    body: {
        id: string
    }
}

export interface IHillDeletedMessage extends SendableMessageInfo {
    body: {
        id: string
    }
}

export interface IChallengeHillMessage extends SendableMessageInfo {
    body: {
        id: string
        redcode: string
    }
}

export interface IStartChallengeMessage extends SendableMessageInfo {
    body: {
        id: string
        redcode: string
    }
}

export interface IStartChallengeFailedMessage extends SendableMessageInfo {
    body: {
        id: string
        message: string
        result: IParseResult
    }
}

export interface IChallengeResultMessage extends SendableMessageInfo {
    body: {
        id: string
        result: IHillResult
    }
}
