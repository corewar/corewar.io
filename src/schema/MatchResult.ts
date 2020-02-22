import { ObjectType, Field } from 'type-graphql'
import { IMatchResult } from 'corewar'
import MatchWarriorResult from '@/schema/MatchWarriorResult'

@ObjectType()
export default class MatchResult implements IMatchResult {
    @Field()
    rounds!: number
    @Field(_ => [MatchWarriorResult])
    warriors!: MatchWarriorResult[]
}
