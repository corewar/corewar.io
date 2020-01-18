import { expect } from "chai";
import * as sinon from "sinon";

import { IState } from "@simulator/interface/IState";
import { ICore } from "@simulator/interface/ICore";
import { OpcodeType, ModifierType } from "@simulator/interface/IInstruction";
import { ModeType } from "@simulator/interface/IOperand";
import Defaults from "@simulator/Defaults";
import { IOptions } from "@simulator/interface/IOptions";
import { ITask } from "@simulator/interface/ITask";
import { Fetcher } from "@simulator/Fetcher";
import TestHelper from "@simulator/tests/TestHelper";

describe("Fetcher",() => {

    var imp = TestHelper.buildInstruction(3, OpcodeType.MOV, ModifierType.I, ModeType.Direct, 0, ModeType.Direct, 1);
    var dat = TestHelper.buildInstruction(0, OpcodeType.DAT, ModifierType.F, ModeType.Direct, 0, ModeType.Direct, 0);

    var state: IState;
    var core: ICore;

    beforeEach(() => {

        var options = Object.assign({}, Defaults);
        options.coresize = 5;

        core = {
            getSize: () => { return 0; },
            executeAt: sinon.stub(),
            readAt: sinon.stub(),
            getAt: sinon.stub(),
            getWithInfoAt: sinon.stub(),
            setAt: sinon.stub(),
            wrap(address: number) {
                return address;
            },
            initialise: (options: IOptions) => {
                //
            }
        };

        state = {
            cycle: 0,
            options: options,
            warriorIndex: 0,
            warriors: []
        };
    });

    it("fetches the next warrior's, next task's, next instruction",() => {

        var expectedWarrior = TestHelper.buildWarrior();

        state.warriors = [
            TestHelper.buildWarrior(),
            expectedWarrior
        ];
        state.warriorIndex = 1;

        var expectedTask = TestHelper.buildTask();

        expectedWarrior.tasks = [
            TestHelper.buildTask(),
            expectedTask,
            TestHelper.buildTask()
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
        var context = fetcher.fetch(state, core);

        expect(context.warrior).to.be.equal(expectedWarrior);
        expect(context.task).to.be.equal(expectedTask);
        expect(context.instruction).to.be.equal(expectedInstruction);

        expect(context.warriorIndex).to.be.equal(1);
        expect(context.taskIndex).to.be.equal(1);
        expect(context.instructionPointer).to.be.equal(3);
    });

    it("advances the correct warrior index, task index and instruction pointer",() => {

        var expectedWarrior = TestHelper.buildWarrior();

        state.warriors = [
            TestHelper.buildWarrior(),
            expectedWarrior,
            TestHelper.buildWarrior()
        ];
        state.warriorIndex = 1;

        var expectedTask = TestHelper.buildTask();

        expectedWarrior.tasks = [
            TestHelper.buildTask(),
            expectedTask,
            TestHelper.buildTask()
        ];
        expectedWarrior.taskIndex = 1;

        expectedTask.instructionPointer = 3;

        core.executeAt = (task: ITask, address: number) => {
            return imp;
        };

        var fetcher = new Fetcher();
        fetcher.fetch(state, core);

        expect(state.warriorIndex).to.be.equal(2);
        expect(expectedWarrior.taskIndex).to.be.equal(2);
        expect(expectedTask.instructionPointer).to.be.equal(4);
    });

    it("wraps the warrior index, task index and instruction pointer",() => {

        var expectedWarrior = TestHelper.buildWarrior();

        state.warriors = [
            TestHelper.buildWarrior(),
            TestHelper.buildWarrior(),
            expectedWarrior
        ];
        state.warriorIndex = 2;

        var expectedTask = TestHelper.buildTask();

        expectedWarrior.tasks = [
            TestHelper.buildTask(),
            TestHelper.buildTask(),
            expectedTask
        ];
        expectedWarrior.taskIndex = 2;

        expectedTask.instructionPointer = 4;

        core.executeAt = (task: ITask, address: number) => {
            return imp;
        };

        var fetcher = new Fetcher();
        fetcher.fetch(state, core);

        expect(state.warriorIndex).to.be.equal(0);
        expect(expectedWarrior.taskIndex).to.be.equal(0);
        expect(expectedTask.instructionPointer).to.be.equal(0);
    });

    it("executes in the context of the next warrior if the current warrior has no tasks", () => {

        var validWarrior = TestHelper.buildWarrior();
        validWarrior.tasks = [
            TestHelper.buildTask()
        ]

        var deadWarrior = TestHelper.buildWarrior();
        deadWarrior.tasks = [];

        state.warriors = [
            validWarrior,
            deadWarrior
        ];

        state.warriorIndex = 1;

        var fetcher = new Fetcher();
        var executionContext = fetcher.fetch(state, core);

        expect(executionContext.warriorIndex).to.be.equal(0);
        expect(executionContext.warrior).to.be.equal(validWarrior);
    });

    it(".getNextExecution returns new warrior's id and execution address", () => {

        const expectedWarrior = TestHelper.buildWarrior();

        state.warriors = [
            TestHelper.buildWarrior(),
            expectedWarrior,
            TestHelper.buildWarrior()
        ];
        state.warriorIndex = 1;

        const expectedTask = TestHelper.buildTask();

        expectedWarrior.tasks = [
            TestHelper.buildTask(),
            TestHelper.buildTask(),
            expectedTask,
            TestHelper.buildTask()
        ];
        expectedWarrior.taskIndex = 2;

        expectedTask.instructionPointer = 3;

        const fetcher = new Fetcher();
        const actual = fetcher.getNextExecution(state);

        expect(actual.warriorId).to.be.equal(expectedWarrior.id);
        expect(actual.address).to.be.equal(expectedTask.instructionPointer);
    });
});