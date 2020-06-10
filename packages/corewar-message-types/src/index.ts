import { IRules } from 'corewar'

export interface ICreateHillMessage {
    body: {
        rules: IRules
    }
}

export interface IHillCreatedMessage {
    body: {
        id: string
        rules: IRules
    }
}

export interface IUpdateHillMessage {
    body: {
        id: string
        rules: IRules
        warriors: {
            redcode: string
        }[]
    }
}

export interface IHillUpdatedMessage {
    body: {
        id: string
        rules: IRules
        warriors: {
            redcode: string
        }[]
    }
}

export interface IHillCreatedMessage {
    body: {
        id: string
        rules: IRules
    }
}

export interface IDeleteHillMessage {
    body: {
        id: string
    }
}

export interface IHillDeletedMessage {
    body: {
        id: string
    }
}
