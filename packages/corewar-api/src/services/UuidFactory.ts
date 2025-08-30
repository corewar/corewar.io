import { v1 as uuid } from 'uuid'

export interface IUuidFactory {
    get(): string
}

export default class UuidFactory {
    public get(): string {
        return uuid()
    }
}
