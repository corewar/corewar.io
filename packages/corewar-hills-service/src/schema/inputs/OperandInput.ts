import { InputType, Field } from 'type-graphql'
import Operand from '@/schema/types/Operand'
import { ModeType } from 'corewar'

@InputType()
export default class OperandInput implements Partial<Operand> {
    @Field()
    mode!: ModeType
    @Field()
    address!: number
}
