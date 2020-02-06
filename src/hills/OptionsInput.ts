import { InputType, Field } from 'type-graphql'
import Options from '@/hills/Options'
import InstructionInput from '@/hills/InstructionInput'

@InputType()
export default class OptionsInput implements Partial<Options> {
    @Field({ nullable: true })
    coresize?: number
    @Field({ nullable: true })
    maximumCycles?: number
    @Field({ nullable: true })
    initialInstruction?: InstructionInput
    @Field({ nullable: true })
    instructionLimit?: number
    @Field({ nullable: true })
    maxTasks?: number
    @Field({ nullable: true })
    minSeparation?: number
    @Field({ nullable: true })
    standard?: number
}
