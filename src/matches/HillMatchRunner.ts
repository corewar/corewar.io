import { IHillMatchRunner } from "@matches/interface/IHillMatchRunner";
import { IHillWarrior } from "@matches/interface/IHillWarrior";
import { IMatchResult } from "@matches/interface/IMatchResult";
import { IMatchRunner } from "@matches/interface/IMatchRunner";
import { IRules } from "@matches/interface/IRules";

export class HillMatchRunner implements IHillMatchRunner {

    private matchRunner: IMatchRunner;

    constructor(matchRunner: IMatchRunner) {
        this.matchRunner = matchRunner;
    }

    run(rules: IRules, warriorA: IHillWarrior, warriorB: IHillWarrior): IMatchResult {
        
        return this.matchRunner.run({
            rules,
            warriors: [
                { source: warriorA.source },
                { source: warriorB.source }
            ]
        });
    }
}