import { ObjectType, Field } from 'type-graphql'
import { IToken, TokenCategory } from 'corewar'
import Position from './Position'

@ObjectType()
export default class Token implements IToken {
    @Field()
    category!: TokenCategory
    @Field()
    lexeme!: string
    @Field()
    position!: Position
}
