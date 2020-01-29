export interface IId {
    id: string
}

export interface IRepository {
    getAll<T extends IId>(): Promise<T[]>
    getById<T extends IId>(id: string): Promise<T>
    getOneBy<T extends IId>(filter: any): Promise<T>
    getManyBy<T extends IId>(filter: any): Promise<T[]>
    upsert<T extends IId>(data: T): Promise<T>
    delete(id: string): Promise<void>
}

export default class Repository implements IRepository {
    constructor(collectionName: string) {
        throw Error('Not Implemented')
    }

    getAll<T extends IId>(): Promise<T[]> {
        throw Error('Not implemented')
    }

    getById<T extends IId>(id: string): Promise<T> {
        throw Error('Not implemented')
    }

    getOneBy<T extends IId>(filter: any): Promise<T> {
        throw Error('Not implemented')
    }

    getManyBy<T extends IId>(filter: any): Promise<T[]> {
        throw Error('Not implemented')
    }

    upsert<T extends IId>(data: T): Promise<T> {
        throw Error('Not implemented')
    }

    delete(id: string): Promise<void> {
        throw Error('Not implemented')
    }
}
