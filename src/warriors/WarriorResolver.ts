import { Resolver, Mutation, ObjectType, Query, Args } from 'type-graphql'
import { Warrior } from './Warrior'
import Repository from '../database/Repository'
import uuid from 'uuid/v1'
import { corewar } from 'corewar'
import { WarriorInput } from './WarriorInput'
import { MutationResult } from '../schema/MutationResult'

const WARRIOR_COLLECTION = 'warriors'

class WarriorArgs {
    id!: string
}

class SaveWarriorArgs {
    warrior!: WarriorInput
}

@ObjectType()
class SaveWarriorResult extends MutationResult<Warrior> { }

@ObjectType()
class DeleteWarriorResult extends MutationResult<string> { }

@Resolver(Warrior)
export class WarriorResolver {
    @Query(() => Warrior)
    async warrior(@Args() { id }: WarriorArgs): Promise<Warrior> {
        return (new Repository(WARRIOR_COLLECTION)).getById<Warrior>(id)
    }

    @Query(() => [Warrior])
    async warriors(): Promise<Warrior[]> {
        return (new Repository(WARRIOR_COLLECTION)).getAll<Warrior>()
    }

    @Mutation(() => SaveWarriorResult)
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

    @Mutation(() => DeleteWarriorResult)
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