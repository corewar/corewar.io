import { getChallenges } from '../query/challenges'
import { Challenge } from '@/generated/graphql'
import { handleError } from '@/infrastructure/handleError'
import { getRepository } from '@/infrastructure/getRepository'

export const challenges = {
    Query: {
        challenges: async (_: unknown, { id }: { id?: string }): Promise<Challenge[]> => {
            try {
                return getChallenges(await getRepository('challenges'), id)
            } catch (e) {
                handleError(e)
            }
        }
    },
    Mutation: {},
    Subscription: {}
}
