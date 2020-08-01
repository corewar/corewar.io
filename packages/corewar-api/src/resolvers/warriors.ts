import { CreateMutationResult, Warrior } from '@/generated/graphql'
import { handleError } from '@/infrastructure/handleError'
import { createWarrior } from '@/command/createWarrior'
import { getRepository } from '@/infrastructure/getRepository'
import { getWarriors } from '@/query/warriors'

export const warriors = {
    Query: {
        warriors: async (_: unknown, { id }: { id?: string }): Promise<Warrior[]> => {
            try {
                return getWarriors(await getRepository('warriors'), id)
            } catch (e) {
                handleError(e)
            }
        }
    },
    Mutation: {
        createWarrior: async (_: unknown, { redcode }: { redcode: string }): Promise<CreateMutationResult> => {
            try {
                return createWarrior(await getRepository('warriors'), redcode)
            } catch (e) {
                handleError(e)
            }
        }
    },
    Subscription: {}
}
