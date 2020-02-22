import { IHillWarriorResult } from 'corewar'
import { ObjectType, Field } from 'type-graphql'
import ParseResult from '@/schema/ParseResult'
import MatchResult from '@/schema/MatchResult'

@ObjectType()
export default class HillWarriorResult implements IHillWarriorResult {
    @Field()
    source!: ParseResult
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
