import { IMatchWarriorResult } from 'corewar'
import { ObjectType, Field } from 'type-graphql'
import Warrior from './Warrior'

@ObjectType()
export default class MatchWarriorResult implements IMatchWarriorResult {
    @Field()
    warrior!: Warrior
    @Field()
    won!: number
    @Field()
    drawn!: number
    @Field()
    lost!: number
    @Field()
    given!: number
    @Field()
    taken!: number
}
