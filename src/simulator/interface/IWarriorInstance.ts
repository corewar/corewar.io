import { ITask } from "@simulator/interface/ITask";

export interface IWarriorInstance {

    id: number;
    
    name: string;
    author: string;
    strategy: string;

    taskIndex: number;
    tasks: ITask[];

    startAddress: number;

    /* eslint-disable-next-line */
    data?: any;
} 