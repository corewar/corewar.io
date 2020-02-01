import { IOperand } from "@simulator/interface/IOperand";

export enum OpcodeType {
    DAT = "DAT",
    MOV = "MOV",
    ADD = "ADD",
    SUB = "SUB",
    MUL = "MUL",
    DIV = "DIV",
    MOD = "MOD",
    JMP = "JMP",
    JMZ = "JMZ",
    JMN = "JMN",
    DJN = "DJN",
    CMP = "CMP",
    SEQ = "SEQ",
    SNE = "SNE",
    SLT = "SLT",
    SPL = "SPL",
    NOP = "NOP"
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