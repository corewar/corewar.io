import { IMatchWarriorResult } from 'corewar'
import { ObjectType, Field } from 'type-graphql'
import ParseResult from '@/schema/ParseResult'

@ObjectType()
export default class MatchWarriorResult implements IMatchWarriorResult {
    @Field()
    source!: ParseResult
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
