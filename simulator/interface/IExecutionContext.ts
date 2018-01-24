import { ICore } from "./ICore";
import { IInstruction } from "./IInstruction";
import { ITask } from "./ITask";
import { IWarrior } from "./IWarrior";
import { IOperand } from "./IOperand";

export interface IOperandPair {
    destination: IOperand;
    source: IOperand;
}

export interface IExecutionContext {

    core?: ICore;

    instructionPointer?: number;
    instruction?: IInstruction;

    command?: (context: IExecutionContext) => void;

    operands: IOperandPair[];
    
    aInstruction?: IInstruction;
    bInstruction?: IInstruction;

    taskIndex?: number;
    task?: ITask;

    warriorIndex?: number;
    warrior?: IWarrior;
}