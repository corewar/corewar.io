import { Resolver, Mutation, ObjectType, Args, ArgsType, Field, Query } from 'type-graphql'
import Hill from '@/hills/Hill'
import Rules from '@/hills/Rules'
import Repository from '@/database/Repository'
import { HILLS_COLLECTION as HILL_COLLECTION } from '@/constants'
import uuid from 'uuid/v1'
import MutationResult from '@/schema/MutationResult'

@ArgsType()
class HillArgs {
    id!: string
}

@ArgsType()
class CreateHillArgs {
    rules!: Rules
}

@ObjectType()
class CreateHillResult extends MutationResult<Hill> {
    @Field()
    result?: Hill
}

@ObjectType()
class DeleteHillResult extends MutationResult<string> { 
    @Field({ nullable: true })
    result?: string
}

@Resolver(Hill)
export default class HillResolver {
    @Query(() => Hill)
    async hill(@Args() { id }: HillArgs): Promise<Hill> {
        return (new Repository(HILL_COLLECTION)).getById<Hill>(id)
    }

    @Query(() => [Hill])
    async hills(): Promise<Hill[]> {
        return (new Repository(HILL_COLLECTION)).getAll<Hill>()
    }

    @Mutation(() => CreateHillResult)
    async createHill(@Args() { rules }: CreateHillArgs): Promise<CreateHillResult> {
        try {
            const result = await (new Repository(HILL_COLLECTION)).upsert({
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

    @Mutation(() => DeleteHillResult)
    async deleteHill(@Args() { id }: HillArgs): Promise<DeleteHillResult> {
        try {
            await (new Repository(HILL_COLLECTION)).delete(id)

            return {
                success: true,
                result: id
            }
        } catch (e) {
            return {
                success: false,
                message: e
            }
        }
    }
}
