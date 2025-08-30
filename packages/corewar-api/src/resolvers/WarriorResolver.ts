import MutationResult from '@/resolvers/MutationResult'
import Warrior from '@/schema/Warrior'
import { IWarriorService, buildWarriorService } from '@/services/WarriorService'
import { Args, ArgsType, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql'

@InputType()
class WarriorInput {
    @Field({ nullable: true })
    id?: string
    @Field()
    redcode!: string
}

@ArgsType()
class WarriorArgs {
    @Field()
    id!: string
}

@ArgsType()
class SaveWarriorArgs {
    @Field()
    warrior!: WarriorInput
}

@ObjectType()
class SaveWarriorResult extends MutationResult<Warrior> {
    @Field({ nullable: true })
    result?: Warrior
}

@ObjectType()
class DeleteWarriorResult extends MutationResult<string> {
    @Field({ nullable: true })
    result?: string
}

@Resolver(Warrior)
export default class WarriorResolver {
    private getService(): IWarriorService {
        return buildWarriorService()
    }

    @Query(() => Warrior)
    async warrior(@Args() { id }: WarriorArgs): Promise<Warrior> {
        return this.getService().getById(id)
    }

    @Query(() => [Warrior])
    async warriors(): Promise<Warrior[]> {
        return this.getService().getAll()
    }

    @Mutation(() => SaveWarriorResult)
    async saveWarrior(@Args() { warrior }: SaveWarriorArgs): Promise<SaveWarriorResult> {
        try {
            return {
                success: true,
                result: await this.getService().saveWarrior(warrior.redcode, warrior.id)
            }
        } catch (e) {
            return {
                success: false,
                message: e instanceof Error ? e.message : String(e)
            }
        }
    }

    @Mutation(() => DeleteWarriorResult)
    async deleteWarrior(@Args() { id }: WarriorArgs): Promise<DeleteWarriorResult> {
        try {
            return {
                success: true,
                result: await this.getService().deleteWarrior(id)
            }
        } catch (e) {
            return {
                success: false,
                message: e instanceof Error ? e.message : String(e)
            }
        }
    }
}
