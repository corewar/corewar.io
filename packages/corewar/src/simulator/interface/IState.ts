import { IOptions } from "@simulator/interface/IOptions";
import { IWarriorInstance } from "@simulator/interface/IWarriorInstance";

export interface IState {

    options: IOptions;
    cycle: number;
    warriorIndex: number;
    instances: IWarriorInstance[];
}