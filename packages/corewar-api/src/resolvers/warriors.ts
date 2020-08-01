import { CreateMutationResult } from '@/generated/graphql'
import { handleError } from '@/infrastructure/handleError'
import { createWarrior } from '@/command/createWarrior'
import { getDatabase } from '@/infrastructure/getDatabase'

export const warriors = {
    Mutation: {
        createWarrior: async (_: unknown, { redcode }: { redcode: string }): Promise<CreateMutationResult> => {
            try {
                return createWarrior((await getDatabase()), redcode)
            } catch (e) {
                // TODO I think I can make a middleware stack to sit between this function and graphql - is that the done thing?
                handleError(e)
            }
        }
    }
}
