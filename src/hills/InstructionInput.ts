import { Field, InputType } from 'type-graphql'
import { OpcodeType, ModifierType } from 'corewar'
import Instruction from '@/hills/Instruction'
import OperandInput from '@/hills/OperandInput'

@InputType()
export default class InstructionInput implements Partial<Instruction> {
    @Field()
    address!: number
    @Field()
    opcode!: OpcodeType
    @Field()
    modifier!: ModifierType
    @Field()
    aOperand!: OperandInput
    @Field()
    bOperand!: OperandInput
}
