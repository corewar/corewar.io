import { Resolver, Mutation, Arg, ObjectType, Field } from "type-graphql";
import { Warrior, WarriorInput } from "./Warrior";
import { DataScalar } from '../parse/ParseResult'
import Repository, { IId } from "../database/Repository";
import uuid from 'uuid/v1'
import { corewar } from "corewar";

@ObjectType()
class SaveWarriorResult {
    @Field()
    success!: boolean
    @Field({ nullable: true })
    message?: string
    @Field(type => DataScalar, { nullable: true })
    result?: Warrior
}

@Resolver(Warrior)
export class WarriorResolver {
    @Mutation()
    async saveWarrior(@Arg('warrior') warrior: WarriorInput) {
        let result = {
            ...warrior,
            parseResult: corewar.parse(warrior.redcode)
        } as Warrior

        if (!!result.parseResult.messages.length) {
            return {
                success: false,
                message: 'Failed to parse warrior',
                result
            } as SaveWarriorResult
        }

        if (!warrior.id) {
            warrior.id = uuid()
        }
        
        result = await Repository.upsert(warrior as Warrior)
        return {
            success: true,
            result
        } as SaveWarriorResult
    }
}