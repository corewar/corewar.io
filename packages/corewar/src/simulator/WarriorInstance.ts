import { IWarriorInstance } from "@simulator/interface/IWarriorInstance";
import { ITask } from "@simulator/interface/ITask";
import IWarrior from "./interface/IWarrior";

export class WarriorInstance implements IWarriorInstance {

    public id: number;

    public name: string;
    public author: string;
    public strategy: string;

    public taskIndex: number;
    public tasks: ITask[];

    public startAddress: number;

    public warrior: IWarrior;

    constructor() {
        this.id = 0;
        this.name = "";
        this.author = "";
        this.strategy = "";
        this.taskIndex = 0;
        this.tasks = [];
        this.startAddress = 0;
        this.warrior = null;
    }
}