import { IOptions } from "@simulator/interface/IOptions";
import { IWarrior } from "@simulator/interface/IWarrior";

export interface IState {

    options: IOptions;
    cycle: number;
    warriorIndex: number;
    warriors: IWarrior[];
}