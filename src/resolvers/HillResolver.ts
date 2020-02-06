import { Resolver, Mutation, ObjectType, Args, ArgsType, Field, Query, InputType } from 'type-graphql'
import Hill from '@/schema/Hill'
import Repository from '@/database/Repository'
import { HILLS_COLLECTION as HILL_COLLECTION } from '@/constants'
import uuid from 'uuid/v1'
import MutationResult from '@/resolvers/MutationResult'
import Rules from '@/schema/Rules'
import Operand from '@/schema/Operand'
import { ModeType, OpcodeType, ModifierType } from 'corewar'
import Instruction from '@/schema/Instruction'
import Options from '@/schema/Options'
import HillService, { IHillService } from '@/services/HillService'

@InputType()
export class OptionsInput implements Partial<Options> {
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

@InputType()
export class RulesInput implements Partial<Rules> {
    @Field()
    rounds!: number
    @Field()
    options!: OptionsInput
}

@InputType()
export class OperandInput implements Partial<Operand> {
    @Field()
    mode!: ModeType
    @Field()
    address!: number
}

@InputType()
export class InstructionInput implements Partial<Instruction> {
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

@ArgsType()
class HillArgs {
    @Field()
    id!: string
}

@ArgsType()
class CreateHillArgs {
    @Field()
    rules!: RulesInput
}

@ObjectType()
class CreateHillResult extends MutationResult<Hill> {
    @Field()
    result?: Hill
}

@ObjectType()
class DeleteHillResult extends MutationResult<string> {
    @Field({ nullable: true })
    result?: string
}

@Resolver(Hill)
export default class HillResolver {

    private getService(): IHillService {
        return new HillService(
            new Repository(HILL_COLLECTION)
        )
    }

    @Query(() => Hill)
    async hill(@Args() { id }: HillArgs): Promise<Hill> {
        return this.getService().getById(id)
    }

    @Query(() => [Hill])
    async hills(): Promise<Hill[]> {
        return this.getService().getAll()
    }

    @Mutation(() => CreateHillResult)
    async createHill(@Args() { rules }: CreateHillArgs): Promise<CreateHillResult> {
        try {
            return {
                success: true,
                result: await this.getService().createHill(rules)
            }
        } catch (e) {
            return {
                success: false,
                message: e
            }
        }
    }

    @Mutation(() => DeleteHillResult)
    async deleteHill(@Args() { id }: HillArgs): Promise<DeleteHillResult> {
        try {
            return {
                success: true,
                result: await this.getService().deleteHill(id)
            }
        } catch (e) {
            return {
                success: false,
                message: e
            }
        }
    }
}
