﻿import { IDecoder } from './interface/IDecoder'
import { IExecutive } from './interface/IExecutive'
import { IOperand, ModeType } from './interface/IOperand'
import { ITask } from './interface/ITask'
import { ICore } from './interface/ICore'
import { IExecutionContext, IOperandPair } from './interface/IExecutionContext'
import { IInstruction, ModifierType } from './interface/IInstruction'
import clone from 'clone'

export class Decoder implements IDecoder {
    private executive: IExecutive

    private deferredSets = []

    private modeTable: { [mode: string]: (task: ITask, ip: number, operand: IOperand, core: ICore) => IInstruction } = {
        [ModeType.Immediate]: this.immediate, // #
        [ModeType.Direct]: this.direct, // $
        [ModeType.AIndirect]: this.aIndirect, // *
        [ModeType.BIndirect]: this.bIndirect, // @
        [ModeType.APreDecrement]: this.aPreDecrement, // {
        [ModeType.BPreDecrement]: this.bPreDecrement, // <
        [ModeType.APostIncrement]: this.aPostIncrement, // }
        [ModeType.BPostIncrement]: this.bPostIncrement // >
    }

    constructor(executive: IExecutive) {
        this.executive = executive
    }

    public decode(context: IExecutionContext): IExecutionContext {
        const aAccessor = this.modeTable[context.instruction.aOperand.mode]
        const bAccessor = this.modeTable[context.instruction.bOperand.mode]

        this.deferredSets = []

        context.aInstruction = aAccessor.apply(this, [
            context.task,
            context.instructionPointer,
            context.instruction.aOperand,
            context.core
        ])

        context.bInstruction = bAccessor.apply(this, [
            context.task,
            context.instructionPointer,
            context.instruction.bOperand,
            context.core
        ])

        context.command = this.executive.commandTable[context.instruction.opcode]

        context.operands = this.decodeModifier(context)

        //HACK only write to core as a result of decoding AFTER all decoding has finished
        // in order to emulate PMARS
        this.deferredSets.forEach(ds => {
            context.core.setAt(context.task, ds.address, ds.instruction)
        })

        return context
    }

    private decodeModifier(context: IExecutionContext): IOperandPair[] {
        switch (context.instruction.modifier) {
            case ModifierType.A:
                return [
                    {
                        source: context.aInstruction.aOperand,
                        destination: context.bInstruction.aOperand
                    }
                ]
            case ModifierType.B:
                return [
                    {
                        source: context.aInstruction.bOperand,
                        destination: context.bInstruction.bOperand
                    }
                ]
            case ModifierType.AB:
                return [
                    {
                        source: context.aInstruction.aOperand,
                        destination: context.bInstruction.bOperand
                    }
                ]
            case ModifierType.BA:
                return [
                    {
                        source: context.aInstruction.bOperand,
                        destination: context.bInstruction.aOperand
                    }
                ]
            case ModifierType.F:
                return [
                    {
                        source: context.aInstruction.aOperand,
                        destination: context.bInstruction.aOperand
                    },
                    {
                        source: context.aInstruction.bOperand,
                        destination: context.bInstruction.bOperand
                    }
                ]
            case ModifierType.X:
                return [
                    {
                        source: context.aInstruction.aOperand,
                        destination: context.bInstruction.bOperand
                    },
                    {
                        source: context.aInstruction.bOperand,
                        destination: context.bInstruction.aOperand
                    }
                ]
            case ModifierType.I:
                return [
                    {
                        source: context.aInstruction.aOperand,
                        destination: context.bInstruction.aOperand
                    },
                    {
                        source: context.aInstruction.bOperand,
                        destination: context.bInstruction.bOperand
                    }
                ]
            default:
                throw 'Unknown modifier: ' + context.instruction.modifier
        }
    }

    private immediate(_: ITask, ip: number, __: IOperand, core: ICore): IInstruction {
        const address = ip

        return clone(core.getAt(address))
    }

    private direct(_: ITask, ip: number, operand: IOperand, core: ICore): IInstruction {
        const address = ip + operand.address

        return clone(core.getAt(address))
    }

    private aIndirect(task: ITask, ip: number, operand: IOperand, core: ICore): IInstruction {
        const ipa = ip + operand.address

        const address = ipa + core.readAt(task, ipa).aOperand.address

        return clone(core.getAt(address))
    }

    private bIndirect(task: ITask, ip: number, operand: IOperand, core: ICore): IInstruction {
        const ipa = ip + operand.address

        const address = ipa + core.readAt(task, ipa).bOperand.address

        return clone(core.getAt(address))
    }

    private aPreDecrement(task: ITask, ip: number, operand: IOperand, core: ICore): IInstruction {
        const ipa = ip + operand.address

        const instruction = clone(core.readAt(task, ipa))

        let value = instruction.aOperand.address

        const address = ipa + --value

        instruction.aOperand.address = core.wrap(value)

        this.deferredSets.push({
            address: ipa,
            instruction
        })

        return clone(core.getAt(address))
    }

    private bPreDecrement(task: ITask, ip: number, operand: IOperand, core: ICore): IInstruction {
        const ipa = ip + operand.address

        const instruction = core.readAt(task, ipa)

        let value = instruction.bOperand.address

        const address = ipa + --value

        instruction.bOperand.address = core.wrap(value)

        this.deferredSets.push({
            address: ipa,
            instruction
        })

        return clone(core.getAt(address))
    }

    private aPostIncrement(task: ITask, ip: number, operand: IOperand, core: ICore): IInstruction {
        const ipa = ip + operand.address

        const instruction = core.readAt(task, ipa)

        let value = instruction.aOperand.address

        const address = ipa + value++

        const result = clone(core.getAt(address))

        instruction.aOperand.address = core.wrap(value)

        this.deferredSets.push({
            address: ipa,
            instruction
        })

        return result
    }

    private bPostIncrement(task: ITask, ip: number, operand: IOperand, core: ICore): IInstruction {
        const ipa = ip + operand.address

        const instruction = core.readAt(task, ipa)

        let value = instruction.bOperand.address

        const address = ipa + value++

        const result = clone(core.getAt(address))

        instruction.bOperand.address = core.wrap(value)

        this.deferredSets.push({
            address: ipa,
            instruction
        })

        return result
    }
}
