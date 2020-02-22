import { ObjectType, Field } from 'type-graphql'
import { IOperand, ModeType } from 'corewar'

@ObjectType()
export default class Operand implements IOperand {
    @Field()
    mode!: ModeType
    @Field()
    address!: number
}
