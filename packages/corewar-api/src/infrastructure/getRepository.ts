import { DatabaseClient, MongoRepository } from 'mongtype'

export const getRepository = async <T>(collectionName: string): Promise<MongoRepository<T>> => {
    const client = new DatabaseClient()
    await client.connect(process.env.DB_CONNECTION_STRING)
    return new MongoRepository<T>(client, { name: collectionName })
}
