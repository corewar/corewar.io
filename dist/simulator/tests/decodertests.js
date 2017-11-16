"use strict";
/// <reference path="references.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const IInstruction_1 = require("../interface/IInstruction");
const LiteEvent_1 = require("../../modules/LiteEvent");
const Defaults_1 = require("../Defaults");
const IOperand_1 = require("../interface/IOperand");
const Decoder_1 = require("../Decoder");
const DataHelper_1 = require("./DataHelper");
"use strict";
describe("Decoder", () => {
    var core;
    var coreData;
    var executive;
    beforeEach(() => {
        executive = {
            initialise: () => {
                //
            },
            commandTable: []
        };
        for (var i = 0; i < IInstruction_1.OpcodeType.Count * IInstruction_1.ModifierType.Count; i++) {
            executive.commandTable[i] = (c) => {
                //
            };
        }
        var executeAtSpy = jasmine.createSpy("ICore.executeAt");
        var readAtSpy = jasmine.createSpy("ICore.readAt");
        var getAtSpy = jasmine.createSpy("ICore.getAt");
        var setAtSpy = jasmine.createSpy("ICore.setAt");
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
    });
    function prepareCore(size, instructions) {
        coreData = [];
        var j = 0;
        for (var i = 0; i < size; i++) {
            if (j < instructions.length && instructions[j].address === i) {
                coreData.push(instructions[j++]);
            }
            else {
                coreData.push(Defaults_1.default.initialInstruction);
            }
        }
        core.executeAt = (task, address) => {
            return coreData[address % size];
        };
        core.readAt = (task, address) => {
            return coreData[address % size];
        };
    }
    function buildTask() {
        return {
            instructionPointer: 0,
            warrior: null
        };
    }
    function setInstructionPointer(address) {
        var task = buildTask();
        return {
            task: task,
            core: core,
            instruction: core.executeAt(task, address),
            instructionPointer: address
        };
    }
    it("sets the A pointer to equal instruction pointer if the A addressing mode is immediate", () => {
        prepareCore(5, [
            DataHelper_1.default.buildInstruction(3, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.Immediate, 5, IOperand_1.ModeType.Immediate, 6)
        ]);
        var context = setInstructionPointer(3);
        var decoder = new Decoder_1.Decoder(executive);
        decoder.decode(context);
        expect(context.aPointer).toBe(3);
    });
    it("sets the B pointer to equal instruction pointer if the B addressing mode is immediate", () => {
        prepareCore(5, [
            DataHelper_1.default.buildInstruction(3, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.Immediate, 5, IOperand_1.ModeType.Immediate, 6)
        ]);
        var context = setInstructionPointer(3);
        var decoder = new Decoder_1.Decoder(executive);
        decoder.decode(context);
        expect(context.bPointer).toBe(3);
    });
    it("sets the A pointer to the relative position of the A field value if the A addressing mode is direct", () => {
        prepareCore(5, [
            DataHelper_1.default.buildInstruction(2, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.Direct, 2, IOperand_1.ModeType.Immediate, 0)
        ]);
        var context = setInstructionPointer(2);
        var decoder = new Decoder_1.Decoder(executive);
        decoder.decode(context);
        expect(context.aPointer).toBe(4);
    });
    it("sets the B pointer to the relative position of the B field value if the B addressing mode is direct", () => {
        prepareCore(5, [
            DataHelper_1.default.buildInstruction(1, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.Immediate, 0, IOperand_1.ModeType.Direct, 3)
        ]);
        var context = setInstructionPointer(1);
        var decoder = new Decoder_1.Decoder(executive);
        decoder.decode(context);
        expect(context.bPointer).toBe(4);
    });
    it("sets the A pointer to the relative position of the A field value of the instruction pointed to by the current instruction A field \
        value if the A addressing mode is A Indirect", () => {
        prepareCore(5, [
            DataHelper_1.default.buildInstruction(2, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.AIndirect, 2, IOperand_1.ModeType.Immediate, 0),
            DataHelper_1.default.buildInstruction(4, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.Immediate, -1, IOperand_1.ModeType.Immediate, 0),
        ]);
        var context = setInstructionPointer(2);
        var decoder = new Decoder_1.Decoder(executive);
        decoder.decode(context);
        expect(context.aPointer).toBe(3);
    });
    it("sets the B pointer to the relative position of the A field value of the instruction pointed to by the current instruction B field \
        value if the B addressing mode is A Indirect", () => {
        prepareCore(5, [
            DataHelper_1.default.buildInstruction(2, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.Immediate, 0, IOperand_1.ModeType.AIndirect, 2),
            DataHelper_1.default.buildInstruction(4, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.Immediate, -1, IOperand_1.ModeType.Immediate, 0),
        ]);
        var context = setInstructionPointer(2);
        var decoder = new Decoder_1.Decoder(executive);
        decoder.decode(context);
        expect(context.bPointer).toBe(3);
    });
    it("sets the A pointer to the relative position of the B field value of the instruction pointed to by the current instruction A field \
        value if the A addressing mode is B Indirect", () => {
        prepareCore(5, [
            DataHelper_1.default.buildInstruction(2, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.BIndirect, 2, IOperand_1.ModeType.Immediate, 0),
            DataHelper_1.default.buildInstruction(4, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.Immediate, 0, IOperand_1.ModeType.Immediate, -1),
        ]);
        var context = setInstructionPointer(2);
        var decoder = new Decoder_1.Decoder(executive);
        decoder.decode(context);
        expect(context.aPointer).toBe(3);
    });
    it("sets the B pointer to the relative position of the B field value of the instruction pointed to by the current instruction B field \
        value if the B addressing mode is B Indirect", () => {
        prepareCore(5, [
            DataHelper_1.default.buildInstruction(2, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.Immediate, 0, IOperand_1.ModeType.BIndirect, 2),
            DataHelper_1.default.buildInstruction(4, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.Immediate, 0, IOperand_1.ModeType.Immediate, -1),
        ]);
        var context = setInstructionPointer(2);
        var decoder = new Decoder_1.Decoder(executive);
        decoder.decode(context);
        expect(context.bPointer).toBe(3);
    });
    it("sets the A pointer to the relative position of the pre-deremented A field value of the instruction pointed to by the current \
        instruction A field value if the A addressing mode is A Pre-Decrement", () => {
        var expectedInstruction = DataHelper_1.default.buildInstruction(4, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.Immediate, 0, IOperand_1.ModeType.Immediate, 1);
        prepareCore(5, [
            DataHelper_1.default.buildInstruction(2, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.APreDecrement, 2, IOperand_1.ModeType.Immediate, 0),
            expectedInstruction,
        ]);
        var context = setInstructionPointer(2);
        var decoder = new Decoder_1.Decoder(executive);
        decoder.decode(context);
        expect(context.aPointer).toBe(3);
        expect(core.setAt).toHaveBeenCalledWith(jasmine.any(Object), 4, expectedInstruction);
        expect(expectedInstruction.aOperand.address).toBe(-1);
    });
    it("sets the B pointer to the relative position of the pre-deremented A field value of the instruction pointed to by the current \
        instruction B field value if the B addressing mode is A Pre-Decrement", () => {
        var expectedInstruction = DataHelper_1.default.buildInstruction(4, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.Immediate, 0, IOperand_1.ModeType.Immediate, 1);
        prepareCore(5, [
            DataHelper_1.default.buildInstruction(2, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.Immediate, 0, IOperand_1.ModeType.APreDecrement, 2),
            expectedInstruction,
        ]);
        var context = setInstructionPointer(2);
        var decoder = new Decoder_1.Decoder(executive);
        decoder.decode(context);
        expect(context.bPointer).toBe(3);
        expect(core.setAt).toHaveBeenCalledWith(jasmine.any(Object), 4, expectedInstruction);
        expect(expectedInstruction.aOperand.address).toBe(-1);
    });
    it("sets the A pointer to the relative position of the pre-deremented B field value of the instruction pointed to by the current \
        instruction A field value if the A addressing mode is B Pre-Decrement", () => {
        var expectedInstruction = DataHelper_1.default.buildInstruction(4, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.Immediate, 1, IOperand_1.ModeType.Immediate, 0);
        prepareCore(5, [
            DataHelper_1.default.buildInstruction(2, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.BPreDecrement, 2, IOperand_1.ModeType.Immediate, 0),
            expectedInstruction,
        ]);
        var context = setInstructionPointer(2);
        var decoder = new Decoder_1.Decoder(executive);
        decoder.decode(context);
        expect(context.aPointer).toBe(3);
        expect(core.setAt).toHaveBeenCalledWith(jasmine.any(Object), 4, expectedInstruction);
        expect(expectedInstruction.bOperand.address).toBe(-1);
    });
    it("sets the B pointer to the relative position of the pre-deremented B field value of the instruction pointed to by the current \
        instruction B field value if the B addressing mode is B Pre-Decrement", () => {
        var expectedInstruction = DataHelper_1.default.buildInstruction(4, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.Immediate, 1, IOperand_1.ModeType.Immediate, 0);
        prepareCore(5, [
            DataHelper_1.default.buildInstruction(2, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.Immediate, 0, IOperand_1.ModeType.BPreDecrement, 2),
            expectedInstruction,
        ]);
        var context = setInstructionPointer(2);
        var decoder = new Decoder_1.Decoder(executive);
        decoder.decode(context);
        expect(context.bPointer).toBe(3);
        expect(core.setAt).toHaveBeenCalledWith(jasmine.any(Object), 4, expectedInstruction);
        expect(expectedInstruction.bOperand.address).toBe(-1);
    });
    it("sets the A pointer to the relative position of the post-incremented A field value of the instruction pointed to by the current \
        instruction A field value if the A addressing mode is A Post-Increment", () => {
        var expectedInstruction = DataHelper_1.default.buildInstruction(4, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.Immediate, -1, IOperand_1.ModeType.Immediate, 1);
        prepareCore(5, [
            DataHelper_1.default.buildInstruction(2, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.APostIncrement, 2, IOperand_1.ModeType.Immediate, 0),
            expectedInstruction,
        ]);
        var context = setInstructionPointer(2);
        var decoder = new Decoder_1.Decoder(executive);
        decoder.decode(context);
        expect(context.aPointer).toBe(3);
        expect(core.setAt).toHaveBeenCalledWith(jasmine.any(Object), 4, expectedInstruction);
        expect(expectedInstruction.aOperand.address).toBe(0);
    });
    it("sets the B pointer to the relative position of the post-incremented A field value of the instruction pointed to by the current \
        instruction B field value if the B addressing mode is A Post-Increment", () => {
        var expectedInstruction = DataHelper_1.default.buildInstruction(4, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.Immediate, -1, IOperand_1.ModeType.Immediate, 1);
        prepareCore(5, [
            DataHelper_1.default.buildInstruction(2, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.Immediate, 0, IOperand_1.ModeType.APostIncrement, 2),
            expectedInstruction,
        ]);
        var context = setInstructionPointer(2);
        var decoder = new Decoder_1.Decoder(executive);
        decoder.decode(context);
        expect(context.bPointer).toBe(3);
        expect(core.setAt).toHaveBeenCalledWith(jasmine.any(Object), 4, expectedInstruction);
        expect(expectedInstruction.aOperand.address).toBe(0);
    });
    it("sets the A pointer to the relative position of the post-incremented B field value of the instruction pointed to by the current \
        instruction A field value if the A addressing mode is B Post-Increment", () => {
        var expectedInstruction = DataHelper_1.default.buildInstruction(4, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.Immediate, 1, IOperand_1.ModeType.Immediate, -1);
        prepareCore(5, [
            DataHelper_1.default.buildInstruction(2, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.BPostIncrement, 2, IOperand_1.ModeType.Immediate, 0),
            expectedInstruction,
        ]);
        var context = setInstructionPointer(2);
        var decoder = new Decoder_1.Decoder(executive);
        decoder.decode(context);
        expect(context.aPointer).toBe(3);
        expect(core.setAt).toHaveBeenCalledWith(jasmine.any(Object), 4, expectedInstruction);
        expect(expectedInstruction.bOperand.address).toBe(0);
    });
    it("sets the B pointer to the relative position of the post-incremented B field value of the instruction pointed to by the current \
        instruction B field value if the B addressing mode is B Post-Increment", () => {
        var expectedInstruction = DataHelper_1.default.buildInstruction(4, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.Immediate, 1, IOperand_1.ModeType.Immediate, -1);
        prepareCore(5, [
            DataHelper_1.default.buildInstruction(2, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.I, IOperand_1.ModeType.Immediate, 0, IOperand_1.ModeType.BPostIncrement, 2),
            expectedInstruction,
        ]);
        var context = setInstructionPointer(2);
        var decoder = new Decoder_1.Decoder(executive);
        decoder.decode(context);
        expect(context.bPointer).toBe(3);
        expect(core.setAt).toHaveBeenCalledWith(jasmine.any(Object), 4, expectedInstruction);
        expect(expectedInstruction.bOperand.address).toBe(0);
    });
    it("returns the command from the command table which corresponds with the combination of the current instruction's \
        opcode and modifier", () => {
        prepareCore(5, [
            DataHelper_1.default.buildInstruction(3, IInstruction_1.OpcodeType.MOV, IInstruction_1.ModifierType.BA, IOperand_1.ModeType.Immediate, 5, IOperand_1.ModeType.Immediate, 6)
        ]);
        var context = setInstructionPointer(3);
        var decoder = new Decoder_1.Decoder(executive);
        decoder.decode(context);
        // OpcodeType.MOV = 1
        // ModifierType.Count = 7
        // ModifierType.BA = 3
        // 1*7 + 3 = 10
        expect(context.command).toBe(executive.commandTable[10]);
    });
});
