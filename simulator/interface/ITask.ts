import { IWarrior } from "@simulator/interface/IWarrior";

export interface ITask {

    warrior: IWarrior;
    instructionPointer: number;
}