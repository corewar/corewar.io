import { IParseResult } from 'corewar'
import { ObjectType, Field } from 'type-graphql'
import Token from './Token'
import MetaData from './MetaData'
import Message from './Message'
import DataScalar from './DataScalar'

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
