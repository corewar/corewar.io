import { IExecutive } from '@simulator/interface/IExecutive'
import { IExecutionContext } from '@simulator/interface/IExecutionContext'
import { ModifierType, OpcodeType } from '@simulator/interface/IInstruction'
import { IOptions } from '@simulator/interface/IOptions'
import { MessageType } from '@simulator/interface/IMessage'
import { IPublisher } from '@simulator/interface/IPublisher'
import { IWarriorInstance } from '@simulator/interface/IWarriorInstance'

export class Executive implements IExecutive {
    public commandTable: { [opcode: string]: (context: IExecutionContext) => void } = {
        [OpcodeType.DAT]: this.dat,
        [OpcodeType.MOV]: this.mov,
        [OpcodeType.ADD]: this.add,
        [OpcodeType.SUB]: this.sub,
        [OpcodeType.MUL]: this.mul,
        [OpcodeType.DIV]: this.div,
        [OpcodeType.MOD]: this.mod,
        [OpcodeType.JMP]: this.jmp,
        [OpcodeType.JMZ]: this.jmz,
        [OpcodeType.JMN]: this.jmn,
        [OpcodeType.DJN]: this.djn,
        [OpcodeType.CMP]: this.seq,
        [OpcodeType.SEQ]: this.seq,
        [OpcodeType.SNE]: this.sne,
        [OpcodeType.SLT]: this.slt,
        [OpcodeType.SPL]: this.spl,
        [OpcodeType.NOP]: this.nop
    }

    private publisher: IPublisher

    constructor(publisher: IPublisher) {
        this.publisher = publisher
    }

    private maxTasks: number

    public initialise(options: IOptions): void {
        this.maxTasks = options.maxTasks
    }

    private publishTaskCount(instance: IWarriorInstance, taskCount: number): void {
        const payload = {
            warriorId: instance.warrior.internalId,
            taskCount
        }
        if (instance.warrior.data) {
            payload['warriorData'] = instance.warrior.data
        }

        this.publisher.queue({
            type: MessageType.TaskCount,
            payload
        })

        if (taskCount === 0) {
            this.publisher.queue({
                type: MessageType.WarriorDead,
                payload
            })
        }
    }

    private dat(context: IExecutionContext): void {
        //Remove current task from the queue
        const ti = context.taskIndex
        context.instance.tasks.splice(ti, 1)
        // wrap the warrior task index to cater for the event when
        // we just chomped off the last task
        context.instance.taskIndex = ti % context.instance.tasks.length

        this.publishTaskCount(context.instance, context.instance.tasks.length)
    }

    private mov(context: IExecutionContext): void {
        if (context.instruction.modifier === ModifierType.I) {
            context.aInstruction.address = context.bInstruction.address
            context.core.setAt(context.task, context.bInstruction.address, context.aInstruction)
            return
        }

        context.operands.forEach(p => {
            p.destination.address = p.source.address
        })
        context.core.setAt(context.task, context.bInstruction.address, context.bInstruction)
    }

    private add(context: IExecutionContext): void {
        context.operands.forEach(p => {
            p.destination.address = context.core.wrap(p.destination.address + p.source.address)
        })
        context.core.setAt(context.task, context.bInstruction.address, context.bInstruction)
    }

    private sub(context: IExecutionContext): void {
        context.operands.forEach(p => {
            p.destination.address = context.core.wrap(p.destination.address - p.source.address)
        })
        context.core.setAt(context.task, context.bInstruction.address, context.bInstruction)
    }

    private mul(context: IExecutionContext): void {
        context.operands.forEach(p => {
            p.destination.address = context.core.wrap(p.destination.address * p.source.address)
        })
        context.core.setAt(context.task, context.bInstruction.address, context.bInstruction)
    }

    private div(context: IExecutionContext): void {
        context.operands.forEach(p => {
            if (p.source.address !== 0) {
                p.destination.address = (p.destination.address / p.source.address) >> 0
            } else {
                //TODO double divide by zero will remove two processes from the warrior task queue!
                this.dat(context)
            }
        })
        context.core.setAt(context.task, context.bInstruction.address, context.bInstruction)
    }

