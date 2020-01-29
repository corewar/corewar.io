import { Resolver, Mutation, Arg, ObjectType, Field, Query, Args } from "type-graphql";
import { Warrior, WarriorInput } from "./Warrior";
import Repository from "../database/Repository";
import uuid from 'uuid/v1'
import { corewar } from "corewar";
import ParseResult from "../parse/ParseResult";

const WARRIOR_COLLECTION = 'warriors'

abstract class MutationResult<T> {
    @Field()
    success!: boolean
    @Field({ nullable: true })
    message?: string
    @Field({ nullable: true })
    result?: T
}

@ObjectType()
class SaveWarriorResult extends MutationResult<Warrior> { }

@ObjectType()
class DeleteWarriorResult extends MutationResult<string> { }

class WarriorArgs {
    id!: string
}

class SaveWarriorArgs {
    warrior!: WarriorInput
}

@Resolver(Warrior)
export class WarriorResolver {
    @Query(returns => Warrior)
    async warrior(@Args() { id }: WarriorArgs): Promise<Warrior> {
        return (new Repository(WARRIOR_COLLECTION)).getById<Warrior>(id)
    }

    @Query(returns => [Warrior])
    async warriors(): Promise<Warrior[]> {
        return (new Repository(WARRIOR_COLLECTION)).getAll<Warrior>()
    }

    @Mutation(returns => SaveWarriorResult)
    async saveWarrior(@Args() { warrior }: SaveWarriorArgs): Promise<SaveWarriorResult> {
        let result = {
            ...warrior,
            parseResult: corewar.parse(warrior.redcode)
        } as Warrior

        if (!!result.parseResult.messages.length) {
            return {
                success: false,
                message: 'Failed to parse warrior',
                result
            }
        }

        if (!warrior.id) {
            warrior.id = uuid()
        }

        try {
            result = await (new Repository(WARRIOR_COLLECTION)).upsert(warrior as Warrior)
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

    @Mutation(returns => DeleteWarriorResult)
    async deleteWarrior(@Args() { id }: WarriorArgs): Promise<DeleteWarriorResult> {
        try {
            await (new Repository(WARRIOR_COLLECTION)).delete(id)

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