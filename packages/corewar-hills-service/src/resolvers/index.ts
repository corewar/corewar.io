import { Resolver, Query, Args, Mutation } from 'type-graphql'
import uuid from 'uuid/v1'
import Hill from '@/schema/types/Hill'
import Repository from '@/repositories/Repository'
import { buildRepository } from '@/repositories/buildRepository'
import HillArgs from './HillArgs'
import MutationResult from './MutationResult'
import CreateHillArgs from './CreateHillArgs'
import ChallengeHillArgs from './ChallengeHillArgs'
import { queueMessage } from '@/bus'

const HILL_CHALLENGE_QUEUE = 'hill-challenge'

@Resolver(Hill)
export default class HillResolver {
    private getRepository(): Repository {
        return buildRepository('hills')
    }

    @Query(() => Hill)
    async hill(@Args() { id }: HillArgs): Promise<Hill> {
        return this.getRepository().getById(id)
    }

    @Query(() => [Hill])
    async hills(): Promise<Hill[]> {
        return this.getRepository().getAll()
    }

    @Mutation(() => MutationResult)
    async createHill(@Args() { rules }: CreateHillArgs): Promise<MutationResult> {
        try {
            await this.getRepository().upsert({
                id: uuid(),
                rules,
                warriors: []
            })

            return {
                success: true
            }
        } catch (e) {
            return {
                success: false,
                message: e.message
            }
        }
    }

    @Mutation(() => MutationResult)
    async deleteHill(@Args() { id }: HillArgs): Promise<MutationResult> {
        try {
            await this.getRepository().delete(id)

            return {
                success: true
            }
        } catch (e) {
            return {
                success: false,
                message: e.message
            }
        }
    }

    @Mutation(() => MutationResult)
    async challengeHill(@Args() { hillId, warriorRedcode }: ChallengeHillArgs): Promise<MutationResult> {
        try {
            const repo = this.getRepository()

            const hill = await repo.getById<Hill>(hillId)
            if (!hill) {
                throw Error(`No hill found with id '${hillId}'`)
            }

            hill.warriors.push({
                id: uuid(),
                redcode: warriorRedcode
            })
            await repo.upsert(hill)

            //TODO push message onto message bus
            queueMessage(HILL_CHALLENGE_QUEUE, {
                body: {
                    ...hill
                }
            })

            return {
                success: true
            }
        } catch (e) {
            return {
                success: false,
                message: e.message
            }
        }
    }
}
