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

    private publishRoundEnd(outcome: string, winnerId: number = null) {

        this.publisher.publish({
            type: MessageType.RunProgress,
            payload: {
                runProgress: 100
            }
        });

        this.publisher.publish({
            type: MessageType.RoundEnd,
            payload: {
                winnerId,
                outcome
            }
        });
    }

    private publishProgress(progress: number) {

        this.publisher.publish({
            type: MessageType.RunProgress,
            payload: {
                runProgress: progress
            }
        });
    }

    public check(state: IState): boolean {

        if (state.cycle === state.options.cyclesBeforeTie) {
            this.publishRoundEnd('DRAW');
            return true;
        }

        if ((state.cycle % (state.options.cyclesBeforeTie / 100)) === 0) {
            this.publishProgress(state.cycle / (state.options.cyclesBeforeTie / 100));
        }

        const liveWarriors = state.warriors.filter((warrior: IWarrior) => warrior.tasks.length > 0);
        let result = liveWarriors.length === 1;

        if (state.warriors.length === 1) {
            if (liveWarriors.length === 0) {
                this.publishRoundEnd('NONE');
                return true;
            }
        } else if (liveWarriors.length === 1) {
            this.publishRoundEnd('WIN', liveWarriors[0].id);
            return true;
        }

        return false;
    }
}