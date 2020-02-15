import { IWarriorInstance } from "@simulator/interface/IWarriorInstance";
import { ITask } from "@simulator/interface/ITask";

export class Warrior implements IWarriorInstance {

    public id: number;

    public name: string;
    public author: string;
    public strategy: string;

    public taskIndex: number;
    public tasks: ITask[];

    public startAddress: number;

    /* eslint-disable-next-line */
    public data: any;

    constructor() {
        this.id = 0;
        this.name = "";
        this.author = "";
        this.strategy = "";
        this.taskIndex = 0;
        this.tasks = [];
        this.startAddress = 0;
        this.data = null;
    }
}