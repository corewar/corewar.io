import { IMatchRunner } from "@matches/interface/IMatchRunner";
import { IMatch } from "@matches/interface/IMatch";
import { ISimulator } from "@simulator/interface/ISimulator";
import { IPublisher } from "@simulator/interface/IPublisher";
import { MessageType } from "@simulator/interface/IMessage";
import { IMatchResultMapper } from "@matches/interface/IMatchResultMapper";
import { IMatchResult } from "@matches/interface/IMatchResult";

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

    run(match: IMatch): IMatchResult {

        for (let i = 0; i < match.warriors.length; i++) {
            const warrior = match.warriors[i];
            warrior.warriorMatchId = i;
            warrior.wins = 0;
        }

        for (let i = 0; i < match.rules.rounds; i++) {

            this.simulator.initialise(match.rules.options, match.warriors.map(w => ({ 
                source: w.source,
                data: { warriorMatchId: w.warriorMatchId }
            })));
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

        const result = this.matchResultMapper.map(match);

        this.publishEnd(result);

        return result;
    }
}