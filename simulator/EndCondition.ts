import { IEndCondition } from "./interface/IEndCondition";
import { IState } from "./interface/IState";
import { IWarrior } from "./interface/IWarrior";
import { MessageType } from "./interface/IMessage";
import { IPublisher } from "./interface/IPublisher";
import { IRoundResult } from "./interface/IRoundResult";

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
            type: MessageType.RunProgress,
            payload: {
                runProgress: 100
            }
        });

        this.publisher.queue({
            type: MessageType.RoundEnd,
            payload
        });
    }

    private publishProgress(progress: number) {

        this.publisher.queue({
            type: MessageType.RunProgress,
            payload: {
                runProgress: progress
            }
        });
    }

    public check(state: IState): IRoundResult {

        if (state.cycle >= state.options.cyclesBeforeTie) {
            const result = this.buildRoundResult("DRAW");
            this.publishRoundEnd(result);
            return result;
        }

        if ((state.cycle % (state.options.cyclesBeforeTie / 100)) === 0) {
            this.publishProgress(state.cycle / (state.options.cyclesBeforeTie / 100));
        }

        const liveWarriors = state.warriors.filter((warrior: IWarrior) => warrior.tasks.length > 0);
        let result = liveWarriors.length === 1;

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