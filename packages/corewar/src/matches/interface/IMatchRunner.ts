import { IMatchResult } from "@matches/interface/IMatchResult";
import { IRules } from "./IRules";
import IWarrior from "@simulator/interface/IWarrior";

export interface IMatchRunner {

    run(rules: IRules, warriors: IWarrior[]): IMatchResult;
}
