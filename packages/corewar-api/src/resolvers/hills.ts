import { getHills } from '../query/hills'
import { Hill } from '@/generated/graphql'
import { getDatabase } from '../infrastructure/getDatabase'
import { handleError } from '@/infrastructure/handleError'

export const hills = {
    Query: {
        hills: async (_: unknown, { id }: { id?: string }): Promise<Hill[]> => {
            try {
                return getHills(await getDatabase(), id)
            } catch (e) {
                handleError(e)
            }
        }
    }
}
