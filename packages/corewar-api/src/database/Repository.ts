import { DATABASE_NAME, MONGO_URL } from '@/constants'
import IId from '@/schema/IId'
import { Filter, MongoClient } from 'mongodb'

export interface IRepository {
    getAll<T extends IId>(): Promise<T[]>
    getById<T extends IId>(id: string): Promise<T>
    /* eslint-disable-next-line */
    getOneBy<T extends IId>(filter: Filter<any>): Promise<T>
    /* eslint-disable-next-line */
    getManyBy<T extends IId>(filter: Filter<any>): Promise<T[]>
    upsert<T extends IId>(data: T): Promise<void>
    delete(id: string): Promise<void>
}

export default class Repository implements IRepository {
    private collectionName: string

    constructor(collectionName: string) {
        this.collectionName = collectionName
    }

    private async getClient(): Promise<MongoClient> {
        const client = new MongoClient(MONGO_URL)
        await client.connect()
        return client
    }

    async getAll<T extends IId>(): Promise<T[]> {
        const client = await this.getClient()
        try {
            const database = client.db(DATABASE_NAME)
            const collection = database.collection(this.collectionName)

            return (await collection.find().toArray()) as unknown as T[]
        } finally {
            client.close()
        }
    }

    async getById<T extends IId>(id: string): Promise<T> {
        const client = await this.getClient()
        try {
            const database = client.db(DATABASE_NAME)
            const collection = database.collection(this.collectionName)

            return (await collection.findOne({ id })) as unknown as T
        } finally {
            client.close()
        }
    }

    /* eslint-disable-next-line */
    async getOneBy<T extends IId>(filter: Filter<any>): Promise<T> {
        const client = await this.getClient()
        try {
            const database = client.db(DATABASE_NAME)
            const collection = database.collection(this.collectionName)

            return (await collection.findOne(filter)) as unknown as T
        } finally {
            client.close()
        }
    }

    /* eslint-disable-next-line */
    async getManyBy<T extends IId>(filter: Filter<any>): Promise<T[]> {
        const client = await this.getClient()
        try {
            const database = client.db(DATABASE_NAME)
            const collection = database.collection(this.collectionName)

            return (await collection.find(filter).toArray()) as unknown as T[]
        } finally {
            client.close()
        }
    }

    async upsert<T extends IId>(data: T): Promise<void> {
        const client = await this.getClient()
        try {
            const database = client.db(DATABASE_NAME)
            const collection = database.collection(this.collectionName)

            const existing = await collection.findOne({ id: data.id })
            if (!existing) {
                await collection.insertOne(data)
            } else {
                await collection.updateOne({ id: data.id }, { $set: data })
            }
        } finally {
            client.close()
        }
    }

    async delete(id: string): Promise<void> {
        const client = await this.getClient()
        try {
            const database = client.db(DATABASE_NAME)
            const collection = database.collection(this.collectionName)

            await collection.deleteOne({ id })
        } finally {
            client.close()
        }
    }
}
