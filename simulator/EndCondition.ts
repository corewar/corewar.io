import { IEndCondition } from "./Interface/IEndCondition";
import { IState } from "./Interface/IState";
import { IWarrior } from "./Interface/IWarrior";
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