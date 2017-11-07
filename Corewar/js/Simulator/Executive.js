define(["require", "exports"], function (require, exports) {
    var Executive = (function () {
        function Executive() {
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
        Executive.prototype.initialise = function (options) {
            this.instructionLimit = options.instructionLimit;
        };
        Executive.prototype.dat = function (context) {
            var ti = context.taskIndex;
            context.warrior.taskIndex = context.taskIndex;
            context.warrior.tasks.splice(ti, 1);
        };
        Executive.prototype.mov_a = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.aOperand.address = aInstruction.aOperand.address;
        };
        Executive.prototype.mov_b = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.bOperand.address = aInstruction.bOperand.address;
        };
        Executive.prototype.mov_ab = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.bOperand.address = aInstruction.aOperand.address;
        };
        Executive.prototype.mov_ba = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.aOperand.address = aInstruction.bOperand.address;
        };
        Executive.prototype.mov_f = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.aOperand.address = aInstruction.aOperand.address;
            bInstruction.bOperand.address = aInstruction.bOperand.address;
        };
        Executive.prototype.mov_x = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.aOperand.address = aInstruction.bOperand.address;
            bInstruction.bOperand.address = aInstruction.aOperand.address;
        };
        Executive.prototype.mov_i = function (context) {
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
        };
        Executive.prototype.add_a = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.aOperand.address = context.core.wrap(aInstruction.aOperand.address + bInstruction.aOperand.address);
        };
        Executive.prototype.add_b = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.bOperand.address = context.core.wrap(aInstruction.bOperand.address + bInstruction.bOperand.address);
        };
        Executive.prototype.add_ab = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.bOperand.address = context.core.wrap(aInstruction.aOperand.address + bInstruction.bOperand.address);
        };
        Executive.prototype.add_ba = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.aOperand.address = context.core.wrap(aInstruction.bOperand.address + bInstruction.aOperand.address);
        };
        Executive.prototype.add_f = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.aOperand.address = context.core.wrap(aInstruction.aOperand.address + bInstruction.aOperand.address);
            bInstruction.bOperand.address = context.core.wrap(aInstruction.bOperand.address + bInstruction.bOperand.address);
        };
        Executive.prototype.add_x = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.aOperand.address = context.core.wrap(aInstruction.bOperand.address + bInstruction.aOperand.address);
            bInstruction.bOperand.address = context.core.wrap(aInstruction.aOperand.address + bInstruction.bOperand.address);
        };
        Executive.prototype.sub_a = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.aOperand.address = context.core.wrap(bInstruction.aOperand.address - aInstruction.aOperand.address);
        };
        Executive.prototype.sub_b = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.bOperand.address = context.core.wrap(bInstruction.bOperand.address - aInstruction.bOperand.address);
        };
        Executive.prototype.sub_ab = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.bOperand.address = context.core.wrap(bInstruction.bOperand.address - aInstruction.aOperand.address);
        };
        Executive.prototype.sub_ba = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.aOperand.address = context.core.wrap(bInstruction.aOperand.address - aInstruction.bOperand.address);
        };
        Executive.prototype.sub_f = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.aOperand.address = context.core.wrap(bInstruction.aOperand.address - aInstruction.aOperand.address);
            bInstruction.bOperand.address = context.core.wrap(bInstruction.bOperand.address - aInstruction.bOperand.address);
        };
        Executive.prototype.sub_x = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.aOperand.address = context.core.wrap(bInstruction.aOperand.address - aInstruction.bOperand.address);
            bInstruction.bOperand.address = context.core.wrap(bInstruction.bOperand.address - aInstruction.aOperand.address);
        };
        Executive.prototype.mul_a = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.aOperand.address = context.core.wrap(aInstruction.aOperand.address * bInstruction.aOperand.address);
        };
        Executive.prototype.mul_b = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.bOperand.address = context.core.wrap(aInstruction.bOperand.address * bInstruction.bOperand.address);
        };
        Executive.prototype.mul_ab = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.bOperand.address = context.core.wrap(aInstruction.aOperand.address * bInstruction.bOperand.address);
        };
        Executive.prototype.mul_ba = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.aOperand.address = context.core.wrap(aInstruction.bOperand.address * bInstruction.aOperand.address);
        };
        Executive.prototype.mul_f = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.aOperand.address = context.core.wrap(aInstruction.aOperand.address * bInstruction.aOperand.address);
            bInstruction.bOperand.address = context.core.wrap(aInstruction.bOperand.address * bInstruction.bOperand.address);
        };
        Executive.prototype.mul_x = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            bInstruction.aOperand.address = context.core.wrap(aInstruction.bOperand.address * bInstruction.aOperand.address);
            bInstruction.bOperand.address = context.core.wrap(aInstruction.aOperand.address * bInstruction.bOperand.address);
        };
        Executive.prototype.div_a = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.aOperand.address !== 0) {
                bInstruction.aOperand.address = (bInstruction.aOperand.address / aInstruction.aOperand.address) >> 0;
            }
            else {
                this.dat(context);
            }
        };
        Executive.prototype.div_b = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.bOperand.address !== 0) {
                bInstruction.bOperand.address = (bInstruction.bOperand.address / aInstruction.bOperand.address) >> 0;
            }
            else {
                this.dat(context);
            }
        };
        Executive.prototype.div_ab = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.aOperand.address !== 0) {
                bInstruction.bOperand.address = (bInstruction.bOperand.address / aInstruction.aOperand.address) >> 0;
            }
            else {
                this.dat(context);
            }
        };
        Executive.prototype.div_ba = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.bOperand.address !== 0) {
                bInstruction.aOperand.address = (bInstruction.aOperand.address / aInstruction.bOperand.address) >> 0;
            }
            else {
                this.dat(context);
            }
        };
        Executive.prototype.div_f = function (context) {
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
        };
        Executive.prototype.div_x = function (context) {
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
        };
        Executive.prototype.mod_a = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.aOperand.address !== 0) {
                bInstruction.aOperand.address = bInstruction.aOperand.address % aInstruction.aOperand.address;
            }
            else {
                this.dat(context);
            }
        };
        Executive.prototype.mod_b = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.bOperand.address !== 0) {
                bInstruction.bOperand.address = bInstruction.bOperand.address % aInstruction.bOperand.address;
            }
            else {
                this.dat(context);
            }
        };
        Executive.prototype.mod_ab = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.aOperand.address !== 0) {
                bInstruction.bOperand.address = bInstruction.bOperand.address % aInstruction.aOperand.address;
            }
            else {
                this.dat(context);
            }
        };
        Executive.prototype.mod_ba = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.bOperand.address !== 0) {
                bInstruction.aOperand.address = bInstruction.aOperand.address % aInstruction.bOperand.address;
            }
            else {
                this.dat(context);
            }
        };
        Executive.prototype.mod_f = function (context) {
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
        };
        Executive.prototype.mod_x = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.bOperand.address !== 0) {
                bInstruction.aOperand.address = bInstruction.aOperand.address % aInstruction.bOperand.address;
            }
            else {
                this.dat(context);
            }
            if (aInstruction.aOperand.address !== 0) {
                bInstruction.bOperand.address = bInstruction.bOperand.address % aInstruction.aOperand.address;
            }
            else {
                this.dat(context);
            }
        };
        Executive.prototype.jmp = function (context) {
            context.task.instructionPointer = context.core.wrap(context.aPointer);
        };
        Executive.prototype.jmz_a = function (context) {
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (bInstruction.aOperand.address === 0) {
                context.task.instructionPointer = context.core.wrap(context.aPointer);
            }
        };
        Executive.prototype.jmz_b = function (context) {
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (bInstruction.bOperand.address === 0) {
                context.task.instructionPointer = context.core.wrap(context.aPointer);
            }
        };
        Executive.prototype.jmz_f = function (context) {
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (bInstruction.aOperand.address === 0 &&
                bInstruction.bOperand.address === 0) {
                context.task.instructionPointer = context.core.wrap(context.aPointer);
            }
        };
        Executive.prototype.jmn_a = function (context) {
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (bInstruction.aOperand.address !== 0) {
                context.task.instructionPointer = context.core.wrap(context.aPointer);
            }
        };
        Executive.prototype.jmn_b = function (context) {
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (bInstruction.bOperand.address !== 0) {
                context.task.instructionPointer = context.core.wrap(context.aPointer);
            }
        };
        Executive.prototype.jmn_f = function (context) {
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (bInstruction.aOperand.address !== 0 ||
                bInstruction.bOperand.address !== 0) {
                context.task.instructionPointer = context.core.wrap(context.aPointer);
            }
        };
        Executive.prototype.djn_a = function (context) {
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            var a = context.core.wrap(bInstruction.aOperand.address - 1);
            bInstruction.aOperand.address = a;
            if (a !== 0) {
                context.task.instructionPointer = context.core.wrap(context.aPointer);
            }
        };
        Executive.prototype.djn_b = function (context) {
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            var b = context.core.wrap(bInstruction.bOperand.address - 1);
            bInstruction.bOperand.address = b;
            if (b !== 0) {
                context.task.instructionPointer = context.core.wrap(context.aPointer);
            }
        };
        Executive.prototype.djn_f = function (context) {
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            var a = context.core.wrap(bInstruction.aOperand.address - 1);
            bInstruction.aOperand.address = a;
            var b = context.core.wrap(bInstruction.bOperand.address - 1);
            bInstruction.bOperand.address = b;
            if (a !== 0 || b !== 0) {
                context.task.instructionPointer = context.core.wrap(context.aPointer);
            }
        };
        Executive.prototype.seq_a = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.aOperand.address === bInstruction.aOperand.address) {
                context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
            }
        };
        Executive.prototype.seq_b = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.bOperand.address === bInstruction.bOperand.address) {
                context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
            }
        };
        Executive.prototype.seq_ab = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.aOperand.address === bInstruction.bOperand.address) {
                context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
            }
        };
        Executive.prototype.seq_ba = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.bOperand.address === bInstruction.aOperand.address) {
                context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
            }
        };
        Executive.prototype.seq_f = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.aOperand.address === bInstruction.aOperand.address &&
                aInstruction.bOperand.address === bInstruction.bOperand.address) {
                context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
            }
        };
        Executive.prototype.seq_x = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.aOperand.address === bInstruction.bOperand.address &&
                aInstruction.bOperand.address === bInstruction.aOperand.address) {
                context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
            }
        };
        Executive.prototype.seq_i = function (context) {
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
        };
        Executive.prototype.sne_a = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.aOperand.address !== bInstruction.aOperand.address) {
                context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
            }
        };
        Executive.prototype.sne_b = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.bOperand.address !== bInstruction.bOperand.address) {
                context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
            }
        };
        Executive.prototype.sne_ab = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.aOperand.address !== bInstruction.bOperand.address) {
                context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
            }
        };
        Executive.prototype.sne_ba = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.bOperand.address !== bInstruction.aOperand.address) {
                context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
            }
        };
        Executive.prototype.sne_f = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.aOperand.address !== bInstruction.aOperand.address ||
                aInstruction.bOperand.address !== bInstruction.bOperand.address) {
                context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
            }
        };
        Executive.prototype.sne_x = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.aOperand.address !== bInstruction.bOperand.address ||
                aInstruction.bOperand.address !== bInstruction.aOperand.address) {
                context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
            }
        };
        Executive.prototype.sne_i = function (context) {
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
        };
        Executive.prototype.slt_a = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.aOperand.address < bInstruction.aOperand.address) {
                context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
            }
        };
        Executive.prototype.slt_b = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.bOperand.address < bInstruction.bOperand.address) {
                context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
            }
        };
        Executive.prototype.slt_ab = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.aOperand.address < bInstruction.bOperand.address) {
                context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
            }
        };
        Executive.prototype.slt_ba = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.bOperand.address < bInstruction.aOperand.address) {
                context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
            }
        };
        Executive.prototype.slt_f = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.aOperand.address < bInstruction.aOperand.address &&
                aInstruction.bOperand.address < bInstruction.bOperand.address) {
                context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
            }
        };
        Executive.prototype.slt_x = function (context) {
            var aInstruction = context.core.readAt(context.task, context.aPointer);
            var bInstruction = context.core.readAt(context.task, context.bPointer);
            if (aInstruction.aOperand.address < bInstruction.bOperand.address &&
                aInstruction.bOperand.address < bInstruction.aOperand.address) {
                context.task.instructionPointer = context.core.wrap(context.task.instructionPointer + 1);
            }
        };
        Executive.prototype.spl = function (context) {
            if (context.warrior.tasks.length < this.instructionLimit) {
                context.warrior.tasks.splice(context.warrior.taskIndex, 0, {
                    instructionPointer: context.core.wrap(context.aPointer),
                    warrior: context.warrior
                });
                context.warrior.taskIndex = (context.warrior.taskIndex + 1) % context.warrior.tasks.length;
            }
        };
        Executive.prototype.nop = function (context) {
        };
        return Executive;
    })();
    exports.Executive = Executive;
});
//# sourceMappingURL=Executive.js.map