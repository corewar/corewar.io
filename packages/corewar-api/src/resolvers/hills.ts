import { getHills } from '../query/hills'
import { Hill, RulesInput, CreateMutationResult, MutationResult } from '@/generated/graphql'
import { getDatabase } from '../infrastructure/getDatabase'
import { handleError } from '@/infrastructure/handleError'
import { createHill } from '@/command/createHill'
import { renameHill } from '@/command/renameHill'

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
        },
        renameHill: async (_: unknown, { id, name }: { id: string; name: string }): Promise<MutationResult> => {
            try {
                return renameHill(await getDatabase(), id, name)
            } catch (e) {
                handleError(e)
            }
        }
    }
}
