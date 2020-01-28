import { IParseResult, IMetaData, IToken, IMessage, TokenCategory, IPosition, MessageType } from 'corewar'
import { ObjectType, Field, Int } from 'type-graphql'
import { GraphQLScalarType } from 'graphql'

@ObjectType()
export class MetaData implements IMetaData {
    @Field()
    author!: string
    @Field()
    name!: string
    @Field()
    strategy!: string
}

@ObjectType()
export class Position implements IPosition {
    @Field(type => Int)
    char!: number
    @Field(type => Int)
    line!: number
}

@ObjectType()
export class Token implements IToken {
    @Field()
    category!: TokenCategory
    @Field()
    lexeme!: string
    @Field()
    position!: Position
}

@ObjectType()
export class Message implements IMessage {
    @Field()
    type!: MessageType
    @Field()
    position!: Position
    @Field()
    text!: string
}

export const DataScalar = new GraphQLScalarType({
    name: "Data",
    description: "Any data",
    parseValue(value: any) {
        return value;
    },
    serialize(value: any) {
        return value;
    },
    parseLiteral(ast) {
        return ast
    }
});

@ObjectType()
export default class ParseResult implements IParseResult {
    @Field()
    metaData!: MetaData
    @Field(type => [Token])
    tokens!: Token[]
    @Field(type => [Message])
    messages!: Message[]
    @Field(type => DataScalar, { nullable: true })
    data?: any
}