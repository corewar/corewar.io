import { IExecutive } from "./interface/IExecutive";
import { IExecutionContext } from "./interface/IExecutionContext";
import { IInstruction } from "./interface/IInstruction";
import { IOptions } from "./interface/IOptions";

export class Executive implements IExecutive {

    public commandTable: ((context: IExecutionContext) => void)[] = [
        this.dat,   // .A
        this.dat,   // .B
        this.dat,   // .AB
        this.dat,   // .BA
        this.dat,   // .F
        this.dat,   // .X
        this.dat,   // .I

        this.mov_a,
        this.mov_b,
        this.mov_ab,
        this.mov_ba,
        this.mov_f,
        this.mov_x,
        this.mov_i,

        this.add_a,
        this.add_b,
        this.add_ab,
        this.add_ba,
        this.add_f,
        this.add_x,
        this.add_f,

        this.sub_a,
        this.sub_b,
        this.sub_ab,
        this.sub_ba,
        this.sub_f,
        this.sub_x,
        this.sub_f,

        this.mul_a,
        this.mul_b,
        this.mul_ab,
        this.mul_ba,
        this.mul_f,
        this.mul_x,
        this.mul_f,

        this.div_a,
        this.div_b,
        this.div_ab,
        this.div_ba,
        this.div_f,
        this.div_x,
        this.div_f,

        this.mod_a,
        this.mod_b,
        this.mod_ab,
        this.mod_ba,
        this.mod_f,
        this.mod_x,
        this.mod_f,

        this.jmp,   // .A
        this.jmp,   // .B
        this.jmp,   // .AB
        this.jmp,   // .BA
        this.jmp,   // .F
        this.jmp,   // .X
        this.jmp,   // .I

        this.jmz_a, // .A
        this.jmz_b, // .B
        this.jmz_b, // .AB
        this.jmz_a, // .BA
        this.jmz_f, // .F
        this.jmz_f, // .X
        this.jmz_f, // .I

        this.jmn_a, // .A
        this.jmn_b, // .B
        this.jmn_b, // .AB
        this.jmn_a, // .BA
        this.jmn_f, // .F
        this.jmn_f, // .X
        this.jmn_f, // .I

        this.djn_a, // .A
        this.djn_b, // .B
        this.djn_b, // .AB
        this.djn_a, // .BA
        this.djn_f, // .F
        this.djn_f, // .X
        this.djn_f, // .I

        this.seq_a, // CMP
        this.seq_b, // CMP
        this.seq_ab,// CMP
        this.seq_ba,// CMP
        this.seq_f, // CMP
        this.seq_x, // CMP
        this.seq_i, // CMP

        this.seq_a,
        this.seq_b,
        this.seq_ab,
        this.seq_ba,
        this.seq_f,
        this.seq_x,
        this.seq_i,

        this.sne_a,
        this.sne_b,
        this.sne_ab,
        this.sne_ba,
        this.sne_f,
        this.sne_x,
        this.sne_i,

        this.slt_a,
        this.slt_b,
        this.slt_ab,
        this.slt_ba,
        this.slt_f,
        this.slt_x,
        this.slt_f,

        this.spl,   // .A
        this.spl,   // .B
        this.spl,   // .AB
        this.spl,   // .BA
        this.spl,   // .F
        this.spl,   // .X
        this.spl,   // .I

        this.nop,   // .A
        this.nop,   // .B
        this.nop,   // .AB
        this.nop,   // .BA
        this.nop,   // .F
        this.nop,   // .X
        this.nop,   // .I
    ];

    private pubSubProvider: any;

    private instructionLimit: number;

    public initialise(options: IOptions) {

        this.instructionLimit = options.instructionLimit;
    }

    public setMessageProvider(provider: any) {
        this.pubSubProvider = provider;
    }

    private publishTaskCount(warriorId: number, taskCount: number) {
        if (!this.pubSubProvider) {
            return;
        }

        this.pubSubProvider.publishSync('TASK_COUNT', {
            warriorId,
            taskCount
        });
    }

    private dat(context: IExecutionContext) {
        //Remove current task from the queue
        var ti = context.taskIndex;
        context.warrior.taskIndex = context.taskIndex;
        context.warrior.tasks.splice(ti, 1);

        this.publishTaskCount(context.warrior.id, context.warrior.tasks.length);
    }

    private mov_a(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.aOperand.address = aInstruction.aOperand.address;
    }

    private mov_b(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.bOperand.address = aInstruction.bOperand.address;
    }

    private mov_ab(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.bOperand.address = aInstruction.aOperand.address;
    }

    private mov_ba(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.aOperand.address = aInstruction.bOperand.address;
    }

