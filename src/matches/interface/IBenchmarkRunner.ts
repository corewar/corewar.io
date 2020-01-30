import { IHillWarrior } from "@matches/interface/IHillWarrior";
import { IHill } from "@matches/interface/IHill";
import { IHillResult } from "@matches/interface/IHillResult";

export interface IBenchmarkRunner {

    run(warrior: IHillWarrior, benchmark: IHill): IHillResult;
}