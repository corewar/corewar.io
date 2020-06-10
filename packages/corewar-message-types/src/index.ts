import { IRules, IParseResult, IHillResult } from 'corewar'
import { SendableMessageInfo } from '@azure/service-bus'

export interface ICreateHillMessage extends SendableMessageInfo {
    body: {
        rules: IRules
    }
}

export interface IHillCreatedMessage extends SendableMessageInfo {
    body: {
        id: string
        rules: IRules
    }
}

export interface IUpdateHillMessage extends SendableMessageInfo {
    body: {
        id: string
        rules: IRules
        warriors: {
            redcode: string
        }[]
    }
}

export interface IHillUpdatedMessage extends SendableMessageInfo {
    body: {
        id: string
        rules: IRules
        warriors: {
            redcode: string
        }[]
    }
}

export interface IHillCreatedMessage extends SendableMessageInfo {
    body: {
        id: string
        rules: IRules
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
