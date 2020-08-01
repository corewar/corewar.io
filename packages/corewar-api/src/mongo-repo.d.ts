declare module 'mongo-repo' {
    import { FilterQuery, ObjectID } from 'mongodb'

    interface DocumentWithId {
        _id: string
    }

    export interface Repository<T> {
        get: (document: ObjectID | string | T & DocumentWithId) => Promise<T & DocumentWithId>
        project: <TProjection>(document: ObjectID | string | T & DocumentWithId, projection: unknown) => Promise<TProjection>
        add: (document: T) => Promise<T & DocumentWithId | (T & DocumentWithId)[]>
        addOrUpdate: (document: T) => Promise<ObjectID>
        update: (document: T & DocumentWithId) => Promise<ObjectID>
        remove: (document: ObjectID | string | T & DocumentWithId) => Promise<boolean>

        getOne: (criteria: FilterQuery<T>) => Promise<T & DocumentWithId>
        projectOne: <TProjection>(criteria: FilterQuery<T>, projection: unknown) => Promise<TProjection>
        addOrUpdateOne: (criteria: FilterQuery<T>, document: T) => Promise<ObjectID>
        updateOne: (criteria: FilterQuery<T>, document: Partial<T>) => Promise<ObjectID>
        removeOne: (criteria: FilterQuery<T>) => Promise<boolean>

        getAll: (criteria: FilterQuery<T>, sort?: unknown, skip?: number, take?: number) => Promise<(T & DocumentWithId)[]>
        projectAll: <TProjection>(
            criteria: FilterQuery<T>,
            projection: unknown,
            sort?: unknown,
            skip?: number,
            take?: number
        ) => Promise<TProjection[]>
        addOrUpdateAll: (criteria: FilterQuery<T>, document: Partial<T>) => Promise<ObjectID[]>
        updateAll: (criteria: FilterQuery<T>, document: Partial<T>) => Promise<ObjectID[]>
        removeAll: (criteria?: FilterQuery<T>) => Promise<boolean[]>

        count: (criteria?: FilterQuery<T>) => Promise<number>
    }

    export interface Database {
        repo: <T>(collectionName: string) => Repository<T>
    }

    export function connectDB(connectionString: string): Promise<Database>
}
