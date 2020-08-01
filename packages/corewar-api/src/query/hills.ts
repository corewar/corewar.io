import { Hill } from '@/generated/graphql'
import { Database } from 'mongo-repo'

export const getHills = async (database: Database, id?: string): Promise<Hill[]> => {
    const hills = database.repo<Hill>('hills')

    if (!!id) {
        return [await hills.get(id)]
    } else {
        return await hills.getAll({})
    }
}
