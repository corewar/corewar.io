/// <reference path="references.ts" />
import { IState } from "../interface/IState";
import { ICore, ICoreAccessEventArgs, CoreAccessType } from "../interface/ICore";
import { OpcodeType, ModifierType } from "../interface/IInstruction";
import { ModeType } from "../interface/IOperand";
import Defaults from "../Defaults";
import { IOptions } from "../interface/IOptions";
import { ILiteEvent, LiteEvent } from "../../modules/LiteEvent";
import { ITask } from "../interface/ITask";
import { Fetcher } from "../Fetcher";
import DataHelper from "./DataHelper";

"use strict";

describe("Fetcher",() => {

    var imp = DataHelper.buildInstruction(3, OpcodeType.MOV, ModifierType.I, ModeType.Direct, 0, ModeType.Direct, 1);
    var dat = DataHelper.buildInstruction(0, OpcodeType.DAT, ModifierType.F, ModeType.Direct, 0, ModeType.Direct, 0);

    var state: IState;
    var core: ICore;

    beforeEach(() => {

        var options = Defaults;
        options.coresize = 5;

        var executeAtSpy = jasmine.createSpy("ICore.executeAt() Spy");
        var readAtSpy = jasmine.createSpy("ICore.readAt() Spy");
        var getAtSpy = jasmine.createSpy("ICore.getAt() Spy");
        var setAtSpy = jasmine.createSpy("ICore.setAt() Spy");

        core = {
            getSize: () => { return 0; },
            coreAccess: new LiteEvent<ICoreAccessEventArgs>(),
            executeAt: executeAtSpy,
            readAt: readAtSpy,
            getAt: getAtSpy,
            setAt: setAtSpy,
            wrap(address: number) {
                return address;
            },
            initialise: (options: IOptions) => {
                //
            }
        };

        state = {
            core: core,
            cycle: 0,
            options: options,
            warriorIndex: 0,
            warriors: []
        };
    });

    it("fetches the next warrior's, next task's, next instruction",() => {

        var expectedWarrior = DataHelper.buildWarrior();

        state.warriors = [
            DataHelper.buildWarrior(),
            expectedWarrior
        ];
        state.warriorIndex = 1;

        var expectedTask = DataHelper.buildTask();

        expectedWarrior.tasks = [
            DataHelper.buildTask(),
            expectedTask,
            DataHelper.buildTask()
        ];
        expectedWarrior.taskIndex = 1;

        expectedTask.instructionPointer = 3;

        var expectedInstruction = imp;
        var unexpectedInstruction = dat;
        core.executeAt = (task: ITask, address: number) => {
            if (address === 3) {
                return expectedInstruction;
            } else {
                return unexpectedInstruction;
            }
        };

        var fetcher = new Fetcher();
        var context = fetcher.fetch(state);

        expect(context.warrior).toBe(expectedWarrior);
        expect(context.task).toBe(expectedTask);
        expect(context.instruction).toBe(expectedInstruction);

        expect(context.warriorIndex).toBe(1);
        expect(context.taskIndex).toBe(1);
        expect(context.instructionPointer).toBe(3);
    });

    it("advances the correct warrior index, task index and instruction pointer",() => {

        var expectedWarrior = DataHelper.buildWarrior();

        state.warriors = [
            DataHelper.buildWarrior(),
            expectedWarrior,
            DataHelper.buildWarrior()
        ];
        state.warriorIndex = 1;

        var expectedTask = DataHelper.buildTask();

        expectedWarrior.tasks = [
            DataHelper.buildTask(),
            expectedTask,
            DataHelper.buildTask()
        ];
        expectedWarrior.taskIndex = 1;

        expectedTask.instructionPointer = 3;

        core.executeAt = (task: ITask, address: number) => {
            return imp;
        };

        var fetcher = new Fetcher();
        fetcher.fetch(state);

        expect(state.warriorIndex).toBe(2);
        expect(expectedWarrior.taskIndex).toBe(2);
        expect(expectedTask.instructionPointer).toBe(4);
    });

    it("wraps the warrior index, task index and instruction pointer",() => {

        var expectedWarrior = DataHelper.buildWarrior();

        state.warriors = [
            DataHelper.buildWarrior(),
            DataHelper.buildWarrior(),
            expectedWarrior
        ];
        state.warriorIndex = 2;

        var expectedTask = DataHelper.buildTask();

        expectedWarrior.tasks = [
            DataHelper.buildTask(),
            DataHelper.buildTask(),
            expectedTask
        ];
        expectedWarrior.taskIndex = 2;

        expectedTask.instructionPointer = 4;

        core.executeAt = (task: ITask, address: number) => {
            return imp;
        };

        var fetcher = new Fetcher();
        fetcher.fetch(state);

        expect(state.warriorIndex).toBe(0);
        expect(expectedWarrior.taskIndex).toBe(0);
        expect(expectedTask.instructionPointer).toBe(0);
    });

});