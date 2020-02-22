import { IMatchRunner } from "@matches/interface/IMatchRunner";
import IWarrior from "@simulator/interface/IWarrior";
import { ISimulator } from "@simulator/interface/ISimulator";
import { IPublisher } from "@simulator/interface/IPublisher";
import { MessageType } from "@simulator/interface/IMessage";
import { IMatchResultMapper } from "@matches/interface/IMatchResultMapper";
import { IMatchResult } from "@matches/interface/IMatchResult";
import { IRules } from "./interface/IRules";

export class MatchRunner implements IMatchRunner {

    private simulator: ISimulator;
    private publisher: IPublisher;
    private matchResultMapper: IMatchResultMapper;

    constructor(
        simulator: ISimulator,
        matchResultMapper: IMatchResultMapper,
        publisher: IPublisher) {

        this.simulator = simulator;
        this.matchResultMapper = matchResultMapper;
        this.publisher = publisher;
    }

    private publishEnd(result): void {

        this.publisher.queue({
            type: MessageType.MatchEnd,
            payload: result
        });
        this.publisher.publish();
    }

    public run(rules: IRules, warriors: IWarrior[]): IMatchResult {

        for (let i = 0; i < warriors.length; i++) {
            if (typeof (warriors[i].internalId) === "undefined") {
                warriors[i].internalId = i;
            }
        }

        const roundResults = [];
        for (let i = 0; i < rules.rounds; i++) {

            this.simulator.initialise(rules.options, warriors);
            const roundResult = this.simulator.run();

            if (!roundResult) {
                throw new Error("Round ended without returning a result");
            }

            roundResults.push(roundResult);
        }

        const result = this.matchResultMapper.map(warriors, roundResults);

        this.publishEnd(result);

        return result;
    }
}