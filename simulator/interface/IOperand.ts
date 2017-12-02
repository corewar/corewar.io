
export enum ModeType {
    Immediate,      // #
    Direct,         // $
    AIndirect,      // *
    BIndirect,      // @
    APreDecrement,  // {
    BPreDecrement,  // <
    APostIncrement, // }
    BPostIncrement, // >
    Count
}

export interface IOperand {

    mode: ModeType;
    address: number;
}