import { ICore } from "@simulator/interface/ICore";
import { IInstruction } from "@simulator/interface/IInstruction";
import { ITask } from "@simulator/interface/ITask";
import { IWarrior } from "@simulator/interface/IWarrior";
import { IOperand } from "@simulator/interface/IOperand";

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