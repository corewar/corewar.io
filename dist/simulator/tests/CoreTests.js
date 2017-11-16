"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IInstruction_1 = require("../interface/IInstruction");
const IOperand_1 = require("../interface/IOperand");
const Core_1 = require("../Core");
const ICore_1 = require("../interface/ICore");
const Defaults_1 = require("../Defaults");
const _ = require("underscore");
"use strict";
describe("Core", () => {
    function buildInstruction() {
        return {
            address: 1,
            modifier: IInstruction_1.ModifierType.F,
            opcode: IInstruction_1.OpcodeType.MOV,
            aOperand: {
                address: 0,
                mode: IOperand_1.ModeType.Immediate
            },
            bOperand: {
                address: 0,
                mode: IOperand_1.ModeType.Immediate
            }
        };
    }
    function buildTask() {
        return {
            instructionPointer: 0,
            warrior: {
                author: "",
                name: "",
                startAddress: 0,
                strategy: "",
                taskIndex: 0,
                tasks: []
            }
        };
    }
    it("Initialises core to the required size and provides accessor methods", () => {
        var i;
        var instruction;
        var core = new Core_1.Core();
        core.initialise({ coresize: 4, initialInstruction: Defaults_1.default.initialInstruction });
        for (i = 0; i < 4; i++) {
            instruction = core.readAt(null, i);
            instruction.aOperand.address = i;
            core.setAt(null, i, instruction);
        }
        for (i = 0; i < 4; i++) {
            instruction = core.readAt(null, i);
            expect(instruction.aOperand.address).toBe(i);
        }
    });
    it("getAt/setAt wraps addresses using mod maths", () => {
        var i;
        var instruction;
        var core = new Core_1.Core();
        core.initialise({ coresize: 4, initialInstruction: Defaults_1.default.initialInstruction });
        for (i = 4; i < 8; i++) {
            instruction = core.readAt(null, i);
            instruction.aOperand.address = i;
            core.setAt(null, i, instruction);
        }
        for (i = 0; i < 4; i++) {
            instruction = core.readAt(null, i);
            expect(instruction.aOperand.address).toBe(i + 4);
        }
    });
    it("getAt/setAt wraps negative addresses using mod maths", () => {
        var i;
        var instruction;
        var core = new Core_1.Core();
        core.initialise({ coresize: 4, initialInstruction: Defaults_1.default.initialInstruction });
        for (i = -4; i < 0; i++) {
            instruction = core.readAt(null, i);
            instruction.aOperand.address = i;
            core.setAt(null, i, instruction);
        }
        for (i = 0; i < 4; i++) {
            instruction = core.readAt(null, i);
            expect(instruction.aOperand.address).toBe(i - 4);
        }
    });
    it(".wrap wraps addresses using mod maths", () => {
        var core = new Core_1.Core();
        core.initialise({ coresize: 4, initialInstruction: Defaults_1.default.initialInstruction });
        expect(core.wrap(0)).toBe(0);
        expect(core.wrap(1)).toBe(1);
        expect(core.wrap(2)).toBe(2);
        expect(core.wrap(3)).toBe(3);
        expect(core.wrap(4)).toBe(0);
        expect(core.wrap(5)).toBe(1);
        expect(core.wrap(6)).toBe(2);
        expect(core.wrap(7)).toBe(3);
    });
    it(".wrap wraps negative addresses using mod maths", () => {
        var core = new Core_1.Core();
        core.initialise({ coresize: 4, initialInstruction: Defaults_1.default.initialInstruction });
        expect(core.wrap(-4)).toBe(0);
        expect(core.wrap(-3)).toBe(1);
        expect(core.wrap(-2)).toBe(2);
        expect(core.wrap(-1)).toBe(3);
    });
    it("Initialises core using the specified default instruction", () => {
        var defaultInstruction = {
            address: 0,
            opcode: IInstruction_1.OpcodeType.DIV,
            modifier: IInstruction_1.ModifierType.BA,
            aOperand: {
                mode: IOperand_1.ModeType.AIndirect,
                address: 5
            },
            bOperand: {
                mode: IOperand_1.ModeType.BPostIncrement,
                address: -77
            }
        };
        var core = new Core_1.Core();
        core.initialise({ coresize: 3, initialInstruction: defaultInstruction });
        for (var i = 0; i < 3; i++) {
            var instruction = core.readAt(null, i);
            expect(instruction.opcode).toBe(IInstruction_1.OpcodeType.DIV);
            expect(instruction.modifier).toBe(IInstruction_1.ModifierType.BA);
            expect(instruction.aOperand.mode).toBe(IOperand_1.ModeType.AIndirect);
            expect(instruction.aOperand.address).toBe(5);
            expect(instruction.bOperand.mode).toBe(IOperand_1.ModeType.BPostIncrement);
            expect(instruction.bOperand.address).toBe(-77);
        }
    });
    it("Assigns sequential address values to default core instructions", () => {
        var core = new Core_1.Core();
        core.initialise({ coresize: 5, initialInstruction: Defaults_1.default.initialInstruction });
        for (var i = 0; i < 5; i++) {
            var instruction = core.readAt(null, i);
            expect(instruction.address).toBe(i);
        }
    });
    it("Triggers a read core access event for the specified Task when getAt is called", () => {
        var task = buildTask();
        var handler = jasmine.createSpy("CoreAccessHandler Spy");
        var core = new Core_1.Core();
        core.initialise(_.defaults({ coresize: 4 }, Defaults_1.default));
        core.coreAccess.subscribe(handler);
        core.readAt(task, 2);
        expect(handler).toHaveBeenCalled();
        var eventArg = _(handler.calls.mostRecent().args).first();
        expect(eventArg.accessType).toBe(ICore_1.CoreAccessType.read);
        expect(eventArg.address).toBe(2);
        expect(eventArg.task).toBe(task);
    });
    it("Triggers a write core access event for the specified Task when setAt is called", () => {
        var task = buildTask();
        var handler = jasmine.createSpy("CoreAccessHandler Spy");
        var core = new Core_1.Core();
        core.initialise(_.defaults({ coresize: 4 }, Defaults_1.default));
        core.coreAccess.subscribe(handler);
        core.setAt(task, 2, buildInstruction());
        expect(handler).toHaveBeenCalled();
        var eventArg = _(handler.calls.mostRecent().args).first();
        expect(eventArg.accessType).toBe(ICore_1.CoreAccessType.write);
        expect(eventArg.address).toBe(2);
        expect(eventArg.task).toBe(task);
    });
    it("Triggers an execute core access event for the specified Task when executeAt is called", () => {
        var task = buildTask();
        var handler = jasmine.createSpy("CoreAccessHandler Spy");
        var core = new Core_1.Core();
        core.initialise(_.defaults({ coresize: 4 }, Defaults_1.default));
        core.coreAccess.subscribe(handler);
        core.executeAt(task, 2);
        expect(handler).toHaveBeenCalled();
        var eventArg = _(handler.calls.mostRecent().args).first();
        expect(eventArg.accessType).toBe(ICore_1.CoreAccessType.execute);
        expect(eventArg.address).toBe(2);
        expect(eventArg.task).toBe(task);
    });
    it(".getSize returns the size of the core", () => {
        var core = new Core_1.Core();
        core.initialise(_.defaults({ coresize: 23 }, Defaults_1.default));
        var actual = core.getSize();
        expect(actual).toBe(23);
    });
});
