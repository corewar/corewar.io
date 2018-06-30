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

        for (let i = 0; i < match.warriors.length; i++) {
            match.warriors[i].data.matchId = i;
        }

        const matchResult: IMatchResult = {
            results: match.warriors.map(w => {
                return {
                    warriorMatchId: w.data.matchId,
                    won: 0,
                    drawn: 0,
                    lost: 0
                }
            })
        };

        for (let i = 0; i < match.rounds; i++) {

            this.simulator.initialise(match.options, match.warriors);
            const roundResult = this.simulator.run();

            if (!roundResult) {
                throw new Error("Round ended without returning a result");
            }

            matchResult.results.forEach(warriorMatchResult => {
                if (roundResult.winnerId === warriorMatchResult.warriorMatchId) {
                    warriorMatchResult.won += 1;
                } else if (roundResult.outcome === "DRAW") {
                    warriorMatchResult.drawn += 1;
                } else {
                    warriorMatchResult.lost += 1;
                }
            })
        }

        return null;
    }
}