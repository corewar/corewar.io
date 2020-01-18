import { IOperand } from "@simulator/interface/IOperand";

export enum OpcodeType {
    DAT = 0,
    MOV,
    ADD,
    SUB,
    MUL,
    DIV,
    MOD,
    JMP,
    JMZ,
    JMN,
    DJN,
    CMP,
    SEQ,
    SNE,
    SLT,
    SPL,
    NOP,
    Count
}

export enum ModifierType {
    A = 0,
    B,
    AB,
    BA,
    F,
    X,
    I,
    Count
}

export interface IInstruction {

    address: number;
    opcode: OpcodeType;
    modifier: ModifierType;
    aOperand: IOperand;
    bOperand: IOperand;
} 