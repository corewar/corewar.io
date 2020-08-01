import { Challenge } from '@/generated/graphql'
import { Database } from 'mongo-repo'

export const getChallenges = async (database: Database, id?: string): Promise<Challenge[]> => {
    const challenges = database.repo<Challenge>('challenges')

    if (!!id) {
        return [await challenges.get(id)]
    } else {
        return await challenges.getAll({})
    }
}
