import { IEndCondition } from "@simulator/interface/IEndCondition";
import { IState } from "@simulator/interface/IState";
import { IWarrior } from "@simulator/interface/IWarrior";
import { MessageType } from "@simulator/interface/IMessage";
import { IPublisher } from "@simulator/interface/IPublisher";
import { IRoundResult } from "@simulator/interface/IRoundResult";

export class EndCondition implements IEndCondition {

    private publisher: IPublisher;

    constructor(publisher: IPublisher) {

        this.publisher = publisher;
    }

    private buildRoundResult(outcome: string, winner: IWarrior = null): IRoundResult {

        const result = {
            winnerId: winner && winner.id,
            outcome
        };
        if (winner && winner.data) {
            result["winnerData"] = winner.data;
        }

        return result;
    }

    private publishRoundEnd(payload: IRoundResult) {

        this.publisher.queue({
            type: MessageType.RoundEnd,
            payload
        });
    }

    private publishProgress(cycle: number, maximumCycles: number) {

        this.publisher.queue({
            type: MessageType.RunProgress,
            payload: {
                runProgress: cycle / maximumCycles * 100.0,
                cycle,
                maximumCycles
            }
        });
    }

    public check(state: IState): IRoundResult {

        if (state.cycle >= state.options.maximumCycles) {
            const result = this.buildRoundResult("DRAW");
            this.publishRoundEnd(result);
            return result;
        }

        this.publishProgress(state.cycle, state.options.maximumCycles);
        
        const liveWarriors = state.warriors.filter((warrior: IWarrior) => warrior.tasks.length > 0);
        
        if (state.warriors.length === 1) {
            if (liveWarriors.length === 0) {
                const result = this.buildRoundResult("NONE");
                this.publishRoundEnd(result);
                return result;
            }
        } else if (liveWarriors.length === 1) {
            const result = this.buildRoundResult("WIN", liveWarriors[0]);
            this.publishRoundEnd(result);
            return result;
        }

        return null;
    }
}