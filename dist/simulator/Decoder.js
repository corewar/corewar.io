"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IInstruction_1 = require("./interface/IInstruction");
class Decoder {
    constructor(executive) {
        this.modeTable = [
            this.immediate,
            this.direct,
            this.aIndirect,
            this.bIndirect,
            this.aPreDecrement,
            this.bPreDecrement,
            this.aPostIncrement,
            this.bPostIncrement // >
        ];
        this.executive = executive;
    }
    decode(context) {
        var aAccessor = this.modeTable[context.instruction.aOperand.mode];
        var bAccessor = this.modeTable[context.instruction.bOperand.mode];
        context.aPointer = aAccessor(context.task, context.instructionPointer, context.instruction.aOperand, context.core);
        context.bPointer = bAccessor(context.task, context.instructionPointer, context.instruction.bOperand, context.core);
        context.command = this.executive.commandTable[context.instruction.opcode * IInstruction_1.ModifierType.Count + context.instruction.modifier];
        return context;
    }
    immediate(task, ip, operand, core) {
        return ip;
    }
    direct(task, ip, operand, core) {
        return ip + operand.address;
    }
    aIndirect(task, ip, operand, core) {
        var ipa = ip + operand.address;
        return ipa + core.readAt(task, ipa).aOperand.address;
    }
    bIndirect(task, ip, operand, core) {
        var ipa = ip + operand.address;
        return ipa + core.readAt(task, ipa).bOperand.address;
    }
    aPreDecrement(task, ip, operand, core) {
        var ipa = ip + operand.address;
        var instruction = core.readAt(task, ipa);
        var value = instruction.aOperand.address;
        var result = ipa + --value;
        instruction.aOperand.address = value;
        core.setAt(task, ipa, instruction);
        return result;
    }
    bPreDecrement(task, ip, operand, core) {
        var ipa = ip + operand.address;
        var instruction = core.readAt(task, ipa);
        var value = instruction.bOperand.address;
        var result = ipa + --value;
        instruction.bOperand.address = value;
        core.setAt(task, ipa, instruction);
        return result;
    }
    aPostIncrement(task, ip, operand, core) {
        var ipa = ip + operand.address;
        var instruction = core.readAt(task, ipa);
        var value = instruction.aOperand.address;
        var result = ipa + value++;
        instruction.aOperand.address = value;
        core.setAt(task, ipa, instruction);
        return result;
    }
    bPostIncrement(task, ip, operand, core) {
        var ipa = ip + operand.address;
        var instruction = core.readAt(task, ipa);
        var value = instruction.bOperand.address;
        var result = ipa + value++;
        instruction.bOperand.address = value;
        core.setAt(task, ipa, instruction);
        return result;
    }
}
exports.Decoder = Decoder;
