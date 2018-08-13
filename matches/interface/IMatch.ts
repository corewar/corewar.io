import { IRules } from "./IRules";
import { IMatchWarrior } from "./IMatchWarrior";

export interface IMatch {

    rules: IRules;
    warriors: IMatchWarrior[];
}