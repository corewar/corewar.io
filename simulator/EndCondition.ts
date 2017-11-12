import { IEndCondition } from "./interface/IEndCondition";
import { IState } from "./interface/IState";
import { IWarrior } from "./interface/IWarrior";
import * as _ from "underscore";

export class EndCondition implements IEndCondition {

    public check(state: IState): boolean {

        if (state.cycle === state.options.cyclesBeforeTie) {
            return true;
        }

        var liveWarriors = _(state.warriors).filter((warrior: IWarrior) => warrior.tasks.length > 0);

        if (state.warriors.length > 1) {
            return liveWarriors.length === 1;
        } else {
            return liveWarriors.length === 0;
        }
    }
}