import { Resolver, Mutation, ObjectType, Args, ArgsType, Field } from 'type-graphql'
import Hill from '@/hills/Hill'
import Rules from '@/hills/Rules'
import Repository from '@/database/Repository'
import { HILLS_COLLECTION } from '@/constants'
import uuid from 'uuid/v1'
import MutationResult from '@/schema/MutationResult'

@ArgsType()
class CreateHillArgs {
    @Field()
    rules!: Rules
}

@ObjectType()
class CreateHillResult extends MutationResult<Hill> {
    @Field()
    result?: Hill
}

@Resolver(Hill)
export default class HillResolver {
    @Mutation(() => CreateHillResult)
    async createHill(@Args() { rules }: CreateHillArgs): Promise<CreateHillResult> {
        try {
            const result = await (new Repository(HILLS_COLLECTION)).upsert({
                id: uuid(),
                rules
            })

            return {
                success: true,
                result
            }
        } catch (e) {
            return {
                success: false,
                message: e
            }
        }
    }
}
