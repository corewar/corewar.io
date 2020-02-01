import { IExecutive } from "@simulator/interface/IExecutive";
import { IExecutionContext } from "@simulator/interface/IExecutionContext";
import { ModifierType } from "@simulator/interface/IInstruction";
import { IOptions } from "@simulator/interface/IOptions";
import { MessageType } from "@simulator/interface/IMessage";
import { IPublisher } from "@simulator/interface/IPublisher";
import { IWarrior } from "@simulator/interface/IWarrior";

export class Executive implements IExecutive {

    public commandTable: ((context: IExecutionContext) => void)[] = [
        this.dat,
        this.mov,
        this.add,
        this.sub,
        this.mul,
        this.div,
        this.mod,
        this.jmp,
        this.jmz,
        this.jmn,
        this.djn,
        this.seq, // CMP
        this.seq,
        this.sne,
        this.slt,
        this.spl,
        this.nop
    ];

    private publisher: IPublisher;

    constructor(publisher: IPublisher) {

        this.publisher = publisher;
    }

    private maxTasks: number;

    public initialise(options: IOptions): void {

        this.maxTasks = options.maxTasks;
    }

    private publishTaskCount(warrior: IWarrior, taskCount: number): void {

        const payload = {
            warriorId: warrior.id,
            taskCount
        };
        if (warrior.data) {
            payload["warriorData"] = warrior.data;
        }

        this.publisher.queue({
            type: MessageType.TaskCount,
            payload
        });

        if (taskCount === 0) {
            this.publisher.queue({
                type: MessageType.WarriorDead,
                payload
            })
        }
    }

    private dat(context: IExecutionContext): void {
        //Remove current task from the queue
        const ti = context.taskIndex;
        context.warrior.tasks.splice(ti, 1);
        // wrap the warrior task index to cater for the event when
        // we just chomped off the last task
        context.warrior.taskIndex = ti % context.warrior.tasks.length;

        this.publishTaskCount(context.warrior, context.warrior.tasks.length);
    }

    private mov(context: IExecutionContext): void {

        if (context.instruction.modifier === ModifierType.I) {

            context.aInstruction.address = context.bInstruction.address;
            context.core.setAt(context.task, context.bInstruction.address, context.aInstruction);
            return;
        }

        context.operands.forEach(p => {
            p.destination.address = p.source.address;
        });
        context.core.setAt(context.task, context.bInstruction.address, context.bInstruction);
    }

    private add(context: IExecutionContext): void {

        context.operands.forEach(p => {
            p.destination.address = context.core.wrap(p.destination.address + p.source.address);
        });
        context.core.setAt(context.task, context.bInstruction.address, context.bInstruction);
    }

    private sub(context: IExecutionContext): void {

        context.operands.forEach(p => {
            p.destination.address = context.core.wrap(p.destination.address - p.source.address);
        });
        context.core.setAt(context.task, context.bInstruction.address, context.bInstruction);
    }

    private mul(context: IExecutionContext): void {

        context.operands.forEach(p => {
            p.destination.address = context.core.wrap(p.destination.address * p.source.address);
        });
        context.core.setAt(context.task, context.bInstruction.address, context.bInstruction);
    }

    private div(context: IExecutionContext): void {

        context.operands.forEach(p => {
            if (p.source.address !== 0) {
                p.destination.address = (p.destination.address / p.source.address) >> 0;
            } else {
                //TODO double divide by zero will remove two processes from the warrior task queue!
                this.dat(context);
            }
        });
        context.core.setAt(context.task, context.bInstruction.address, context.bInstruction);
    }

    private mod(context: IExecutionContext): void {

        context.operands.forEach(p => {
            if (p.source.address !== 0) {
                p.destination.address = p.destination.address % p.source.address;
            } else {
                //TODO double divide by zero will remove two processes from the warrior task queue!
                this.dat(context);
            }
        });
        context.core.setAt(context.task, context.bInstruction.address, context.bInstruction);
    }

    private jmp(context: IExecutionContext): void {

        context.task.instructionPointer = context.core.wrap(context.aInstruction.address);
    }

    private jmz(context: IExecutionContext): void {

        let branch = true;

        context.operands.forEach(p => {

            if (p.destination.address !== 0) {
                branch = false;
            }
        });

        if (branch) {
            context.task.instructionPointer = context.core.wrap(context.aInstruction.address);
        }
    }

    private jmn(context: IExecutionContext): void {

        let branch = true;

        context.operands.forEach(p => {

            if (p.destination.address === 0) {
                branch = false;
            }
        });

        if (branch) {
            context.task.instructionPointer = context.core.wrap(context.aInstruction.address);
        }
    }

    private djn(context: IExecutionContext): void {

        let branch = false;

        context.operands.forEach(p => {

            const a = context.core.wrap(p.destination.address - 1);
            p.destination.address = a;

            if (a !== 0) {
                branch = true;
            }
        });

        if (branch) {
            context.task.instructionPointer = context.core.wrap(context.aInstruction.address);
        }

        context.core.setAt(context.task, context.bInstruction.address, context.bInstruction);
    }

    private seq(context: IExecutionContext): void {

        let branch = true;

        if (context.instruction.modifier === ModifierType.I) {
            return this.seqI(context);
        }

        context.operands.forEach(p => {

            if (p.source.address !== p.destination.address) {
                branch = false;
            }
        });

        if (branch) {
            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private seqI(context: IExecutionContext): void {

        const ai = context.aInstruction;
        const bi = context.bInstruction;

        if (ai.opcode === bi.opcode &&
            ai.modifier === bi.modifier &&
            ai.aOperand.mode === bi.aOperand.mode &&
            ai.aOperand.address === bi.aOperand.address &&
            ai.bOperand.mode === bi.bOperand.mode &&
            ai.bOperand.address === bi.bOperand.address) {

            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private sne(context: IExecutionContext): void {

        let branch = false;

        if (context.instruction.modifier === ModifierType.I) {
            return this.sneI(context);
        }

        context.operands.forEach(p => {

            if (p.source.address !== p.destination.address) {
                branch = true;
            }
        });

        if (branch) {
            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private sneI(context: IExecutionContext): void {

        const ai = context.aInstruction;
        const bi = context.bInstruction;

        if (ai.opcode !== bi.opcode ||
            ai.modifier !== bi.modifier ||
            ai.aOperand.mode !== bi.aOperand.mode ||
            ai.aOperand.address !== bi.aOperand.address ||
            ai.bOperand.mode !== bi.bOperand.mode ||
            ai.bOperand.address !== bi.bOperand.address) {

            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private slt(context: IExecutionContext): void {

        let branch = true;

        context.operands.forEach(p => {

            if (p.source.address >= p.destination.address) {
                branch = false;
            }
        });

        if (branch) {
            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private spl(context: IExecutionContext): void {

        if (context.warrior.tasks.length < this.maxTasks) {

            context.warrior.tasks.splice(context.warrior.taskIndex, 0, {
                instructionPointer: context.core.wrap(context.aInstruction.address),
                warrior: context.warrior
            });
            context.warrior.taskIndex = (context.warrior.taskIndex + 1) % context.warrior.tasks.length;

            this.publishTaskCount(context.warrior, context.warrior.tasks.length);
        }
    }

    private nop(_: IExecutionContext): void {
        // DO NOWT
    }
}