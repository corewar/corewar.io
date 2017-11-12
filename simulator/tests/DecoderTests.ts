/// <reference path="../references.ts" />

import { ICore, ICoreAccessEventArgs, CoreAccessType } from "../../../corewar/Corewar/Simulator/Interface/ICore";
import { IInstruction } from "../../../corewar/Corewar/Simulator/Interface/IInstruction";
import { OpcodeType, ModifierType } from "../../../corewar/Corewar/Simulator/Interface/IInstruction";
import { IExecutive } from "../../../corewar/Corewar/Simulator/Interface/IExecutive";
import { IExecutionContext } from "../../../corewar/Corewar/Simulator/Interface/IExecutionContext";
import { ILiteEvent, LiteEvent } from "../../../corewar/Corewar/modules/LiteEvent";
import { ITask } from "../../../corewar/Corewar/Simulator/Interface/ITask";
import Defaults from "../../../corewar/Corewar/Simulator/Defaults";
import { IOptions } from "../../../corewar/Corewar/Simulator/Interface/IOptions";
import { ModeType } from "../../../corewar/Corewar/Simulator/Interface/IOperand";
import { Decoder } from "../../../corewar/Corewar/Simulator/Decoder";
import DataHelper from "./DataHelper";
import * as _ from "underscore";

"use strict";

