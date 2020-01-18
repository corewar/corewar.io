import { IMatchWarriorResult } from "@matches/interface/IMatchWarriorResult";

export interface IMatchResult {

    rounds: number;
    warriors: IMatchWarriorResult[];
}