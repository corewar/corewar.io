import { IExecutive } from "./interface/IExecutive";
import { IExecutionContext } from "./interface/IExecutionContext";
import { IInstruction, ModifierType } from "./interface/IInstruction";
import { IOptions } from "./interface/IOptions";
import { MessageType } from "./interface/IMessage";
import { IPublisher } from "./interface/IPublisher";
import { IOperand } from "./interface/IOperand";

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

    public initialise(options: IOptions) {

        this.maxTasks = options.maxTasks;
    }

    private publishTaskCount(warriorId: number, taskCount: number) {

        this.publisher.queue({
            type: MessageType.TaskCount,
            payload: {
                warriorId,
                taskCount
            }
        });
    }

    private dat(context: IExecutionContext) {
        //Remove current task from the queue
        var ti = context.taskIndex;
        context.warrior.tasks.splice(ti, 1);
        // wrap the warrior task index to cater for the event when
        // we just chomped off the last task
        context.warrior.taskIndex = ti % context.warrior.tasks.length;

        this.publishTaskCount(context.warrior.id, context.warrior.tasks.length);
    }

    private mov(context: IExecutionContext) {

        if (context.instruction.modifier === ModifierType.I) {

            context.core.setAt(context.task, context.bInstruction.address, context.aInstruction);
            return;
        }

        context.operands.forEach(p => {
            p.destination.address = p.source.address;
        });
        context.core.setAt(context.task, context.bInstruction.address, context.bInstruction);
    }

    private add(context: IExecutionContext) {

        context.operands.forEach(p => {
            p.destination.address = context.core.wrap(p.destination.address + p.source.address);
        });
        context.core.setAt(context.task, context.bInstruction.address, context.bInstruction);
    }

    private sub(context: IExecutionContext) {

        context.operands.forEach(p => {
            p.destination.address = context.core.wrap(p.destination.address - p.source.address);
        });
        context.core.setAt(context.task, context.bInstruction.address, context.bInstruction);
    }

    private mul(context: IExecutionContext) {

        context.operands.forEach(p => {
            p.destination.address = context.core.wrap(p.destination.address * p.source.address);
        });
        context.core.setAt(context.task, context.bInstruction.address, context.bInstruction);
    }

    private div(context: IExecutionContext) {

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

    private mod(context: IExecutionContext) {

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

    private jmp(context: IExecutionContext) {

        context.task.instructionPointer = context.core.wrap(context.aInstruction.address);
    }

    private jmz(context: IExecutionContext) {

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

    private jmn(context: IExecutionContext) {

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

    private djn(context: IExecutionContext) {

        let branch = false;

        context.operands.forEach(p => {

            const a = context.core.wrap(p.source.address - 1);
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

    private seq(context: IExecutionContext) {

        let branch = true;

        if (context.instruction.modifier === ModifierType.I) {
            return this.seq_i(context);
        }

        context.operands.forEach(p => {

            if (p.source !== p.destination) {
                branch = false;
            }
        });

        if (branch) {
            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private seq_i(context: IExecutionContext) {

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

    private sne(context: IExecutionContext) {

        let branch = false;

        if (context.instruction.modifier === ModifierType.I) {
            return this.sne_i(context);
        }

        context.operands.forEach(p => {

            if (p.source !== p.destination) {
                branch = true;
            }
        });

        if (branch) {
            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private sne_i(context: IExecutionContext) {

        var ai = context.aInstruction;
        var bi = context.bInstruction;

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

    private slt(context: IExecutionContext) {

        let branch = true;

        context.operands.forEach(p => {

            if (p.source >= p.destination) {
                branch = false;
            }
        });

        if (branch) {
            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private spl(context: IExecutionContext) {

        if (context.warrior.tasks.length < this.maxTasks) {

            context.warrior.tasks.splice(context.warrior.taskIndex, 0, {
                instructionPointer: context.core.wrap(context.aInstruction.address),
                warrior: context.warrior
            });
            context.warrior.taskIndex = (context.warrior.taskIndex + 1) % context.warrior.tasks.length;

            this.publishTaskCount(context.warrior.id, context.warrior.tasks.length);
        }
    }

    private nop(context: IExecutionContext) {
        // DO NOWT
    }
}