import MutationResult from '@/resolvers/MutationResult'
import Hill from '@/schema/Hill'
import Rules from '@/schema/HillRules'
import Instruction from '@/schema/Instruction'
import Operand from '@/schema/Operand'
import Options from '@/schema/Options'
import { IHillService, buildHillService } from '@/services/HillService'
import { ModeType, ModifierType, OpcodeType } from 'corewar'
import { Args, ArgsType, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql'

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
    size!: number
    @Field()
    options!: OptionsInput
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

@ArgsType()
class ChallengeHillArgs {
    @Field()
    warriorId!: string
    @Field()
    hillId!: string
}

@ObjectType()
class ChallengeHillResult extends MutationResult<Hill> {
    @Field({ nullable: true })
    result?: Hill
}

@Resolver(Hill)
export default class HillResolver {
    private getService(): IHillService {
        return buildHillService()
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
                message: e instanceof Error ? e.message : String(e)
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
                message: e instanceof Error ? e.message : String(e)
            }
        }
    }

    @Mutation(() => ChallengeHillResult)
    async challengeHill(@Args() { hillId, warriorId }: ChallengeHillArgs): Promise<ChallengeHillResult> {
        try {
            return {
                success: true,
                result: await this.getService().challengeHill(hillId, warriorId)
            }
        } catch (e) {
            return {
                success: false,
                message: e instanceof Error ? e.message : String(e)
            }
        }
    }
}
