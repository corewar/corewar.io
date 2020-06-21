import { ObjectType, Field } from 'type-graphql'
import { IInstruction, OpcodeType, ModifierType } from 'corewar'
import Operand from '@/schema/Operand'

@ObjectType()
export default class Instruction implements IInstruction {
    @Field()
    address!: number
    @Field()
    opcode!: OpcodeType
    @Field()
    modifier!: ModifierType
    @Field()
    aOperand!: Operand
    @Field()
    bOperand!: Operand
}
