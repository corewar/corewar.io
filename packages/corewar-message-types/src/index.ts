import { IRules, IParseResult, IHillResult } from 'corewar'
import { SendableMessageInfo, ServiceBusMessage } from '@azure/service-bus'

export type Received<T> = T & ServiceBusMessage

export interface ICreateHillMessage extends SendableMessageInfo {
    body: {
        userId: string
        name: string
        rules: IRules
    }
}

export interface IHillCreatedMessage extends SendableMessageInfo {
    body: {
        id: string
        userId: string
        name: string
        rules: IRules
    }
}

export interface IDeleteHillMessage extends SendableMessageInfo {
    body: {
        id: string
        userId: string
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
        userId: string
        redcode: string
    }
}

export interface IStartChallengeMessage extends SendableMessageInfo {
    body: {
        id: string
        userId: string
        redcode: string
    }
}

export interface IStartChallengeFailedMessage extends SendableMessageInfo {
    body: {
        id: string
        userId: string
        message: string
        result: IParseResult
    }
}

export interface IChallengeResultMessage extends SendableMessageInfo {
    body: {
        id: string
        userId: string
        result: IHillResult
    }
}
