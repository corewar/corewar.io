import { IHillRunner } from "@matches/interface/IHillRunner";
import { IHillResult } from "@matches/interface/IHillResult";
import { IHillResultMapper } from "@matches/interface/IHillResultMapper";
import { IPublisher } from "@simulator/interface/IPublisher";
import { MessageType } from "@simulator/interface/IMessage";
import { IMatchRunner } from "./interface/IMatchRunner";
import IWarrior from "@simulator/interface/IWarrior";
import { IRules } from "./interface/IRules";

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

    private publishEnd(result: IHillResult): void {

        this.publisher.queue({
            type: MessageType.HillEnd,
            payload: result
        });
        this.publisher.publish();
    }

    public run(rules: IRules, warriors: IWarrior[]): IHillResult {

        const matchResults = [];

        for (let i = 0; i < warriors.length; i++) {
            if (typeof (warriors[i].internalId) === "undefined") {
                warriors[i].internalId = i;
            }
        }

        for (const warriorA of warriors) {
            for (const warriorB of warriors) {
                if (warriorA === warriorB) {
                    continue;
                }

                matchResults.push(
                    this.matchRunner.run(rules, [warriorA, warriorB])
                );
            }
        }

        const result = this.hillResultMapper.map(warriors, matchResults);

        this.publishEnd(result);

        return result;
    }
}