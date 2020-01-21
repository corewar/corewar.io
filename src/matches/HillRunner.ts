import { IHillRunner } from "@matches/interface/IHillRunner";
import { IHill } from "@matches/interface/IHill";
import { IHillResult } from "@matches/interface/IHillResult";
import { IMatchRunner } from "@matches/interface/IMatchRunner";
import { IHillWarrior } from "./interface/IHillWarrior";
import { IMatch } from "@matches/interface/IMatch";

export class HillRunner implements IHillRunner {

    private matchRunner: IMatchRunner; 

    constructor(matchRunner: IMatchRunner) {
        this.matchRunner = matchRunner;
    }

    private buildMatch(hill: IHill, warriorA: IHillWarrior, warriorB: IHillWarrior): IMatch {

        return {
            rules: hill.rules,
            warriors: [
                { source: warriorA.source },
                { source: warriorB.source }
            ]
        }
    }

    public run(hill: IHill): IHillResult {
        
        for(const warriorA of hill.warriors) {
            for(const warriorB of hill.warriors) {
                if (warriorA === warriorB) {
                    continue;
                }

                this.matchRunner.run(this.buildMatch(hill, warriorA, warriorB))
            }
        }

        return {
            rounds: 1,
            warriors: []
        }
    }
}