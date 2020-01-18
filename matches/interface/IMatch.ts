import { IRules } from "@matches/interface/IRules";
import { IMatchWarrior } from "@matches/interface/IMatchWarrior";

export interface IMatch {

    rules: IRules;
    warriors: IMatchWarrior[];
}