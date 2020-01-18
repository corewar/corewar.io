import { IWarrior } from "@simulator/interface/IWarrior";
import { ITask } from "@simulator/interface/ITask";

export class Warrior implements IWarrior {

    public id: number;

    public name: string;
    public author: string;
    public strategy: string;

    public taskIndex: number;
    public tasks: ITask[];

    public startAddress: number;

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