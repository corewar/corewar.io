import { InputType, Field } from 'type-graphql'
import { ModeType } from 'corewar'
import Operand from '@/hills/Operand'

@InputType()
export default class OperandInput implements Partial<Operand> {
    @Field()
    mode!: ModeType
    @Field()
    address!: number
}
