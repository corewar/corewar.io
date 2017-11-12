import { ITask } from "./ITask";

export interface IWarrior {

    name: string;
    author: string;
    strategy: string;

    taskIndex: number;
    tasks: ITask[];

    startAddress: number;
} 