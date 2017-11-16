"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
class EndCondition {
    check(state) {
        if (state.cycle === state.options.cyclesBeforeTie) {
            return true;
        }
        var liveWarriors = _(state.warriors).filter((warrior) => warrior.tasks.length > 0);
        if (state.warriors.length > 1) {
            return liveWarriors.length === 1;
        }
        else {
            return liveWarriors.length === 0;
        }
    }
}
exports.EndCondition = EndCondition;
