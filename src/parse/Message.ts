import { ObjectType, Field } from 'type-graphql'
import { IMessage, MessageType } from 'corewar'
import { Position } from './Position'

@ObjectType()
export class Message implements IMessage {
    @Field()
    type!: MessageType
    @Field()
    position!: Position
    @Field()
    text!: string
}