    private mov_f(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.aOperand.address = aInstruction.aOperand.address;
        bInstruction.bOperand.address = aInstruction.bOperand.address;
    }

    private mov_x(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.aOperand.address = aInstruction.bOperand.address;
        bInstruction.bOperand.address = aInstruction.aOperand.address;
    }

    private mov_i(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction: IInstruction = {
            address: context.bPointer,
            opcode: aInstruction.opcode,
            modifier: aInstruction.modifier,
            aOperand: {
                address: aInstruction.aOperand.address,
                mode: aInstruction.aOperand.mode
            },
            bOperand: {
                address: aInstruction.bOperand.address,
                mode: aInstruction.bOperand.mode
            }
        };
        context.core.setAt(context.task, context.bPointer, bInstruction);
    }

    private add_a(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.aOperand.address = context.core.wrap(
                aInstruction.aOperand.address + bInstruction.aOperand.address
            );
    }

    private add_b(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.bOperand.address = context.core.wrap(
                aInstruction.bOperand.address + bInstruction.bOperand.address
            );
    }

    private add_ab(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.bOperand.address = context.core.wrap(
                aInstruction.aOperand.address + bInstruction.bOperand.address
            );
    }

    private add_ba(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.aOperand.address = context.core.wrap(
                aInstruction.bOperand.address + bInstruction.aOperand.address
            );
    }

    private add_f(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.aOperand.address = context.core.wrap(
                aInstruction.aOperand.address + bInstruction.aOperand.address
            );
        bInstruction.bOperand.address = context.core.wrap(
                aInstruction.bOperand.address + bInstruction.bOperand.address
            );
    }

    private add_x(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.aOperand.address = context.core.wrap(
                aInstruction.bOperand.address + bInstruction.aOperand.address
            );
        bInstruction.bOperand.address = context.core.wrap(
                aInstruction.aOperand.address + bInstruction.bOperand.address
            );
    }

    private sub_a(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.aOperand.address = context.core.wrap(
                bInstruction.aOperand.address - aInstruction.aOperand.address
            );
    }

    private sub_b(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.bOperand.address = context.core.wrap(
                bInstruction.bOperand.address - aInstruction.bOperand.address
            );
    }

    private sub_ab(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.bOperand.address = context.core.wrap(
                bInstruction.bOperand.address - aInstruction.aOperand.address
            );
    }

    private sub_ba(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.aOperand.address = context.core.wrap(
                bInstruction.aOperand.address - aInstruction.bOperand.address
            );
    }

    private sub_f(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.aOperand.address = context.core.wrap(
                bInstruction.aOperand.address - aInstruction.aOperand.address
            );
        bInstruction.bOperand.address = context.core.wrap(
                bInstruction.bOperand.address - aInstruction.bOperand.address
            );
    }

    private sub_x(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.aOperand.address = context.core.wrap(
                bInstruction.aOperand.address - aInstruction.bOperand.address
            );
        bInstruction.bOperand.address = context.core.wrap(
                bInstruction.bOperand.address - aInstruction.aOperand.address
            );
    }

    private mul_a(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.aOperand.address = context.core.wrap(
                aInstruction.aOperand.address * bInstruction.aOperand.address
            );
    }

    private mul_b(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.bOperand.address = context.core.wrap(
                aInstruction.bOperand.address * bInstruction.bOperand.address
            );
    }

    private mul_ab(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.bOperand.address = context.core.wrap(
                aInstruction.aOperand.address * bInstruction.bOperand.address
            );
    }

    private mul_ba(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.aOperand.address = context.core.wrap(
                aInstruction.bOperand.address * bInstruction.aOperand.address
            );
    }

    private mul_f(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.aOperand.address = context.core.wrap(
                aInstruction.aOperand.address * bInstruction.aOperand.address
            );
        bInstruction.bOperand.address = context.core.wrap(
                aInstruction.bOperand.address * bInstruction.bOperand.address
            );
    }

    private mul_x(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        bInstruction.aOperand.address = context.core.wrap(
                aInstruction.bOperand.address * bInstruction.aOperand.address
            );
        bInstruction.bOperand.address = context.core.wrap(
                aInstruction.aOperand.address * bInstruction.bOperand.address
            );
    }

    private div_a(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        if (aInstruction.aOperand.address !== 0) {
            bInstruction.aOperand.address = (bInstruction.aOperand.address / aInstruction.aOperand.address) >> 0;
        } else {
            this.dat(context);
        }
    }

    private div_b(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        if (aInstruction.bOperand.address !== 0) {
            bInstruction.bOperand.address = (bInstruction.bOperand.address / aInstruction.bOperand.address) >> 0;
        } else {
            this.dat(context);
        }
    }