    private mod(context: IExecutionContext): void {
        context.operands.forEach(p => {
            if (p.source.address !== 0) {
                p.destination.address = p.destination.address % p.source.address
            } else {
                //TODO double divide by zero will remove two processes from the warrior task queue!
                this.dat(context)
            }
        })
        context.core.setAt(context.task, context.bInstruction.address, context.bInstruction)
    }

    private jmp(context: IExecutionContext): void {
        context.task.instructionPointer = context.core.wrap(context.aInstruction.address)
    }

    private jmz(context: IExecutionContext): void {
        let branch = true

        context.operands.forEach(p => {
            if (p.destination.address !== 0) {
                branch = false
            }
        })

        if (branch) {
            context.task.instructionPointer = context.core.wrap(context.aInstruction.address)
        }
    }

    private jmn(context: IExecutionContext): void {
        let branch = true

        context.operands.forEach(p => {
            if (p.destination.address === 0) {
                branch = false
            }
        })

        if (branch) {
            context.task.instructionPointer = context.core.wrap(context.aInstruction.address)
        }
    }

    private djn(context: IExecutionContext): void {
        let branch = false

        context.operands.forEach(p => {
            const a = context.core.wrap(p.destination.address - 1)
            p.destination.address = a

            if (a !== 0) {
                branch = true
            }
        })

        if (branch) {
            context.task.instructionPointer = context.core.wrap(context.aInstruction.address)
        }

        context.core.setAt(context.task, context.bInstruction.address, context.bInstruction)
    }

    private seq(context: IExecutionContext): void {
        let branch = true

        if (context.instruction.modifier === ModifierType.I) {
            return this.seqI(context)
        }

        context.operands.forEach(p => {
            if (p.source.address !== p.destination.address) {
                branch = false
            }
        })

        if (branch) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1)
        }
    }

    private seqI(context: IExecutionContext): void {
        const ai = context.aInstruction
        const bi = context.bInstruction

        if (
            ai.opcode === bi.opcode &&
            ai.modifier === bi.modifier &&
            ai.aOperand.mode === bi.aOperand.mode &&
            ai.aOperand.address === bi.aOperand.address &&
            ai.bOperand.mode === bi.bOperand.mode &&
            ai.bOperand.address === bi.bOperand.address
        ) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1)
        }
    }

    private sne(context: IExecutionContext): void {
        let branch = false

        if (context.instruction.modifier === ModifierType.I) {
            return this.sneI(context)
        }

        context.operands.forEach(p => {
            if (p.source.address !== p.destination.address) {
                branch = true
            }
        })

        if (branch) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1)
        }
    }

    private sneI(context: IExecutionContext): void {
        const ai = context.aInstruction
        const bi = context.bInstruction

        if (
            ai.opcode !== bi.opcode ||
            ai.modifier !== bi.modifier ||
            ai.aOperand.mode !== bi.aOperand.mode ||
            ai.aOperand.address !== bi.aOperand.address ||
            ai.bOperand.mode !== bi.bOperand.mode ||
            ai.bOperand.address !== bi.bOperand.address
        ) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1)
        }
    }

    private slt(context: IExecutionContext): void {
        let branch = true

        context.operands.forEach(p => {
            if (p.source.address >= p.destination.address) {
                branch = false
            }
        })

        if (branch) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1)
        }
    }

    private spl(context: IExecutionContext): void {
        if (context.instance.tasks.length < this.maxTasks) {
            context.instance.tasks.splice(context.instance.taskIndex, 0, {
                instructionPointer: context.core.wrap(context.aInstruction.address),
                instance: context.instance
            })
            context.instance.taskIndex = (context.instance.taskIndex + 1) % context.instance.tasks.length

            this.publishTaskCount(context.instance, context.instance.tasks.length)
        }
    }

    private nop(_: IExecutionContext): void {
        // DO NOWT
    }
}
