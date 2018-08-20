import { IInstruction } from "./IInstruction";

export interface IOptions {

    coresize?: number;
    maximumCycles?: number;
    initialInstruction?: IInstruction;
    instructionLimit?: number;
    maxTasks?: number;
    minSeparation?: number;
    standard?: number;
    // TODO readDistance?: number;
    // TODO separation?: number;
    // TODO writeDistance?: number;
}