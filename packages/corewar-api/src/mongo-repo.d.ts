declare module 'mongo-repo' {
    import { FilterQuery, ObjectID } from 'mongodb'

    export interface DocumentWithId {
        _id: string
    }

    export interface Repo<T> {
        get: (document: ObjectID | string | T & DocumentWithId) => Promise<T>
        project: <TProjection>(document: ObjectID | string | T & DocumentWithId, projection: unknown) => Promise<TProjection>
        add: (document: T) => Promise<T | T[]>
        addOrUpdate: (document: T) => Promise<ObjectID>
        update: (document: T & DocumentWithId) => Promise<ObjectID>
        remove: (document: ObjectID | string | T & DocumentWithId) => Promise<boolean>

        getOne: (criteria: FilterQuery<T>) => Promise<T>
        projectOne: <TProjection>(criteria: FilterQuery<T>, projection: unknown) => Promise<TProjection>
        addOrUpdateOne: (criteria: FilterQuery<T>, document: T) => Promise<ObjectID>
        updateOne: (criteria: FilterQuery<T>, document: Partial<T>) => Promise<ObjectID>
        removeOne: (criteria: FilterQuery<T>) => Promise<boolean>

        getAll: (criteria: FilterQuery<T>, sort?: unknown, skip?: number, take?: number) => Promise<T[]>
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
        repo: <T>(collectionName: string) => Repo<T>
    }

    export interface MongoRepo {
        connectDB: (connectionString: string) => Promise<Database>
    }

    const mongoRepo: MongoRepo
    export default mongoRepo
}