describe("Decoder",() => {

    var core: ICore;
    var coreData: IInstruction[];

    var executive: IExecutive;

    beforeEach(() => {

        executive = {
            initialise: () => {
                //
            },
            commandTable: []
        };

        for (var i = 0; i < OpcodeType.Count * ModifierType.Count; i++) {
            executive.commandTable[i] = (c: IExecutionContext) => {
                //
            };
        }

        var executeAtSpy = jasmine.createSpy("ICore.executeAt");
        var readAtSpy = jasmine.createSpy("ICore.readAt");
        var getAtSpy = jasmine.createSpy("ICore.getAt");
        var setAtSpy = jasmine.createSpy("ICore.setAt");

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
    });

    function prepareCore(
        size: number,
        instructions: IInstruction[]) {

        coreData = [];

        var j = 0;

        for (var i = 0; i < size; i++) {

            if (j < instructions.length && instructions[j].address === i) {
                coreData.push(instructions[j++]);
            } else {
                coreData.push(Defaults.initialInstruction);
            }
        }

        core.executeAt = (task: ITask, address: number) => {
            return coreData[address % size];
        };
        core.readAt = (task: ITask, address: number) => {
            return coreData[address % size];
        };
    }

    function buildTask(): ITask {

        return {
            instructionPointer: 0,
            warrior: null
        };
    }

    function setInstructionPointer(address: number): IExecutionContext {

        var task = buildTask();

        return {
            task: task,
            core: core,
            instruction: core.executeAt(task, address),
            instructionPointer: address
        };
    }

    it("sets the A pointer to equal instruction pointer if the A addressing mode is immediate",() => {

        prepareCore(5, [
            DataHelper.buildInstruction(3, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 5, ModeType.Immediate, 6)
        ]);

        var context = setInstructionPointer(3);

        var decoder = new Decoder(executive);
        decoder.decode(context);

        expect(context.aPointer).toBe(3);
    });

    it("sets the B pointer to equal instruction pointer if the B addressing mode is immediate",() => {

        prepareCore(5, [
            DataHelper.buildInstruction(3, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 5, ModeType.Immediate, 6)
        ]);

        var context = setInstructionPointer(3);

        var decoder = new Decoder(executive);
        decoder.decode(context);

        expect(context.bPointer).toBe(3);
    });

    it("sets the A pointer to the relative position of the A field value if the A addressing mode is direct",() => {

        prepareCore(5, [
            DataHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.Direct, 2, ModeType.Immediate, 0)
        ]);

        var context = setInstructionPointer(2);

        var decoder = new Decoder(executive);
        decoder.decode(context);

        expect(context.aPointer).toBe(4);
    });

    it("sets the B pointer to the relative position of the B field value if the B addressing mode is direct",() => {

        prepareCore(5, [
            DataHelper.buildInstruction(1, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 0, ModeType.Direct, 3)
        ]);

        var context = setInstructionPointer(1);

        var decoder = new Decoder(executive);
        decoder.decode(context);

        expect(context.bPointer).toBe(4);
    });

    it("sets the A pointer to the relative position of the A field value of the instruction pointed to by the current instruction A field \
        value if the A addressing mode is A Indirect",() => {

        prepareCore(5, [
            DataHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.AIndirect, 2, ModeType.Immediate, 0),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, -1, ModeType.Immediate, 0),
        ]);

        var context = setInstructionPointer(2);

        var decoder = new Decoder(executive);
        decoder.decode(context);

        expect(context.aPointer).toBe(3);
    });

    it("sets the B pointer to the relative position of the A field value of the instruction pointed to by the current instruction B field \
        value if the B addressing mode is A Indirect",() => {

        prepareCore(5, [
            DataHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 0, ModeType.AIndirect, 2),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, -1, ModeType.Immediate, 0),
        ]);

        var context = setInstructionPointer(2);

        var decoder = new Decoder(executive);
        decoder.decode(context);

        expect(context.bPointer).toBe(3);
    });

    it("sets the A pointer to the relative position of the B field value of the instruction pointed to by the current instruction A field \
        value if the A addressing mode is B Indirect",() => {

        prepareCore(5, [
            DataHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.BIndirect, 2, ModeType.Immediate, 0),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 0, ModeType.Immediate, -1),
        ]);

        var context = setInstructionPointer(2);

        var decoder = new Decoder(executive);
        decoder.decode(context);

        expect(context.aPointer).toBe(3);
    });

    it("sets the B pointer to the relative position of the B field value of the instruction pointed to by the current instruction B field \
        value if the B addressing mode is B Indirect",() => {

        prepareCore(5, [
            DataHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 0, ModeType.BIndirect, 2),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 0, ModeType.Immediate, -1),
        ]);

        var context = setInstructionPointer(2);

        var decoder = new Decoder(executive);
        decoder.decode(context);

        expect(context.bPointer).toBe(3);
    });

    it("sets the A pointer to the relative position of the pre-deremented A field value of the instruction pointed to by the current \
        instruction A field value if the A addressing mode is A Pre-Decrement",() => {

        var expectedInstruction = DataHelper.buildInstruction(
            4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 0, ModeType.Immediate, 1);

        prepareCore(5, [
            DataHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.APreDecrement, 2, ModeType.Immediate, 0),
            expectedInstruction,
        ]);

        var context = setInstructionPointer(2);

        var decoder = new Decoder(executive);
        decoder.decode(context);

        expect(context.aPointer).toBe(3);
        expect(core.setAt).toHaveBeenCalledWith(jasmine.any(Object), 4, expectedInstruction);
        expect(expectedInstruction.aOperand.address).toBe(-1);
    });

    it("sets the B pointer to the relative position of the pre-deremented A field value of the instruction pointed to by the current \
        instruction B field value if the B addressing mode is A Pre-Decrement",() => {

        var expectedInstruction = DataHelper.buildInstruction(
            4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 0, ModeType.Immediate, 1);

        prepareCore(5, [
            DataHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 0, ModeType.APreDecrement, 2),
            expectedInstruction,
        ]);

        var context = setInstructionPointer(2);

        var decoder = new Decoder(executive);
        decoder.decode(context);

        expect(context.bPointer).toBe(3);
        expect(core.setAt).toHaveBeenCalledWith(jasmine.any(Object), 4, expectedInstruction);
        expect(expectedInstruction.aOperand.address).toBe(-1);
    });

    it("sets the A pointer to the relative position of the pre-deremented B field value of the instruction pointed to by the current \
        instruction A field value if the A addressing mode is B Pre-Decrement",() => {

        var expectedInstruction = DataHelper.buildInstruction(
            4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 1, ModeType.Immediate, 0);

        prepareCore(5, [
            DataHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.BPreDecrement, 2, ModeType.Immediate, 0),
            expectedInstruction,
        ]);

        var context = setInstructionPointer(2);

        var decoder = new Decoder(executive);
        decoder.decode(context);

        expect(context.aPointer).toBe(3);
        expect(core.setAt).toHaveBeenCalledWith(jasmine.any(Object),4, expectedInstruction);
        expect(expectedInstruction.bOperand.address).toBe(-1);
    });

    it("sets the B pointer to the relative position of the pre-deremented B field value of the instruction pointed to by the current \
        instruction B field value if the B addressing mode is B Pre-Decrement",() => {

        var expectedInstruction = DataHelper.buildInstruction(
            4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 1, ModeType.Immediate, 0);

        prepareCore(5, [
            DataHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 0, ModeType.BPreDecrement, 2),
            expectedInstruction,
        ]);

        var context = setInstructionPointer(2);

        var decoder = new Decoder(executive);
        decoder.decode(context);

        expect(context.bPointer).toBe(3);
        expect(core.setAt).toHaveBeenCalledWith(jasmine.any(Object),4, expectedInstruction);
        expect(expectedInstruction.bOperand.address).toBe(-1);
    });

    it("sets the A pointer to the relative position of the post-incremented A field value of the instruction pointed to by the current \
        instruction A field value if the A addressing mode is A Post-Increment",() => {

        var expectedInstruction = DataHelper.buildInstruction(
            4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, -1, ModeType.Immediate, 1);

        prepareCore(5, [
            DataHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.APostIncrement, 2, ModeType.Immediate, 0),
            expectedInstruction,
        ]);

        var context = setInstructionPointer(2);

        var decoder = new Decoder(executive);
        decoder.decode(context);

        expect(context.aPointer).toBe(3);
        expect(core.setAt).toHaveBeenCalledWith(jasmine.any(Object),4, expectedInstruction);
        expect(expectedInstruction.aOperand.address).toBe(0);
    });

    it("sets the B pointer to the relative position of the post-incremented A field value of the instruction pointed to by the current \
        instruction B field value if the B addressing mode is A Post-Increment",() => {

        var expectedInstruction = DataHelper.buildInstruction(
            4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, -1, ModeType.Immediate, 1);

        prepareCore(5, [
            DataHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 0, ModeType.APostIncrement, 2),
            expectedInstruction,
        ]);

        var context = setInstructionPointer(2);

        var decoder = new Decoder(executive);
        decoder.decode(context);

        expect(context.bPointer).toBe(3);
        expect(core.setAt).toHaveBeenCalledWith(jasmine.any(Object),4, expectedInstruction);
        expect(expectedInstruction.aOperand.address).toBe(0);
    });

    it("sets the A pointer to the relative position of the post-incremented B field value of the instruction pointed to by the current \
        instruction A field value if the A addressing mode is B Post-Increment",() => {

        var expectedInstruction = DataHelper.buildInstruction(
            4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 1, ModeType.Immediate, -1);

        prepareCore(5, [
            DataHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.BPostIncrement, 2, ModeType.Immediate, 0),
            expectedInstruction,
        ]);

        var context = setInstructionPointer(2);

        var decoder = new Decoder(executive);
        decoder.decode(context);

        expect(context.aPointer).toBe(3);
        expect(core.setAt).toHaveBeenCalledWith(jasmine.any(Object),4, expectedInstruction);
        expect(expectedInstruction.bOperand.address).toBe(0);
    });

    it("sets the B pointer to the relative position of the post-incremented B field value of the instruction pointed to by the current \
        instruction B field value if the B addressing mode is B Post-Increment",() => {

        var expectedInstruction = DataHelper.buildInstruction(
            4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 1, ModeType.Immediate, -1);

        prepareCore(5, [
            DataHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 0, ModeType.BPostIncrement, 2),
            expectedInstruction,
        ]);

        var context = setInstructionPointer(2);

        var decoder = new Decoder(executive);
        decoder.decode(context);

        expect(context.bPointer).toBe(3);
        expect(core.setAt).toHaveBeenCalledWith(jasmine.any(Object),4, expectedInstruction);
        expect(expectedInstruction.bOperand.address).toBe(0);
    });

    it("returns the command from the command table which corresponds with the combination of the current instruction's \
        opcode and modifier",() => {

        prepareCore(5, [
            DataHelper.buildInstruction(3, OpcodeType.MOV, ModifierType.BA, ModeType.Immediate, 5, ModeType.Immediate, 6)
        ]);

        var context = setInstructionPointer(3);

        var decoder = new Decoder(executive);
        decoder.decode(context);

        // OpcodeType.MOV = 1
        // ModifierType.Count = 7
        // ModifierType.BA = 3
        // 1*7 + 3 = 10
        expect(context.command).toBe(executive.commandTable[10]);
    });
});