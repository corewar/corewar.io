"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IInstruction_1 = require("../../simulator/interface/IInstruction");
const IOperand_1 = require("../../simulator/interface/IOperand");
class InstructionSerialiser {
    serialise(instruction) {
        return this.serialiseOpcode(instruction) + "." +
            this.serialiseModifier(instruction) + " " +
            this.serialiseOperand(instruction.aOperand) + ", " +
            this.serialiseOperand(instruction.bOperand);
    }
    serialiseOpcode(instruction) {
        switch (instruction.opcode) {
            case IInstruction_1.OpcodeType.ADD:
                return "ADD";
            case IInstruction_1.OpcodeType.CMP:
                return "CMP";
            case IInstruction_1.OpcodeType.DAT:
                return "DAT";
            case IInstruction_1.OpcodeType.DIV:
                return "DIV";
            case IInstruction_1.OpcodeType.DJN:
                return "DJN";
            case IInstruction_1.OpcodeType.JMN:
                return "JMN";
            case IInstruction_1.OpcodeType.JMP:
                return "JMP";
            case IInstruction_1.OpcodeType.JMZ:
                return "JMZ";
            case IInstruction_1.OpcodeType.MOD:
                return "MOD";
            case IInstruction_1.OpcodeType.MOV:
                return "MOV";
            case IInstruction_1.OpcodeType.MUL:
                return "MUL";
            case IInstruction_1.OpcodeType.NOP:
                return "NOP";
            case IInstruction_1.OpcodeType.SEQ:
                return "SEQ";
            case IInstruction_1.OpcodeType.SLT:
                return "SLT";
            case IInstruction_1.OpcodeType.SNE:
                return "SNE";
            case IInstruction_1.OpcodeType.SPL:
                return "SPL";
            case IInstruction_1.OpcodeType.SUB:
                return "SUB";
        }
        throw "Unknown Opcode provided to InstructionSerialiser";
    }
    serialiseModifier(instruction) {
        switch (instruction.modifier) {
            case IInstruction_1.ModifierType.A:
                return "A";
            case IInstruction_1.ModifierType.B:
                return "B";
            case IInstruction_1.ModifierType.AB:
                return "AB";
            case IInstruction_1.ModifierType.BA:
                return "BA";
            case IInstruction_1.ModifierType.F:
                return "F";
            case IInstruction_1.ModifierType.I:
                return "I";
            case IInstruction_1.ModifierType.X:
                return "X";
        }
        throw "Unknown Modifier provided to InstructionSerialiser";
    }
    serialiseOperand(operand) {
        return this.serialiseMode(operand.mode) +
            this.serialiseAddress(operand.address);
    }
    serialiseMode(mode) {
        switch (mode) {
            case IOperand_1.ModeType.AIndirect:
                return "*";
            case IOperand_1.ModeType.APostIncrement:
                return "}";
            case IOperand_1.ModeType.APreDecrement:
                return "{";
            case IOperand_1.ModeType.BIndirect:
                return "@";
            case IOperand_1.ModeType.BPostIncrement:
                return ">";
            case IOperand_1.ModeType.BPreDecrement:
                return "<";
            case IOperand_1.ModeType.Direct:
                return "$";
            case IOperand_1.ModeType.Immediate:
                return "#";
        }
        throw "Unknown Mode provided to InstructionSerialiser";
    }
    serialiseAddress(address) {
        return address.toString();
    }
}
exports.InstructionSerialiser = InstructionSerialiser;
