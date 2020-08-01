import { Hill } from '@/generated/graphql'
import { MongoRepository } from 'mongtype'
import sanitize from 'mongo-sanitize'

export const getHills = async (hills: MongoRepository<Hill>, id?: string): Promise<Hill[]> => {
    if (!!id) {
        return [await hills.findById(sanitize(id))]
    } else {
        return await hills.find()
    }
}
