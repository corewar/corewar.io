import { IOptions } from "@simulator/interface/IOptions";
import { IWarriorInstance } from "@simulator/interface/IWarriorInstance";
import IWarrior from "@simulator/interface/IWarrior";

export interface ILoader {

    load(warriors: IWarrior[], options: IOptions): IWarriorInstance[];
}