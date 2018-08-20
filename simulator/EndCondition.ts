import { IEndCondition } from "./interface/IEndCondition";
import { IState } from "./interface/IState";
import { IWarrior } from "./interface/IWarrior";
import { MessageType } from "./interface/IMessage";
import { IPublisher } from "./interface/IPublisher";

export class EndCondition implements IEndCondition {

    private publisher: IPublisher;

    constructor(publisher: IPublisher) {

        this.publisher = publisher;
    }

    private publishRoundEnd(outcome: string, winner: IWarrior = null) {

        this.publisher.queue({
            type: MessageType.RunProgress,
            payload: {
                runProgress: 100
            }
        });

        const payload =  {
            winnerId: winner && winner.id,
            outcome
        };
        if (winner && winner.data) {
            payload["winnerData"] = winner.data;
        }

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

    public check(state: IState): boolean {

        if (state.cycle >= state.options.cyclesBeforeTie) {
            this.publishRoundEnd('DRAW');
            return true;
        }

        if ((state.cycle % (state.options.cyclesBeforeTie / 100)) === 0) {
            this.publishProgress(state.cycle, state.options.cyclesBeforeTie);
        }

        const liveWarriors = state.warriors.filter((warrior: IWarrior) => warrior.tasks.length > 0);
        
        if (state.warriors.length === 1) {
            if (liveWarriors.length === 0) {
                this.publishRoundEnd('NONE');
                return true;
            }
        } else if (liveWarriors.length === 1) {
            this.publishRoundEnd('WIN', liveWarriors[0]);
            return true;
        }

        return false;
    }
}