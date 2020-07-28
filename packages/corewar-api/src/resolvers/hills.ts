import * as repo from 'mongo-repo'
import { getHills } from '../query/hills'
import { Hill } from '@/generated/graphql'

export const hills = {
    Query: {
        hills: (_: unknown, { id }: { id?: string }): Promise<Hill[]> => getHills(repo, id)
    }
}
