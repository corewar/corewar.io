import { Warrior } from '@/generated/graphql'
import { MongoRepository } from 'mongtype'
import sanitize from 'mongo-sanitize'

export const getWarriors = async (warriors: MongoRepository<Warrior>, id?: string): Promise<Warrior[]> => {
    if (!!id) {
        return [await warriors.findById(sanitize(id))]
    } else {
        console.log('arg')
        return await warriors.find()
    }
}
