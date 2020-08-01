import { getHills } from '../query/hills'
import { Hill, RulesInput, CreateMutationResult } from '@/generated/graphql'
import { getDatabase } from '../infrastructure/getDatabase'
import { handleError } from '@/infrastructure/handleError'
import { createHill } from '@/command/createHill'

export const hills = {
    Query: {
        hills: async (_: unknown, { id }: { id?: string }): Promise<Hill[]> => {
            try {
                return getHills(await getDatabase(), id)
            } catch (e) {
                handleError(e)
            }
        }
    },
    Mutation: {
        createHill: async (
            _: unknown,
            { name, rules }: { name: string; rules: RulesInput }
        ): Promise<CreateMutationResult> => {
            try {
                return createHill(await getDatabase(), name, rules)
            } catch (e) {
                handleError(e)
            }
        }
    }
}
