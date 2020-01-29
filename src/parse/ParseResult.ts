import { IParseResult } from 'corewar'
import { ObjectType, Field } from 'type-graphql'
import Token from '@/parse/Token'
import MetaData from '@/parse/MetaData'
import Message from '@/parse/Message'
import DataScalar from '@/parse/DataScalar'

@ObjectType()
export default class ParseResult implements IParseResult {
    @Field()
    metaData!: MetaData
    @Field(() => [Token])
    tokens!: Token[]
    @Field(() => [Message])
    messages!: Message[]
    @Field(() => DataScalar, { nullable: true })
    data?: any
}
