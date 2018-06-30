import { IMatchRunner } from "./interface/IMatchRunner";
import { IMatch } from "./interface/IMatch";
import { IMatchResult } from "./interface/IMatchResult";
import { ISimulator } from "../simulator/interface/ISimulator";
import { IPublisher } from "../simulator/interface/IPublisher";

export class MatchRunner implements IMatchRunner {

    private simulator: ISimulator;
    private publisher: IPublisher;

    constructor(simulator: ISimulator, publisher: IPublisher) {

        this.simulator = simulator;
        this.publisher = publisher;
    }

    run(match: IMatch): IMatchResult {

        

        for (let i = 0; i < match.rounds; i++) {

            this.simulator.initialise(match.options, match.warriors);
            this.simulator.run();
        }

        return null;
    }
}