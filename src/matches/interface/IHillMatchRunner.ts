import { IHillWarrior } from "@matches/interface/IHillWarrior";
import { IMatchResult } from "@matches/interface/IMatchResult";
import { IRules } from "@matches/interface/IRules";

export interface IHillMatchRunner {
    run(rules: IRules, warriorA: IHillWarrior, warriorB: IHillWarrior): IMatchResult;
}
