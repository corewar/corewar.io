import { getHills } from '../query/hills'
import { Hill } from '@/generated/graphql'
import { getDatabase } from './getDatabase'

export const hills = {
    Query: {
        hills: async (_: unknown, { id }: { id?: string }): Promise<Hill[]> => getHills(await getDatabase(), id)
    }
}
