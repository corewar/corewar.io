import uuid from 'uuid/v1'

export interface IUuidFactory {
    get(): string
}

export default class UuidFactory {
    public get(): string {
        return uuid()
    }
}
