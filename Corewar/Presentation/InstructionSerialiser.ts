import { IInstructionSerialiser } from "./interface/IInstructionSerialiser";

import { IInstruction, OpcodeType, ModifierType } from "../../simulator/interface/IInstruction";
import { IOperand, ModeType } from "../../simulator/interface/IOperand";

export class InstructionSerialiser implements IInstructionSerialiser {

    public serialise(instruction: IInstruction): string {

        return this.serialiseOpcode(instruction) + "." +
            this.serialiseModifier(instruction) + " " +
            this.serialiseOperand(instruction.aOperand) + ", " +
            this.serialiseOperand(instruction.bOperand);
    }

    private serialiseOpcode(instruction: IInstruction): string {

        switch (instruction.opcode) {
            case OpcodeType.ADD:
                return "ADD";
            case OpcodeType.CMP:
                return "CMP";
            case OpcodeType.DAT:
                return "DAT";
            case OpcodeType.DIV:
                return "DIV";
            case OpcodeType.DJN:
                return "DJN";
            case OpcodeType.JMN:
                return "JMN";
            case OpcodeType.JMP:
                return "JMP";
            case OpcodeType.JMZ:
                return "JMZ";
            case OpcodeType.MOD:
                return "MOD";
            case OpcodeType.MOV:
                return "MOV";
            case OpcodeType.MUL:
                return "MUL";
            case OpcodeType.NOP:
                return "NOP";
            case OpcodeType.SEQ:
                return "SEQ";
            case OpcodeType.SLT:
                return "SLT";
            case OpcodeType.SNE:
                return "SNE";
            case OpcodeType.SPL:
                return "SPL";
            case OpcodeType.SUB:
                return "SUB";
        }

        throw "Unknown Opcode provided to InstructionSerialiser";
    }

    private serialiseModifier(instruction: IInstruction): string {

        switch (instruction.modifier) {
            case ModifierType.A:
                return "A";
            case ModifierType.B:
                return "B";
            case ModifierType.AB:
                return "AB";
            case ModifierType.BA:
                return "BA";
            case ModifierType.F:
                return "F";
            case ModifierType.I:
                return "I";
            case ModifierType.X:
                return "X";
        }

        throw "Unknown Modifier provided to InstructionSerialiser";
    }

    private serialiseOperand(operand: IOperand): string {

        return this.serialiseMode(operand.mode) +
            this.serialiseAddress(operand.address);
    }

    private serialiseMode(mode: ModeType): string {

        switch (mode) {
            case ModeType.AIndirect:
                return "*";
            case ModeType.APostIncrement:
                return "}";
            case ModeType.APreDecrement:
                return "{";
            case ModeType.BIndirect:
                return "@";
            case ModeType.BPostIncrement:
                return ">";
            case ModeType.BPreDecrement:
                return "<";
            case ModeType.Direct:
                return "$";
            case ModeType.Immediate:
                return "#";
        }

        throw "Unknown Mode provided to InstructionSerialiser";
    }

    private serialiseAddress(address: number): string {

        return address.toString();
    }
}