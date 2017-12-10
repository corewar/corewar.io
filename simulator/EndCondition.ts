import { IEndCondition } from "./interface/IEndCondition";
import { IState } from "./interface/IState";
import { IWarrior } from "./interface/IWarrior";

export class EndCondition implements IEndCondition {

    private pubSubProvider: any;

    public setMessageProvider(provider: any) {
        this.pubSubProvider = provider;
    }

    private publishRoundEnd(outcome: string, winnerId: number = null) {
        if (!this.pubSubProvider) {
            return;
        }

        this.pubSubProvider.publishSync('RUN_PROGRESS', {
            runProgress: 100
        });

        this.pubSubProvider.publishSync('ROUND_END', {
            winnerId,
            outcome
        });
    }

    private publishProgress(progress: number) {
        if (this.pubSubProvider) {
            this.pubSubProvider.publishSync('RUN_PROGRESS', {
                runProgress: progress
            });
        }
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