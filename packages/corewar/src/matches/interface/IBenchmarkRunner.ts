import { IHillResult } from "@matches/interface/IHillResult";
import { IRules } from "@matches/interface/IRules";
import IWarrior from "@simulator/interface/IWarrior";

export interface IBenchmarkRunner {

    run(warrior: IWarrior, rules: IRules, warriors: IWarrior[]): IHillResult;
}