/// <reference path="../references.ts" />
import { ITask } from "../../../corewar/Corewar/Simulator/Interface/ITask";
import { ICore, ICoreAccessEventArgs, CoreAccessType } from "../../../corewar/Corewar/Simulator/Interface/ICore";
import { ILiteEvent, LiteEvent } from "../../../corewar/Corewar/modules/LiteEvent";
import { IWarrior } from "../../../corewar/Corewar/Simulator/Interface/IWarrior";
import { IState } from "../../../corewar/Corewar/Simulator/Interface/IState";
import Defaults from "../../../corewar/Corewar/Simulator/Defaults";
import { EndCondition } from "../../../corewar/Corewar/Simulator/EndCondition";
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
                executeAt: jasmine.createSpy("executeAt"),
                readAt: jasmine.createSpy("readAt"),
                getAt: jasmine.createSpy("getAt"),
                setAt: jasmine.createSpy("setAt"),
                wrap: jasmine.createSpy("wrap"),
                initialise: jasmine.createSpy("initialise")
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

        expect(actual).toBe(false);
    });

    it("returns true if the maximum number of cylces have elapsed",() => {

        var state = buildState();

        state.cycle = 123;
        state.options.cyclesBeforeTie = 123;

        var endCondition = new EndCondition();

        var actual = endCondition.check(state);

        expect(actual).toBe(true);
    });

    it("returns true if there are multiple warriors and only one with active tasks",() => {

        var state = buildState();

        _(state.warriors).first().tasks = [];

        var endCondition = new EndCondition();

        var actual = endCondition.check(state);

        expect(actual).toBe(true);
    });

    it("returns false if there is only one warrior and it has active tasks",() => {

        var state = buildState();

        state.warriors.pop();

        var endCondition = new EndCondition();

        var actual = endCondition.check(state);

        expect(actual).toBe(false);
    });

    it("returns true if there is only one warrior and it has no active tasks",() => {

        var state = buildState();

        state.warriors.pop();
        _(state.warriors).first().tasks = [];

        var endCondition = new EndCondition();

        var actual = endCondition.check(state);

        expect(actual).toBe(true);
    });
});