    private div_ab(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        if (aInstruction.aOperand.address !== 0) {
            bInstruction.bOperand.address = (bInstruction.bOperand.address / aInstruction.aOperand.address) >> 0;
        } else {
            this.dat(context);
        }
    }

    private div_ba(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        if (aInstruction.bOperand.address !== 0) {
            bInstruction.aOperand.address = (bInstruction.aOperand.address / aInstruction.bOperand.address) >> 0;
        } else {
            this.dat(context);
        }
    }

    private div_f(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        if (aInstruction.aOperand.address !== 0) {
            bInstruction.aOperand.address = (bInstruction.aOperand.address / aInstruction.aOperand.address) >> 0;
        } else {
            this.dat(context);
        }

        if (aInstruction.bOperand.address !== 0) {
            bInstruction.bOperand.address = (bInstruction.bOperand.address / aInstruction.bOperand.address) >> 0;
        } else {
            this.dat(context);
        }
    }

    private div_x(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        if (aInstruction.bOperand.address !== 0) {
            bInstruction.aOperand.address = (bInstruction.aOperand.address / aInstruction.bOperand.address) >> 0;
        } else {
            this.dat(context);
        }

        if (aInstruction.aOperand.address !== 0) {
            bInstruction.bOperand.address = (bInstruction.bOperand.address / aInstruction.aOperand.address) >> 0;
        } else {
            this.dat(context);
        }
    }

    private mod_a(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        if (aInstruction.aOperand.address !== 0) {
            bInstruction.aOperand.address = bInstruction.aOperand.address % aInstruction.aOperand.address;
        } else {
            this.dat(context);
        }
    }

    private mod_b(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        if (aInstruction.bOperand.address !== 0) {
            bInstruction.bOperand.address = bInstruction.bOperand.address % aInstruction.bOperand.address;
        } else {
            this.dat(context);
        }
    }

    private mod_ab(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        if (aInstruction.aOperand.address !== 0) {
            bInstruction.bOperand.address = bInstruction.bOperand.address % aInstruction.aOperand.address;
        } else {
            this.dat(context);
        }
    }

    private mod_ba(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        if (aInstruction.bOperand.address !== 0) {
            bInstruction.aOperand.address = bInstruction.aOperand.address % aInstruction.bOperand.address;
        } else {
            this.dat(context);
        }
    }

    private mod_f(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        if (aInstruction.aOperand.address !== 0) {
            bInstruction.aOperand.address = bInstruction.aOperand.address % aInstruction.aOperand.address;
        } else {
            this.dat(context);
        }

        if (aInstruction.bOperand.address !== 0) {
            bInstruction.bOperand.address = bInstruction.bOperand.address % aInstruction.bOperand.address;
        } else {
            this.dat(context);
        }
    }

