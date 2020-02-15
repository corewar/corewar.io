import { IWarriorInstance } from "@simulator/interface/IWarriorInstance";

export interface ITask {

    warrior: IWarriorInstance;
    instructionPointer: number;
}