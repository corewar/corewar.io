import { IRules } from 'corewar'

export enum ChallengeStatusType {
    Busy = 'busy',
    Ready = 'ready'
}

export default interface IHill {
    id: string
    status: ChallengeStatusType
    rules: IRules
    warriors?: {
        redcode: string
    }[]
}
