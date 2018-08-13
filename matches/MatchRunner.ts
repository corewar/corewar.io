import { IMatchRunner } from "./interface/IMatchRunner";
import { IMatch } from "./interface/IMatch";
import { ISimulator } from "../simulator/interface/ISimulator";
import { IPublisher } from "../simulator/interface/IPublisher";

export class MatchRunner implements IMatchRunner {

    private simulator: ISimulator;
    private publisher: IPublisher;

    constructor(simulator: ISimulator, publisher: IPublisher) {

        this.simulator = simulator;
        this.publisher = publisher;
    }

    run(match: IMatch): IMatch {

        for (let i = 0; i < match.warriors.length; i++) {
            const warrior = match.warriors[i];
            warrior.source.data.warriorMatchId = i;
            warrior.warriorMatchId = i;
            warrior.wins = 0;
        }

        for (let i = 0; i < match.rules.rounds; i++) {

            this.simulator.initialise(match.rules.options, match.warriors.map(w => w.source));
            const roundResult = this.simulator.run();

            if (!roundResult) {
                throw new Error("Round ended without returning a result");
            }

            if (roundResult.outcome === "WIN") {
                
                const winner = match.warriors
                    .find(w => w.warriorMatchId === roundResult.winnerData.warriorMatchId);

                winner.wins += 1;
            }
        }

        return match;
    }
}