    private mod_x(context: IExecutionContext) {

        var aInstruction = context.core.getAt(context.aPointer);
        var bInstruction = context.core.getAt(context.bPointer);

        if (aInstruction.bOperand.address !== 0) {
            bInstruction.aOperand.address = bInstruction.aOperand.address % aInstruction.bOperand.address;
        } else {
            this.dat(context);
        }
        //TODO double divide by zero will remove two processes from the warrior task queue!
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.bOperand.address = bInstruction.bOperand.address % aInstruction.aOperand.address;
        } else {
            this.dat(context);
        }
    }

    private jmp(context: IExecutionContext) {

        context.task.instructionPointer = context.core.wrap(context.aPointer);
    }

    private jmz_a(context: IExecutionContext) {

        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (bInstruction.aOperand.address === 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }

    private jmz_b(context: IExecutionContext) {

        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (bInstruction.bOperand.address === 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }

    private jmz_f(context: IExecutionContext) {

        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (bInstruction.aOperand.address === 0 &&
            bInstruction.bOperand.address === 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }

    private jmn_a(context: IExecutionContext) {

        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (bInstruction.aOperand.address !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }

    private jmn_b(context: IExecutionContext) {

        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (bInstruction.bOperand.address !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }

    private jmn_f(context: IExecutionContext) {

        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (bInstruction.aOperand.address !== 0 ||
            bInstruction.bOperand.address !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }

    private djn_a(context: IExecutionContext) {

        var bInstruction = context.core.readAt(context.task, context.bPointer);

        var a = context.core.wrap(bInstruction.aOperand.address - 1);
        bInstruction.aOperand.address = a;

        if (a !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }

    private djn_b(context: IExecutionContext) {

        var bInstruction = context.core.readAt(context.task, context.bPointer);

        var b = context.core.wrap(bInstruction.bOperand.address - 1);
        bInstruction.bOperand.address = b;

        if (b !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }

    private djn_f(context: IExecutionContext) {

        var bInstruction = context.core.readAt(context.task, context.bPointer);

        var a = context.core.wrap(bInstruction.aOperand.address - 1);
        bInstruction.aOperand.address = a;

        var b = context.core.wrap(bInstruction.bOperand.address - 1);
        bInstruction.bOperand.address = b;

        if (a !== 0 || b !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }

    private seq_a(context: IExecutionContext) {

        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (aInstruction.aOperand.address === bInstruction.aOperand.address) {

            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private seq_b(context: IExecutionContext) {

        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (aInstruction.bOperand.address === bInstruction.bOperand.address) {

            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private seq_ab(context: IExecutionContext) {

        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (aInstruction.aOperand.address === bInstruction.bOperand.address) {

            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private seq_ba(context: IExecutionContext) {

        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (aInstruction.bOperand.address === bInstruction.aOperand.address) {

            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private seq_f(context: IExecutionContext) {

        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (aInstruction.aOperand.address === bInstruction.aOperand.address &&
            aInstruction.bOperand.address === bInstruction.bOperand.address) {

            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private seq_x(context: IExecutionContext) {

        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (aInstruction.aOperand.address === bInstruction.bOperand.address &&
            aInstruction.bOperand.address === bInstruction.aOperand.address) {

            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private seq_i(context: IExecutionContext) {

        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (aInstruction.opcode === bInstruction.opcode &&
            aInstruction.modifier === bInstruction.modifier &&
            aInstruction.aOperand.mode === bInstruction.aOperand.mode &&
            aInstruction.aOperand.address === bInstruction.aOperand.address &&
            aInstruction.bOperand.mode === bInstruction.bOperand.mode &&
            aInstruction.bOperand.address === bInstruction.bOperand.address) {

            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private sne_a(context: IExecutionContext) {

        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (aInstruction.aOperand.address !== bInstruction.aOperand.address) {

            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private sne_b(context: IExecutionContext) {

        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (aInstruction.bOperand.address !== bInstruction.bOperand.address) {

            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private sne_ab(context: IExecutionContext) {

        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (aInstruction.aOperand.address !== bInstruction.bOperand.address) {

            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private sne_ba(context: IExecutionContext) {

        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (aInstruction.bOperand.address !== bInstruction.aOperand.address) {

            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private sne_f(context: IExecutionContext) {

        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (aInstruction.aOperand.address !== bInstruction.aOperand.address ||
            aInstruction.bOperand.address !== bInstruction.bOperand.address) {

            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private sne_x(context: IExecutionContext) {

        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (aInstruction.aOperand.address !== bInstruction.bOperand.address ||
            aInstruction.bOperand.address !== bInstruction.aOperand.address) {

            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private sne_i(context: IExecutionContext) {

        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (aInstruction.opcode !== bInstruction.opcode ||
            aInstruction.modifier !== bInstruction.modifier ||
            aInstruction.aOperand.mode !== bInstruction.aOperand.mode ||
            aInstruction.aOperand.address !== bInstruction.aOperand.address ||
            aInstruction.bOperand.mode !== bInstruction.bOperand.mode ||
            aInstruction.bOperand.address !== bInstruction.bOperand.address) {

            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private slt_a(context: IExecutionContext) {

        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (aInstruction.aOperand.address < bInstruction.aOperand.address) {

            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private slt_b(context: IExecutionContext) {

        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (aInstruction.bOperand.address < bInstruction.bOperand.address) {

            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private slt_ab(context: IExecutionContext) {

        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (aInstruction.aOperand.address < bInstruction.bOperand.address) {

            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private slt_ba(context: IExecutionContext) {

        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (aInstruction.bOperand.address < bInstruction.aOperand.address) {

            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private slt_f(context: IExecutionContext) {

        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (aInstruction.aOperand.address < bInstruction.aOperand.address &&
            aInstruction.bOperand.address < bInstruction.bOperand.address) {

            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private slt_x(context: IExecutionContext) {

        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);

        if (aInstruction.aOperand.address < bInstruction.bOperand.address &&
            aInstruction.bOperand.address < bInstruction.aOperand.address) {

            context.task.instructionPointer = context.core.wrap(
                context.task.instructionPointer + 1);
        }
    }

    private spl(context: IExecutionContext) {

        if (context.warrior.tasks.length < this.instructionLimit) {

            context.warrior.tasks.splice(context.warrior.taskIndex, 0, {
                instructionPointer: context.core.wrap(context.aPointer),
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