
export enum ModeType {
    Immediate = "#",
    Direct = "$",
    AIndirect = "*",
    BIndirect = "@",
    APreDecrement = "{",
    BPreDecrement = "<",
    APostIncrement = "}",
    BPostIncrement = ">"
}

export interface IOperand {

    mode: ModeType;
    address: number;
}