import ParseResult from '@/schema/ParseResult'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class Warrior {
    @Field()
    id!: string
    @Field()
    redcode!: string
    @Field()
    parseResult!: ParseResult
}
