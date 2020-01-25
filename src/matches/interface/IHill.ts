import { IHillWarrior } from "@matches/interface/IHillWarrior";
import { IRules } from "@matches/interface/IRules";

export interface IHill {

    rules: IRules;
    warriors: IHillWarrior[];
}