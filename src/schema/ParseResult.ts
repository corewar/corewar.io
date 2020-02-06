import { IParseResult } from 'corewar'
import { ObjectType, Field } from 'type-graphql'
import Token from '@/schema/Token'
import MetaData from '@/schema/MetaData'
import Message from '@/schema/Message'
import DataScalar from '@/schema/DataScalar'

@ObjectType()
export default class ParseResult implements IParseResult {
    @Field()
    metaData!: MetaData
    @Field(() => [Token])
    tokens!: Token[]
    @Field()
    success!: boolean
    @Field(() => [Message])
    messages!: Message[]
    @Field(() => DataScalar, { nullable: true })
    data?: any
}
