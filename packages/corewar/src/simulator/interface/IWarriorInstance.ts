import { ITask } from "@simulator/interface/ITask";
import IWarrior from "./IWarrior";

export interface IWarriorInstance {

    name: string;
    author: string;
    strategy: string;

    taskIndex: number;
    tasks: ITask[];

    startAddress: number;

    warrior: IWarrior;
} 