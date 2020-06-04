import { InputType, Field } from 'type-graphql'
import Instruction from '@/schema/types/Instruction'
import { OpcodeType, ModifierType } from 'corewar'
import OperandInput from './OperandInput'

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
