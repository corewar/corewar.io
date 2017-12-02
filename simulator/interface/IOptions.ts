import { IInstruction } from "./IInstruction";

export interface IOptions {

    coresize?: number;
    cyclesBeforeTie?: number;
    initialInstruction?: IInstruction;
    instructionLimit?: number;
    maxTasks?: number;
    minSeparation?: number;
    standard?: number;
    // TODO readDistance?: number;
    // TODO separation?: number;
    // TODO writeDistance?: number;
}