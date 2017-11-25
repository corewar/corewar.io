import { expect } from "chai";
import * as sinon from "sinon";

import { ITask } from "../interface/ITask";
import { ICore, ICoreAccessEventArgs, CoreAccessType } from "../interface/ICore";
import { ILiteEvent, LiteEvent } from "../../modules/LiteEvent";
import { IWarrior } from "../interface/IWarrior";
import { IState } from "../interface/IState";
import Defaults from "../Defaults";
import { EndCondition } from "../EndCondition";
import DataHelper from "./DataHelper";
import * as _ from "underscore";

"use strict";

describe("EndCondition",() => {

    function buildTask(warrior: IWarrior): ITask {

        return {
            instructionPointer: 0,
            warrior: warrior
        };
    }

    function buildWarrior(): IWarrior {

        var warrior = {
            author: "",
            name: "",
            startAddress: 0,
            strategy: "",
            taskIndex: 0,
            tasks: []
        };

        warrior.tasks.push(buildTask(warrior));
        warrior.tasks.push(buildTask(warrior));

        return warrior;
    }

    function buildState(): IState {

        return {
            core: {
                getSize: () => { return 0; },
                coreAccess: new LiteEvent<ICoreAccessEventArgs>(),
                executeAt: sinon.stub(),
                readAt: sinon.stub(),
                getAt: sinon.stub(),
                setAt: sinon.stub(),
                wrap: sinon.stub(),
                initialise: sinon.stub()
            },
            cycle: 0,
            options: _.clone(Defaults),
            warriorIndex: 0,
            warriors: [
                buildWarrior(),
                buildWarrior()
            ]
        };
    }

    it("returns false if there are multiple active warriors and the maximum number of cycles has not elapsed",() => {

        var state = buildState();

        var endCondition = new EndCondition();

        var actual = endCondition.check(state);

        expect(actual).to.be.equal(false);
    });

    it("returns true if the maximum number of cylces have elapsed",() => {

        var state = buildState();

        state.cycle = 123;
        state.options.cyclesBeforeTie = 123;

        var endCondition = new EndCondition();

        var actual = endCondition.check(state);

        expect(actual).to.be.equal(true);
    });

    it("returns true if there are multiple warriors and only one with active tasks",() => {

        var state = buildState();

        _(state.warriors).first().tasks = [];

        var endCondition = new EndCondition();

        var actual = endCondition.check(state);

        expect(actual).to.be.equal(true);
    });

    it("returns false if there is only one warrior and it has active tasks",() => {

        var state = buildState();

        state.warriors.pop();

        var endCondition = new EndCondition();

        var actual = endCondition.check(state);

        expect(actual).to.be.equal(false);
    });

    it("returns true if there is only one warrior and it has no active tasks",() => {

        var state = buildState();

        state.warriors.pop();
        _(state.warriors).first().tasks = [];

        var endCondition = new EndCondition();

        var actual = endCondition.check(state);

        expect(actual).to.be.equal(true);
    });
});