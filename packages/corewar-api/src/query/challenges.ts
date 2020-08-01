import { Challenge } from '@/generated/graphql'
import { MongoRepository } from 'mongtype'
import sanitize from 'mongo-sanitize'

export const getChallenges = async (challenges: MongoRepository<Challenge>, id?: string): Promise<Challenge[]> => {
    if (!!id) {
        return [await challenges.findById(sanitize(id))]
    } else {
        return await challenges.find()
    }
}
