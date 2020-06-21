import ParseResult from '@/schema/ParseResult'
import { Field, ObjectType } from 'type-graphql'
import { IWarrior } from 'corewar'

@ObjectType()
export default class Warrior implements Partial<IWarrior> {
    @Field()
    id!: string
    @Field()
    redcode!: string
    @Field()
    source!: ParseResult
}
