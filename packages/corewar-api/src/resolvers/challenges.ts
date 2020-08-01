import { getChallenges } from '../query/challenges'
import { Challenge } from '@/generated/graphql'
import { getDatabase } from '../infrastructure/getDatabase'
import { handleError } from '@/infrastructure/handleError'

export const challenges = {
    Query: {
        challenges: async (_: unknown, { id }: { id?: string }): Promise<Challenge[]> => {
            try {
                return getChallenges(await getDatabase(), id)
            } catch (e) {
                handleError(e)
            }
        }
    }
}
