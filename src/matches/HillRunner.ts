import { IHillRunner } from "@matches/interface/IHillRunner";
import { IHill } from "@matches/interface/IHill";
import { IHillResult } from "@matches/interface/IHillResult";
import { IMatchRunner } from "@matches/interface/IMatchRunner";
import { IHillWarrior } from "./interface/IHillWarrior";
import { IMatch } from "@matches/interface/IMatch";
import { IHillResultMapper } from "./interface/IHillResultMapper";
import { IPublisher } from "@simulator/interface/IPublisher";
import { MessageType } from "@simulator/interface/IMessage";

export class HillRunner implements IHillRunner {

    private matchRunner: IMatchRunner;
    private hillResultMapper: IHillResultMapper;
    private publisher: IPublisher;

    constructor(
        publisher: IPublisher,
        matchRunner: IMatchRunner,
        hillResultMapper: IHillResultMapper) {

        this.publisher = publisher;
        this.matchRunner = matchRunner;
        this.hillResultMapper = hillResultMapper;
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

    private publishEnd(result: IHillResult): void {

        this.publisher.queue({
            type: MessageType.HillEnd,
            payload: result
        });
        this.publisher.publish();
    }

    public run(hill: IHill): IHillResult {

        const matchResults = [];

        for (const warriorA of hill.warriors) {
            for (const warriorB of hill.warriors) {
                if (warriorA === warriorB) {
                    continue;
                }

                matchResults.push(
                    this.matchRunner.run(this.buildMatch(hill, warriorA, warriorB))
                );
            }
        }

        const result = this.hillResultMapper.map(hill, matchResults);

        this.publishEnd(result);

        return result;
    }
}