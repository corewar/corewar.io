"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IInstruction_1 = require("../interface/IInstruction");
const IOperand_1 = require("../interface/IOperand");
const Defaults_1 = require("../Defaults");
const LiteEvent_1 = require("../../modules/LiteEvent");
const Fetcher_1 = require("../Fetcher");
const DataHelper_1 = require("./DataHelper");
"use strict";
describe("Fetcher", () => {
    var imp = DataHelper_1.default.buildInstruction(3, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.Direct, 0, IOperand_1.ModeType.Direct, 1);
    var dat = DataHelper_1.default.buildInstruction(0, IInstruction_1.OpcodeType.DAT, IInstruction_1.ModifierType.F, IOperand_1.ModeType.Direct, 0, IOperand_1.ModeType.Direct, 0);
    var state;
    var core;
    beforeEach(() => {
        var options = Defaults_1.default;
        options.coresize = 5;
        var executeAtSpy = jasmine.createSpy("ICore.executeAt() Spy");
        var readAtSpy = jasmine.createSpy("ICore.readAt() Spy");
        var getAtSpy = jasmine.createSpy("ICore.getAt() Spy");
        var setAtSpy = jasmine.createSpy("ICore.setAt() Spy");
        core = {
            getSize: () => { return 0; },
            coreAccess: new LiteEvent_1.LiteEvent(),
            executeAt: executeAtSpy,
            readAt: readAtSpy,
            getAt: getAtSpy,
            setAt: setAtSpy,
            wrap(address) {
                return address;
            },
            initialise: (options) => {
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
    it("fetches the next warrior's, next task's, next instruction", () => {
        var expectedWarrior = DataHelper_1.default.buildWarrior();
        state.warriors = [
            DataHelper_1.default.buildWarrior(),
            expectedWarrior
        ];
        state.warriorIndex = 1;
        var expectedTask = DataHelper_1.default.buildTask();
        expectedWarrior.tasks = [
            DataHelper_1.default.buildTask(),
            expectedTask,
            DataHelper_1.default.buildTask()
        ];
        expectedWarrior.taskIndex = 1;
        expectedTask.instructionPointer = 3;
        var expectedInstruction = imp;
        var unexpectedInstruction = dat;
        core.executeAt = (task, address) => {
            if (address === 3) {
                return expectedInstruction;
            }
            else {
                return unexpectedInstruction;
            }
        };
        var fetcher = new Fetcher_1.Fetcher();
        var context = fetcher.fetch(state);
        expect(context.warrior).toBe(expectedWarrior);
        expect(context.task).toBe(expectedTask);
        expect(context.instruction).toBe(expectedInstruction);
        expect(context.warriorIndex).toBe(1);
        expect(context.taskIndex).toBe(1);
        expect(context.instructionPointer).toBe(3);
    });
    it("advances the correct warrior index, task index and instruction pointer", () => {
        var expectedWarrior = DataHelper_1.default.buildWarrior();
        state.warriors = [
            DataHelper_1.default.buildWarrior(),
            expectedWarrior,
            DataHelper_1.default.buildWarrior()
        ];
        state.warriorIndex = 1;
        var expectedTask = DataHelper_1.default.buildTask();
        expectedWarrior.tasks = [
            DataHelper_1.default.buildTask(),
            expectedTask,
            DataHelper_1.default.buildTask()
        ];
        expectedWarrior.taskIndex = 1;
        expectedTask.instructionPointer = 3;
        core.executeAt = (task, address) => {
            return imp;
        };
        var fetcher = new Fetcher_1.Fetcher();
        fetcher.fetch(state);
        expect(state.warriorIndex).toBe(2);
        expect(expectedWarrior.taskIndex).toBe(2);
        expect(expectedTask.instructionPointer).toBe(4);
    });
    it("wraps the warrior index, task index and instruction pointer", () => {
        var expectedWarrior = DataHelper_1.default.buildWarrior();
        state.warriors = [
            DataHelper_1.default.buildWarrior(),
            DataHelper_1.default.buildWarrior(),
            expectedWarrior
        ];
        state.warriorIndex = 2;
        var expectedTask = DataHelper_1.default.buildTask();
        expectedWarrior.tasks = [
            DataHelper_1.default.buildTask(),
            DataHelper_1.default.buildTask(),
            expectedTask
        ];
        expectedWarrior.taskIndex = 2;
        expectedTask.instructionPointer = 4;
        core.executeAt = (task, address) => {
            return imp;
        };
        var fetcher = new Fetcher_1.Fetcher();
        fetcher.fetch(state);
        expect(state.warriorIndex).toBe(0);
        expect(expectedWarrior.taskIndex).toBe(0);
        expect(expectedTask.instructionPointer).toBe(0);
    });
});
