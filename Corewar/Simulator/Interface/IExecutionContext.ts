import { ICore } from "./ICore";
import { IInstruction } from "./IInstruction";
import { ITask } from "./ITask";
import { IWarrior } from "./IWarrior";

export interface IExecutionContext {

    core?: ICore;

    instructionPointer?: number;
    instruction?: IInstruction;

    command?: (context: IExecutionContext) => void;
    aPointer?: number;
    bPointer?: number;

    taskIndex?: number;
    task?: ITask;

    warriorIndex?: number;
    warrior?: IWarrior;
}