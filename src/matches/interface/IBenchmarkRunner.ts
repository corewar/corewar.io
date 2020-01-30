import { IHillWarrior } from "@matches/interface/IHillWarrior";
import { IHill } from "@matches/interface/IHill";

export interface IBenchmarkRunner {

    run(warrior: IHillWarrior, benchmark: IHill): IBenchmarkResult;
}