import { MongoRepo } from 'mongo-repo'
import { Hill } from '@/generated/graphql'

export const getHills = async (repo: MongoRepo, id?: string): Promise<Hill[]> => {
    const db = await repo.connectDB(process.env.DB_CONNECTION_STRING)
    const hills = db.repo<Hill>('hills')

    if (!!id) {
        return [await hills.get(id)]
    } else {
        return await hills.getAll({})
    }
}
