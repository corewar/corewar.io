import { ObjectType, Field } from 'type-graphql'
import { IOptions } from 'corewar'
import Instruction from '@/hills/Instruction'

@ObjectType()
export default class Options implements IOptions {
    @Field({ nullable: true })
    coresize?: number;
    @Field({ nullable: true })
    maximumCycles?: number;
    @Field({ nullable: true })
    initialInstruction?: Instruction;
    @Field({ nullable: true })
    instructionLimit?: number;
    @Field({ nullable: true })
    maxTasks?: number;
    @Field({ nullable: true })
    minSeparation?: number;
    @Field({ nullable: true })
    standard?: number;
}
