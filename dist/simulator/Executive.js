"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Executive {
    constructor() {
        this.commandTable = [
            this.dat,
            this.dat,
            this.dat,
            this.dat,
            this.dat,
            this.dat,
            this.dat,
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
            this.jmp,
            this.jmp,
            this.jmp,
            this.jmp,
            this.jmp,
            this.jmp,
            this.jmp,
            this.jmz_a,
            this.jmz_b,
            this.jmz_b,
            this.jmz_a,
            this.jmz_f,
            this.jmz_f,
            this.jmz_f,
            this.jmn_a,
            this.jmn_b,
            this.jmn_b,
            this.jmn_a,
            this.jmn_f,
            this.jmn_f,
            this.jmn_f,
            this.djn_a,
            this.djn_b,
            this.djn_b,
            this.djn_a,
            this.djn_f,
            this.djn_f,
            this.djn_f,
            this.seq_a,
            this.seq_b,
            this.seq_ab,
            this.seq_ba,
            this.seq_f,
            this.seq_x,
            this.seq_i,
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
            this.spl,
            this.spl,
            this.spl,
            this.spl,
            this.spl,
            this.spl,
            this.spl,
            this.nop,
            this.nop,
            this.nop,
            this.nop,
            this.nop,
            this.nop,
            this.nop,
        ];
    }
    initialise(options) {
        this.instructionLimit = options.instructionLimit;
    }
    dat(context) {
        //Remove current task from the queue
        var ti = context.taskIndex;
        context.warrior.taskIndex = context.taskIndex;
        context.warrior.tasks.splice(ti, 1);
    }
    mov_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = aInstruction.aOperand.address;
    }
    mov_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = aInstruction.bOperand.address;
    }
    mov_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = aInstruction.aOperand.address;
    }
    mov_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = aInstruction.bOperand.address;
    }
    mov_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = aInstruction.aOperand.address;
        bInstruction.bOperand.address = aInstruction.bOperand.address;
    }
    mov_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = aInstruction.bOperand.address;
        bInstruction.bOperand.address = aInstruction.aOperand.address;
    }
    mov_i(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = {
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
    add_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.aOperand.address + bInstruction.aOperand.address);
    }
    add_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.bOperand.address + bInstruction.bOperand.address);
    }
    add_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.aOperand.address + bInstruction.bOperand.address);
    }
    add_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.bOperand.address + bInstruction.aOperand.address);
    }
    add_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.aOperand.address + bInstruction.aOperand.address);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.bOperand.address + bInstruction.bOperand.address);
    }
    add_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.bOperand.address + bInstruction.aOperand.address);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.aOperand.address + bInstruction.bOperand.address);
    }
    sub_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(bInstruction.aOperand.address - aInstruction.aOperand.address);
    }
    sub_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = context.core.wrap(bInstruction.bOperand.address - aInstruction.bOperand.address);
    }
    sub_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = context.core.wrap(bInstruction.bOperand.address - aInstruction.aOperand.address);
    }
    sub_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(bInstruction.aOperand.address - aInstruction.bOperand.address);
    }
    sub_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(bInstruction.aOperand.address - aInstruction.aOperand.address);
        bInstruction.bOperand.address = context.core.wrap(bInstruction.bOperand.address - aInstruction.bOperand.address);
    }
    sub_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(bInstruction.aOperand.address - aInstruction.bOperand.address);
        bInstruction.bOperand.address = context.core.wrap(bInstruction.bOperand.address - aInstruction.aOperand.address);
    }
    mul_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.aOperand.address * bInstruction.aOperand.address);
    }
    mul_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.bOperand.address * bInstruction.bOperand.address);
    }
    mul_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.aOperand.address * bInstruction.bOperand.address);
    }
    mul_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.bOperand.address * bInstruction.aOperand.address);
    }
    mul_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.aOperand.address * bInstruction.aOperand.address);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.bOperand.address * bInstruction.bOperand.address);
    }
    mul_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        bInstruction.aOperand.address = context.core.wrap(aInstruction.bOperand.address * bInstruction.aOperand.address);
        bInstruction.bOperand.address = context.core.wrap(aInstruction.aOperand.address * bInstruction.bOperand.address);
    }
    div_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.aOperand.address = (bInstruction.aOperand.address / aInstruction.aOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
    }
    div_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.bOperand.address = (bInstruction.bOperand.address / aInstruction.bOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
    }
    div_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.bOperand.address = (bInstruction.bOperand.address / aInstruction.aOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
    }
    div_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.aOperand.address = (bInstruction.aOperand.address / aInstruction.bOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
    }
    div_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.aOperand.address = (bInstruction.aOperand.address / aInstruction.aOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.bOperand.address = (bInstruction.bOperand.address / aInstruction.bOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
    }
    div_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.aOperand.address = (bInstruction.aOperand.address / aInstruction.bOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.bOperand.address = (bInstruction.bOperand.address / aInstruction.aOperand.address) >> 0;
        }
        else {
            this.dat(context);
        }
    }
    mod_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.aOperand.address = bInstruction.aOperand.address % aInstruction.aOperand.address;
        }
        else {
            this.dat(context);
        }
    }
    mod_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.bOperand.address = bInstruction.bOperand.address % aInstruction.bOperand.address;
        }
        else {
            this.dat(context);
        }
    }
    mod_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.bOperand.address = bInstruction.bOperand.address % aInstruction.aOperand.address;
        }
        else {
            this.dat(context);
        }
    }
    mod_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.aOperand.address = bInstruction.aOperand.address % aInstruction.bOperand.address;
        }
        else {
            this.dat(context);
        }
    }
    mod_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.aOperand.address = bInstruction.aOperand.address % aInstruction.aOperand.address;
        }
        else {
            this.dat(context);
        }
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.bOperand.address = bInstruction.bOperand.address % aInstruction.bOperand.address;
        }
        else {
            this.dat(context);
        }
    }
    mod_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== 0) {
            bInstruction.aOperand.address = bInstruction.aOperand.address % aInstruction.bOperand.address;
        }
        else {
            this.dat(context);
        }
        //TODO double divide by zero will remove two processes from the warrior task queue!
        if (aInstruction.aOperand.address !== 0) {
            bInstruction.bOperand.address = bInstruction.bOperand.address % aInstruction.aOperand.address;
        }
        else {
            this.dat(context);
        }
    }
    jmp(context) {
        context.task.instructionPointer = context.core.wrap(context.aPointer);
    }
    jmz_a(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (bInstruction.aOperand.address === 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    jmz_b(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (bInstruction.bOperand.address === 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    jmz_f(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (bInstruction.aOperand.address === 0 &&
            bInstruction.bOperand.address === 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    jmn_a(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (bInstruction.aOperand.address !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    jmn_b(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (bInstruction.bOperand.address !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    jmn_f(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (bInstruction.aOperand.address !== 0 ||
            bInstruction.bOperand.address !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    djn_a(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        var a = context.core.wrap(bInstruction.aOperand.address - 1);
        bInstruction.aOperand.address = a;
        if (a !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    djn_b(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        var b = context.core.wrap(bInstruction.bOperand.address - 1);
        bInstruction.bOperand.address = b;
        if (b !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    djn_f(context) {
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        var a = context.core.wrap(bInstruction.aOperand.address - 1);
        bInstruction.aOperand.address = a;
        var b = context.core.wrap(bInstruction.bOperand.address - 1);
        bInstruction.bOperand.address = b;
        if (a !== 0 || b !== 0) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        }
    }
    seq_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address === bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    seq_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address === bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    seq_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address === bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    seq_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address === bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    seq_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address === bInstruction.aOperand.address &&
            aInstruction.bOperand.address === bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    seq_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address === bInstruction.bOperand.address &&
            aInstruction.bOperand.address === bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    seq_i(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.opcode === bInstruction.opcode &&
            aInstruction.modifier === bInstruction.modifier &&
            aInstruction.aOperand.mode === bInstruction.aOperand.mode &&
            aInstruction.aOperand.address === bInstruction.aOperand.address &&
            aInstruction.bOperand.mode === bInstruction.bOperand.mode &&
            aInstruction.bOperand.address === bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    sne_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    sne_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    sne_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    sne_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address !== bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    sne_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== bInstruction.aOperand.address ||
            aInstruction.bOperand.address !== bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    sne_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address !== bInstruction.bOperand.address ||
            aInstruction.bOperand.address !== bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    sne_i(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.opcode !== bInstruction.opcode ||
            aInstruction.modifier !== bInstruction.modifier ||
            aInstruction.aOperand.mode !== bInstruction.aOperand.mode ||
            aInstruction.aOperand.address !== bInstruction.aOperand.address ||
            aInstruction.bOperand.mode !== bInstruction.bOperand.mode ||
            aInstruction.bOperand.address !== bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    slt_a(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address < bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    slt_b(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address < bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    slt_ab(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address < bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    slt_ba(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.bOperand.address < bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    slt_f(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address < bInstruction.aOperand.address &&
            aInstruction.bOperand.address < bInstruction.bOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    slt_x(context) {
        var aInstruction = context.core.readAt(context.task, context.aPointer);
        var bInstruction = context.core.readAt(context.task, context.bPointer);
        if (aInstruction.aOperand.address < bInstruction.bOperand.address &&
            aInstruction.bOperand.address < bInstruction.aOperand.address) {
            context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
        }
    }
    spl(context) {
        if (context.warrior.tasks.length < this.instructionLimit) {
            context.warrior.tasks.splice(context.warrior.taskIndex, 0, {
                instructionPointer: context.core.wrap(context.aPointer),
                warrior: context.warrior
            });
            context.warrior.taskIndex = (context.warrior.taskIndex + 1) % context.warrior.tasks.length;
        }
    }
    nop(context) {
        // DO NOWT
    }
}
exports.Executive = Executive;
