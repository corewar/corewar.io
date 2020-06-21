import { IHillWarriorResult } from 'corewar'
import { ObjectType, Field } from 'type-graphql'
import MatchResult from '@/schema/MatchResult'
import Warrior from './Warrior'

@ObjectType()
export default class HillWarriorResult implements IHillWarriorResult {
    @Field()
    warrior!: Warrior
    @Field()
    rank!: number
    @Field()
    score!: number
    @Field()
    won!: number
    @Field()
    drawn!: number
    @Field()
    lost!: number
    @Field(_ => [MatchResult])
    matches!: MatchResult[]
}
