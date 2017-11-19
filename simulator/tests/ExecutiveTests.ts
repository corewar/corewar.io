/// <reference path="references.ts" />
import { OpcodeType, ModifierType } from "../interface/IInstruction";
import { IInstruction } from "../interface/IInstruction";
import { ICore, ICoreAccessEventArgs, CoreAccessType } from "../interface/ICore";
import Defaults from "../Defaults";
import { IOptions } from "../interface/IOptions";
import { IState } from "../interface/IState";
import { ILiteEvent, LiteEvent } from "../../modules/LiteEvent";
import { ModeType } from "../Interface/IOperand";
import { Executive } from "../Executive";
import { IExecutionContext } from "../interface/IExecutionContext";
import { ITask } from "../interface/ITask";
import DataHelper from "./DataHelper";

"use strict";

describe("Executive",() => {

    var state: IState;
    var core: ICore;
    var options: IOptions;

    var coreData: IInstruction[];

    beforeEach(() => {

        options = Defaults;
        options.coresize = 5;
        options.instructionLimit = 100;

        var readAtSpy = jasmine.createSpy("ICore.readAt() Spy");
        readAtSpy.and.returnValue(options.initialInstruction);

        var getAtSpy = jasmine.createSpy("ICore.getAt() Spy");
        readAtSpy.and.returnValue(options.initialInstruction);

        var executeAtSpy = jasmine.createSpy("ICore.executeAt() Spy");
        executeAtSpy.and.returnValue(options.initialInstruction);

        var setAtSpy = jasmine.createSpy("ICore.setAt() Spy");

        var wrapSpy = jasmine.createSpy("ICore.wrap() Spy");
        wrapSpy.and.callFake((address: number) => {
            return address;
        });

        core = {
            getSize: () => { return 0; },
            coreAccess: new LiteEvent<ICoreAccessEventArgs>(),
            executeAt: executeAtSpy,
            readAt: readAtSpy,
            getAt: getAtSpy,
            setAt: setAtSpy,
            wrap: wrapSpy,
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

        jasmine.addMatchers({
            toEqualInstruction: () => {
                return {
                    compare: (actual: IInstruction, expected: IInstruction) => {

                        if (actual.opcode !== expected.opcode) {
                            return {
                                pass: false,
                                message: "Expected opcode '" + actual.opcode +
                                        "' to equal opcode '" + expected.opcode + "'"
                            };
                        } else if (actual.modifier !== expected.modifier) {
                            return {
                                pass: false,
                                message: "Expected modifier '" + actual.modifier +
                                        "' to equal modifier '" + expected.modifier + "'"
                            };
                        } else if (actual.aOperand.mode !== expected.aOperand.mode) {
                            return {
                                pass: false,
                                message: "Expected A mode '" + actual.aOperand.mode +
                                        "' to equal A mode '" + expected.aOperand.mode + "'"
                            };
                        } else if (actual.aOperand.address !== expected.aOperand.address) {
                            return {
                                pass: false,
                                message: "Expected A address '" + actual.aOperand.address +
                                        "' to equal A address '" + expected.aOperand.address + "'"
                            };
                        } else if (actual.bOperand.mode !== expected.bOperand.mode) {
                            return {
                                pass: false,
                                message: "Expected B mode '" + actual.bOperand.mode +
                                        "' to equal B mode '" + expected.bOperand.mode + "'"
                            };
                        } else if (actual.bOperand.address !== expected.bOperand.address) {
                            return {
                                pass: false,
                                message: "Expected B address '" + actual.bOperand.address +
                                        "' to equal B address '" + expected.bOperand.address + "'"
                            };
                        }

                        return {
                            pass: true,
                            message: ""
                        };
                    }
                };
            }
        });
    });

    function prepareCore(
        size: number,
        instructions: IInstruction[]) {

        options.coresize = size;
        coreData = [];

        var j = 0;

        for (var i = 0; i < size; i++) {

            if (j < instructions.length && instructions[j].address === i) {
                coreData.push(instructions[j++]);
            } else {
                coreData.push(options.initialInstruction);
            }
        }

        core.executeAt = (task: ITask, address: number) => {
            return coreData[address % size];
        };
        core.readAt = (task: ITask, address: number) => {
            return coreData[address % size];
        };
        core.setAt = (task: ITask, address: number, value: IInstruction) => {
            coreData[address % size] = value;
        };
    }

    function buildContext(instructionPointer: number, aPointer: number, bPointer: number): IExecutionContext {

        var warrior = DataHelper.buildWarrior();
        var taskA = DataHelper.buildTask();
        var taskB = DataHelper.buildTask();
        var taskC = DataHelper.buildTask();

        state.warriors = [warrior];
        warrior.tasks = [taskA, taskB, taskC];

        state.warriorIndex = 0;
        warrior.taskIndex = 2;// Task Index 1 is executing but the index has been incremented by the fetch
        taskA.instructionPointer = 0;
        taskB.instructionPointer = instructionPointer;
        taskC.instructionPointer = 0;

        return {
            aPointer: aPointer,
            bPointer: bPointer,
            core: core,
            instruction: core.readAt(null, instructionPointer),
            instructionPointer: instructionPointer,
            task: taskB,
            taskIndex: 1,// Task which is actually executing
            warrior: warrior,
            warriorIndex: state.warriorIndex
        };
    }

    function decode(opcode: OpcodeType, modifier: ModifierType) {
        return opcode * ModifierType.Count + modifier;
    }

    // DAT

    it("removes the current task from the queue when the DAT instruction is executed",() => {

        prepareCore(5, [
            DataHelper.buildInstruction(3, OpcodeType.DAT, ModifierType.A, ModeType.Direct, 0, ModeType.Direct, 0)
        ]);

        var context = buildContext(3, 0, 0);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[OpcodeType.DAT](context);

        expect(state.warriors[0].taskIndex).toBe(1);
        expect(state.warriors[0].tasks.length).toBe(2);
        expect(state.warriors[0].tasks[0].instructionPointer).toBe(0);
        expect(state.warriors[0].tasks[1].instructionPointer).toBe(0);
    });

    // MOV

    it("MOV.A replaces the A number of the instruction pointed to by the B pointer with the A number of the \
        instruction pointed to by the A pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.MOV, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 4),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOV, ModifierType.A)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 4));
    });

    it("MOV.B replaces the B number of the instruction pointed to by the B pointer with the B number of the \
        instruction pointed to by the A pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.MOV, ModifierType.B, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 4),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOV, ModifierType.B)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 2));
    });

    it("MOV.AB replaces the B number of the instruction pointed to by the B pointer with the A number of the \
        instruction pointed to by the A pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.MOV, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 4),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOV, ModifierType.AB)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 1));
    });

    it("MOV.BA replaces the A number of the instruction pointed to by the B pointer with the B number of the \
        instruction pointed to by the A pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.MOV, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 4),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOV, ModifierType.BA)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 4));
    });

    it("MOV.F replaces the A and B numbers of the instruction pointed to by the B pointer with the A and B numbers of the \
        instruction pointed to by the A pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.MOV, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 4),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOV, ModifierType.F)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2));
    });

    it("MOV.X replaces the A and B numbers of the instruction pointed to by the B pointer with the B and A numbers of the \
        instruction pointed to by the A pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.MOV, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 4),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOV, ModifierType.X)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 1));
    });

    it("MOV.I replaces the instruction pointed to by the B pointer with the instruction pointed to by the A pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.MOV, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 3, ModeType.Direct, 4),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOV, ModifierType.I)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2));
    });

    // ADD

    it("ADD.A replaces the A number of the instruction pointed to by the B pointer with the sum of the A values pointed to \
        by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.ADD, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 13, ModeType.Direct, 19),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.ADD, ModifierType.A)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 15, ModeType.Direct, 19));

        expect(core.wrap).toHaveBeenCalledWith(15);
    });

    it("ADD.B replaces the B number of the instruction pointed to by the B pointer with the sum of the B values pointed to \
        by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.ADD, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 13, ModeType.Direct, 19),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.ADD, ModifierType.B)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 13, ModeType.Direct, 22));

        expect(core.wrap).toHaveBeenCalledWith(22);
    });

    it("ADD.AB replaces the B number of the instruction pointed to by the B pointer with the sum of the A value pointed to \
        by the A pointer and the B value pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.ADD, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 13, ModeType.Direct, 19),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.ADD, ModifierType.AB)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 13, ModeType.Direct, 21));

        expect(core.wrap).toHaveBeenCalledWith(21);
    });

    it("ADD.BA replaces the A number of the instruction pointed to by the B pointer with the sum of the A value pointed to \
        by the A pointer and the B value pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.ADD, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 13, ModeType.Direct, 19),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.ADD, ModifierType.BA)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 16, ModeType.Direct, 19));

        expect(core.wrap).toHaveBeenCalledWith(16);
    });

    it("ADD.F replaces the A and B numbers of the instruction pointed to by the B pointer with the sum of the A and B values \
        respectively pointed to by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.ADD, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 13, ModeType.Direct, 19),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.ADD, ModifierType.F)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 15, ModeType.Direct, 22));

        expect(core.wrap).toHaveBeenCalledWith(15);
        expect(core.wrap).toHaveBeenCalledWith(22);
    });

    it("ADD.X replaces the A and B numbers of the instruction pointed to by the B pointer with the sum of the B and A values \
        respectively pointed to by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.ADD, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 13, ModeType.Direct, 19),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.ADD, ModifierType.X)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 16, ModeType.Direct, 21));

        expect(core.wrap).toHaveBeenCalledWith(16);
        expect(core.wrap).toHaveBeenCalledWith(21);
    });

    it("ADD.I replaces the A and B numbers of the instruction pointed to by the B pointer with the sum of the A and B values \
        respectively pointed to by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.ADD, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 13, ModeType.Direct, 19),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.ADD, ModifierType.I)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 15, ModeType.Direct, 22));

        expect(core.wrap).toHaveBeenCalledWith(15);
        expect(core.wrap).toHaveBeenCalledWith(22);
    });

    // SUB

    it("SUB.A replaces the A number of the instruction pointed to by the B pointer with the difference of the A values \
        pointed to by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.SUB, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 13, ModeType.Direct, 19),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SUB, ModifierType.A)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 19));

        expect(core.wrap).toHaveBeenCalledWith(11);
    });

    it("SUB.B replaces the B number of the instruction pointed to by the B pointer with the difference of the B values \
        pointed to by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.SUB, ModifierType.B, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 13, ModeType.Direct, 19),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SUB, ModifierType.B)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 13, ModeType.Direct, 16));

        expect(core.wrap).toHaveBeenCalledWith(16);
    });

    it("SUB.AB replaces the B number of the instruction pointed to by the B pointer with the difference of the A value \
        pointed to by the A pointer and the B value pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.SUB, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 13, ModeType.Direct, 19),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SUB, ModifierType.AB)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 13, ModeType.Direct, 17));

        expect(core.wrap).toHaveBeenCalledWith(17);
    });

    it("SUB.BA replaces the A number of the instruction pointed to by the B pointer with the difference of the A value \
        pointed to by the A pointer and the B value pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.SUB, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 13, ModeType.Direct, 19),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SUB, ModifierType.BA)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 10, ModeType.Direct, 19));

        expect(core.wrap).toHaveBeenCalledWith(10);
    });

    it("SUB.F replaces the A and B numbers of the instruction pointed to by the B pointer with the difference of the A and \
        B values respectively pointed to by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.SUB, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 13, ModeType.Direct, 19),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SUB, ModifierType.F)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 16));

        expect(core.wrap).toHaveBeenCalledWith(11);
        expect(core.wrap).toHaveBeenCalledWith(16);
    });

    it("SUB.X replaces the A and B numbers of the instruction pointed to by the B pointer with the difference of the B and \
        A values respectively pointed to by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.SUB, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 13, ModeType.Direct, 19),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SUB, ModifierType.X)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 10, ModeType.Direct, 17));

        expect(core.wrap).toHaveBeenCalledWith(10);
        expect(core.wrap).toHaveBeenCalledWith(17);
    });

    it("SUB.I replaces the A and B numbers of the instruction pointed to by the B pointer with the difference of the A and \
        B values respectively pointed to by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.SUB, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 13, ModeType.Direct, 19),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SUB, ModifierType.I)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 16));

        expect(core.wrap).toHaveBeenCalledWith(11);
        expect(core.wrap).toHaveBeenCalledWith(16);
    });

    // MUL

    it("MUL.A replaces the A number of the instruction pointed to by the B pointer with the product of the A values pointed \
        to by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.MUL, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 7),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MUL, ModifierType.A)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 10, ModeType.Direct, 7));

        expect(core.wrap).toHaveBeenCalledWith(10);
    });

    it("MUL.B replaces the B number of the instruction pointed to by the B pointer with the product of the B values pointed \
        to by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.MUL, ModifierType.B, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 7),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MUL, ModifierType.B)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 21));

        expect(core.wrap).toHaveBeenCalledWith(21);
    });

    it("MUL.AB replaces the B number of the instruction pointed to by the B pointer with the product of the A value pointed \
        to by the A pointer and the B value pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.MUL, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 7),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MUL, ModifierType.AB)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 14));

        expect(core.wrap).toHaveBeenCalledWith(14);
    });

    it("MUL.BA replaces the A number of the instruction pointed to by the B pointer with the product of the A value pointed \
        to by the A pointer and the B value pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.MUL, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 7),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MUL, ModifierType.BA)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 15, ModeType.Direct, 7));

        expect(core.wrap).toHaveBeenCalledWith(15);
    });

    it("MUL.F replaces the A and B numbers of the instruction pointed to by the B pointer with the product of the A and \
        B values respectively pointed to by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.MUL, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 7),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MUL, ModifierType.F)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 10, ModeType.Direct, 21));

        expect(core.wrap).toHaveBeenCalledWith(10);
        expect(core.wrap).toHaveBeenCalledWith(21);
    });

    it("MUL.X replaces the A and B numbers of the instruction pointed to by the B pointer with the product of the B and \
        A values respectively pointed to by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.MUL, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 7),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MUL, ModifierType.X)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 15, ModeType.Direct, 14));

        expect(core.wrap).toHaveBeenCalledWith(15);
        expect(core.wrap).toHaveBeenCalledWith(14);
    });

    it("MUL.I replaces the A and B numbers of the instruction pointed to by the B pointer with the product of the A and \
        B values respectively pointed to by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.MUL, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 7),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MUL, ModifierType.I)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 10, ModeType.Direct, 21));

        expect(core.wrap).toHaveBeenCalledWith(10);
        expect(core.wrap).toHaveBeenCalledWith(21);
    });

    // DIV

    it("DIV.A replaces the A number of the instruction pointed to by the B pointer with the quotient of the A values \
        pointed to by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 7),
            DataHelper.buildInstruction(3, OpcodeType.DIV, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 3),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DIV, ModifierType.A)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 7));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 3));
    });

    it("DIV.B replaces the B number of the instruction pointed to by the B pointer with the quotient of the B values \
        pointed to by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 5, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.DIV, ModifierType.B, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 2, ModeType.Direct, 7),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DIV, ModifierType.B)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 5, ModeType.Immediate, 2));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 2, ModeType.Direct, 3));
    });

    it("DIV.AB replaces the B number of the instruction pointed to by the B pointer with the quotient of the A value \
        pointed to by the A pointer and the B value pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 5),
            DataHelper.buildInstruction(3, OpcodeType.DIV, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 3, ModeType.Direct, 16),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DIV, ModifierType.AB)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 5));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 3, ModeType.Direct, 5));
    });

    it("DIV.BA replaces the A number of the instruction pointed to by the B pointer with the quotient of the A value \
        pointed to by the A pointer and the B value pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 7, ModeType.Immediate, 4),
            DataHelper.buildInstruction(3, OpcodeType.DIV, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 9, ModeType.Direct, 2),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DIV, ModifierType.BA)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 7, ModeType.Immediate, 4));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 2, ModeType.Direct, 2));
    });

    it("DIV.F replaces the A and B numbers of the instruction pointed to by the B pointer with the quotient of the A and \
        B values respectively pointed to by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.DIV, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 10),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DIV, ModifierType.F)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 3));
    });

    it("DIV.X replaces the A and B numbers of the instruction pointed to by the B pointer with the quotient of the B and \
        A values respectively pointed to by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.DIV, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 10),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DIV, ModifierType.X)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 2));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 3));
    });

    it("DIV.I replaces the A and B numbers of the instruction pointed to by the B pointer with the quotient of the A and \
        B values respectively pointed to by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.DIV, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 10),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DIV, ModifierType.I)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 3));
    });

    it("DIV.A leaves the A number of the instruction pointed to by the B pointer unchanged if the A value pointed to by \
        the A pointer is zero when the instruction is DIV.A and removes the current task from the task list",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 7),
            DataHelper.buildInstruction(3, OpcodeType.DIV, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 3),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DIV, ModifierType.A)].apply(exec, [context]);

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 3));

        expect(state.warriors[0].taskIndex).toBe(1);
        expect(state.warriors[0].tasks.length).toBe(2);
        expect(state.warriors[0].tasks[0].instructionPointer).toBe(0);
        expect(state.warriors[0].tasks[1].instructionPointer).toBe(0);
    });

    it("DIV.B leaves the B number of the instruction pointed to by the B pointer unchanged if the B value pointed to by \
        the A pointer is zero when the instruction is DIV.B and removes the current task from the task list",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 5, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.DIV, ModifierType.B, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 2, ModeType.Direct, 7),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DIV, ModifierType.B)].apply(exec, [context]);

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 2, ModeType.Direct, 7));

        expect(state.warriors[0].taskIndex).toBe(1);
        expect(state.warriors[0].tasks.length).toBe(2);
        expect(state.warriors[0].tasks[0].instructionPointer).toBe(0);
        expect(state.warriors[0].tasks[1].instructionPointer).toBe(0);
    });

    it("DIV.AB leaves the B number of the instruction pointed to by the B pointer unchanged if the A value pointed to by \
        the A pointer is zero when the instruction is DIV.AB and removes the current task from the task list",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 5),
            DataHelper.buildInstruction(3, OpcodeType.DIV, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 3, ModeType.Direct, 16),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DIV, ModifierType.AB)].apply(exec, [context]);

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 3, ModeType.Direct, 16));

        expect(state.warriors[0].taskIndex).toBe(1);
        expect(state.warriors[0].tasks.length).toBe(2);
        expect(state.warriors[0].tasks[0].instructionPointer).toBe(0);
        expect(state.warriors[0].tasks[1].instructionPointer).toBe(0);
    });

    it("DIV.BA leaves the A number of the instruction pointed to by the B pointer unchanged if the A value pointed to by \
        the A pointer is zero when the instruction is DIV.BA and removes the current task from the task list",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 7, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.DIV, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 9, ModeType.Direct, 2),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DIV, ModifierType.BA)].apply(exec, [context]);

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 9, ModeType.Direct, 2));

        expect(state.warriors[0].taskIndex).toBe(1);
        expect(state.warriors[0].tasks.length).toBe(2);
        expect(state.warriors[0].tasks[0].instructionPointer).toBe(0);
        expect(state.warriors[0].tasks[1].instructionPointer).toBe(0);
    });

    it("DIV.F leaves the A number of the instruction pointed to by the A pointer unchanged if the A value pointed to by \
        the A pointer is zero when instruction is DIV.F and removes the current task from the task list",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.DIV, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 10),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DIV, ModifierType.F)].apply(exec, [context]);

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 3));

        expect(state.warriors[0].taskIndex).toBe(1);
        expect(state.warriors[0].tasks.length).toBe(2);
        expect(state.warriors[0].tasks[0].instructionPointer).toBe(0);
        expect(state.warriors[0].tasks[1].instructionPointer).toBe(0);
    });

    it("DIV.F leaves the B number of the instruction pointed to by the B pointer unchanged if the B value pointed to by \
        the B pointer is zero when instruction is DIV.F and removes the current task from the task list",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.DIV, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 10),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DIV, ModifierType.F)].apply(exec, [context]);

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 10));

        expect(state.warriors[0].taskIndex).toBe(1);
        expect(state.warriors[0].tasks.length).toBe(2);
        expect(state.warriors[0].tasks[0].instructionPointer).toBe(0);
        expect(state.warriors[0].tasks[1].instructionPointer).toBe(0);
    });

    it("DIV.X leaves the A number of the instruction pointed to by the A pointer unchanged if the B value pointed to by \
        the B pointer is zero when the instruction is DIV.X and removes the current task from the task list",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.DIV, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 10),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DIV, ModifierType.X)].apply(exec, [context]);

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 3));

        expect(state.warriors[0].taskIndex).toBe(1);
        expect(state.warriors[0].tasks.length).toBe(2);
        expect(state.warriors[0].tasks[0].instructionPointer).toBe(0);
        expect(state.warriors[0].tasks[1].instructionPointer).toBe(0);
    });

    it("DIV.X leaves the B number of the instruction pointed to by the B pointer unchanged if the A value pointed to by \
        the A pointer is zero when the instruction is DIV.X and removes the current task from the task list",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.DIV, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 10),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DIV, ModifierType.X)].apply(exec, [context]);

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 10));

        expect(state.warriors[0].taskIndex).toBe(1);
        expect(state.warriors[0].tasks.length).toBe(2);
        expect(state.warriors[0].tasks[0].instructionPointer).toBe(0);
        expect(state.warriors[0].tasks[1].instructionPointer).toBe(0);
    });

    it("DIV.I leaves the A number of the instruction pointed to by the A pointer unchanged if the A value pointed to by \
        the A pointer is zero when instruction is DIV.I and removes the current task from the task list",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.DIV, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 10),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DIV, ModifierType.I)].apply(exec, [context]);

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 3));

        expect(state.warriors[0].taskIndex).toBe(1);
        expect(state.warriors[0].tasks.length).toBe(2);
        expect(state.warriors[0].tasks[0].instructionPointer).toBe(0);
        expect(state.warriors[0].tasks[1].instructionPointer).toBe(0);
    });

    it("DIV.I leaves the B number of the instruction pointed to by the B pointer unchanged if the B value pointed to by \
        the B pointer is zero when instruction is DIV.I and removes the current task from the task list",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.DIV, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 10),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DIV, ModifierType.I)].apply(exec, [context]);

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 10));

        expect(state.warriors[0].taskIndex).toBe(1);
        expect(state.warriors[0].tasks.length).toBe(2);
        expect(state.warriors[0].tasks[0].instructionPointer).toBe(0);
        expect(state.warriors[0].tasks[1].instructionPointer).toBe(0);
    });

    // MOD

    it("MOD.A replaces the A number of the instruction pointed to by the B pointer with the remainder of the A values \
        pointed to by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 7),
            DataHelper.buildInstruction(3, OpcodeType.MOD, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 3),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOD, ModifierType.A)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 7));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 1, ModeType.Direct, 3));
    });

    it("MOD.B replaces the B number of the instruction pointed to by the B pointer with the remainder of the B values \
        pointed to by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 5, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.MOD, ModifierType.B, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 2, ModeType.Direct, 7),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOD, ModifierType.B)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 5, ModeType.Immediate, 2));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 2, ModeType.Direct, 1));
    });

    it("MOD.AB replaces the B number of the instruction pointed to by the B pointer with the remainder of the A value \
        pointed to by the A pointer and the B value pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 5),
            DataHelper.buildInstruction(3, OpcodeType.MOD, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 3, ModeType.Direct, 16),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOD, ModifierType.AB)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 5));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 3, ModeType.Direct, 1));
    });

    it("MOD.BA replaces the A number of the instruction pointed to by the B pointer with the remainder of the A value \
        pointed to by the A pointer and the B value pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 7, ModeType.Immediate, 4),
            DataHelper.buildInstruction(3, OpcodeType.MOD, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 9, ModeType.Direct, 2),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOD, ModifierType.BA)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 7, ModeType.Immediate, 4));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 1, ModeType.Direct, 2));
    });

    it("MOD.F replaces the A and B numbers of the instruction pointed to by the B pointer with the remainder of the A and \
        B values respectively pointed to by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.MOD, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 11),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOD, ModifierType.F)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 1, ModeType.Direct, 2));
    });

    it("MOD.X replaces the A and B numbers of the instruction pointed to by the B pointer with the remainder of the B and \
        A values respectively pointed to by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.MOD, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 11),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOD, ModifierType.X)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 2));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 1, ModeType.Direct, 2));
    });

    it("MOD.I replaces the A and B numbers of the instruction pointed to by the B pointer with the remainder of the A and \
        B values respectively pointed to by the A and B pointers",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.MOD, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 11),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOD, ModifierType.I)].apply(exec, [context]);

        expect(core.readAt(null, 2)).toEqualInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 1, ModeType.Direct, 2));
    });

    it("MOD.A leaves the A number of the instruction pointed to by the B pointer unchanged if the A value pointed to by the \
        A pointer is zero and removes the current task from the task list",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 7),
            DataHelper.buildInstruction(3, OpcodeType.MOD, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 3),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOD, ModifierType.A)].apply(exec, [context]);

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 3));

        expect(state.warriors[0].taskIndex).toBe(1);
        expect(state.warriors[0].tasks.length).toBe(2);
        expect(state.warriors[0].tasks[0].instructionPointer).toBe(0);
        expect(state.warriors[0].tasks[1].instructionPointer).toBe(0);
    });

    it("MOD.B leaves the B number of the instruction pointed to by the B pointer unchanged if the B value pointed to by the \
        A pointer is zero and removes the current task from the task list",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 5, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.MOD, ModifierType.B, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 2, ModeType.Direct, 7),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOD, ModifierType.B)].apply(exec, [context]);

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 2, ModeType.Direct, 7));

        expect(state.warriors[0].taskIndex).toBe(1);
        expect(state.warriors[0].tasks.length).toBe(2);
        expect(state.warriors[0].tasks[0].instructionPointer).toBe(0);
        expect(state.warriors[0].tasks[1].instructionPointer).toBe(0);
    });

    it("MOD.AB leaves the B number of the instruction pointed to by the B pointer unchanged if the A value pointed to by the \
        A pointer is zero and removes the current task from the task list",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 5),
            DataHelper.buildInstruction(3, OpcodeType.MOD, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 3, ModeType.Direct, 16),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOD, ModifierType.AB)].apply(exec, [context]);

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 3, ModeType.Direct, 16));

        expect(state.warriors[0].taskIndex).toBe(1);
        expect(state.warriors[0].tasks.length).toBe(2);
        expect(state.warriors[0].tasks[0].instructionPointer).toBe(0);
        expect(state.warriors[0].tasks[1].instructionPointer).toBe(0);
    });

    it("MOD.BA leaves the A number of the instruction pointed to by the B pointer unchanged if the A value pointed to by the \
        A pointer is zero and removes the current task from the task list",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 7, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.MOD, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 9, ModeType.Direct, 2),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOD, ModifierType.BA)].apply(exec, [context]);

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 9, ModeType.Direct, 2));

        expect(state.warriors[0].taskIndex).toBe(1);
        expect(state.warriors[0].tasks.length).toBe(2);
        expect(state.warriors[0].tasks[0].instructionPointer).toBe(0);
        expect(state.warriors[0].tasks[1].instructionPointer).toBe(0);
    });

    it("MOD.F leaves the A number of the instruction pointed to by the A pointer unchanged if the A value pointed to by the \
        A pointer is zero and removes the current task from the task list",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.MOD, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 10),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOD, ModifierType.F)].apply(exec, [context]);

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 1));

        expect(state.warriors[0].taskIndex).toBe(1);
        expect(state.warriors[0].tasks.length).toBe(2);
        expect(state.warriors[0].tasks[0].instructionPointer).toBe(0);
        expect(state.warriors[0].tasks[1].instructionPointer).toBe(0);
    });

    it("MOD.F leaves the B number of the instruction pointed to by the B pointer unchanged if the B value pointed to by the \
        B pointer is zero and removes the current task from the task list",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.MOD, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 10),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOD, ModifierType.F)].apply(exec, [context]);

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 1, ModeType.Direct, 10));

        expect(state.warriors[0].taskIndex).toBe(1);
        expect(state.warriors[0].tasks.length).toBe(2);
        expect(state.warriors[0].tasks[0].instructionPointer).toBe(0);
        expect(state.warriors[0].tasks[1].instructionPointer).toBe(0);
    });

    it("MOD.X leaves the A number of the instruction pointed to by the A pointer unchanged if the B value pointed to by the \
        B pointer is zero and removes the current task from the task list",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.MOD, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 10),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOD, ModifierType.X)].apply(exec, [context]);

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 1));

        expect(state.warriors[0].taskIndex).toBe(1);
        expect(state.warriors[0].tasks.length).toBe(2);
        expect(state.warriors[0].tasks[0].instructionPointer).toBe(0);
        expect(state.warriors[0].tasks[1].instructionPointer).toBe(0);
    });

    it("MOD.X leaves the B number of the instruction pointed to by the B pointer unchanged if the A value pointed to by the \
        A pointer is zero and removes the current task from the task list",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.MOD, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 10),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOD, ModifierType.X)].apply(exec, [context]);

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 1, ModeType.Direct, 10));

        expect(state.warriors[0].taskIndex).toBe(1);
        expect(state.warriors[0].tasks.length).toBe(2);
        expect(state.warriors[0].tasks[0].instructionPointer).toBe(0);
        expect(state.warriors[0].tasks[1].instructionPointer).toBe(0);
    });

    it("MOD.I leaves the A number of the instruction pointed to by the A pointer unchanged if the A value pointed to by the \
        A pointer is zero and removes the current task from the task list",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.MOD, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 10),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOD, ModifierType.I)].apply(exec, [context]);

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 1));

        expect(state.warriors[0].taskIndex).toBe(1);
        expect(state.warriors[0].tasks.length).toBe(2);
        expect(state.warriors[0].tasks[0].instructionPointer).toBe(0);
        expect(state.warriors[0].tasks[1].instructionPointer).toBe(0);
    });

    it("MOD.I leaves the B number of the instruction pointed to by the B pointer unchanged if the B value pointed to by the \
        B pointer is zero and removes the current task from the task list",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.MOD, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 10),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.MOD, ModifierType.I)].apply(exec, [context]);

        expect(core.readAt(null, 4)).toEqualInstruction(
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 1, ModeType.Direct, 10));

        expect(state.warriors[0].taskIndex).toBe(1);
        expect(state.warriors[0].tasks.length).toBe(2);
        expect(state.warriors[0].tasks[0].instructionPointer).toBe(0);
        expect(state.warriors[0].tasks[1].instructionPointer).toBe(0);
    });

    // JMP

    it("JMP sets the current task's instruction pointer to the A pointer",() => {

        prepareCore(5, [
            DataHelper.buildInstruction(1, OpcodeType.JMP, ModifierType.A, ModeType.Direct, 3, ModeType.Direct, 0)
        ]);

        var context = buildContext(1, 4, 0);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMP, ModifierType.A)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    // JMZ

    it("JMZ.A sets the current task's instruction pointer to the A pointer if the A value pointed to by the B pointer if zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.A)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
    });

    it("JMZ.A does not alter the current task's instruction pointer if the A value pointed to by the B pointer if not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.A)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("JMZ.BA sets the current task's instruction pointer to the A pointer if the A value pointed to by the B pointer if zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.BA)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
    });

    it("JMZ.BA does not alter the current task's instruction pointer if the A value pointed to by the B pointer if not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.BA)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("JMZ.B sets the current task's instruction pointer to the A pointer if the B value pointed to by the B pointer if zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.B)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
    });

    it("JMZ.B does not alter the current task's instruction pointer if the B value pointed to by the B pointer if not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.B)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("JMZ.AB sets the current task's instruction pointer to the A pointer if the B value pointed to by the B pointer if zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.AB)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
    });

    it("JMZ.AB does not alter the current task's instruction pointer if the B value pointed to by the B pointer if not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.AB)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("JMZ.F sets the current task's instruction pointer to the A pointer if the A and B values pointed to by the B \
        pointer are zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.F)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
    });

    it("JMZ.F does not alter the current task's instruction pointer if the A value pointed to by the B pointer if not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.F)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("JMZ.F does not alter the current task's instruction pointer if the B value pointed to by the B pointer if not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.F)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("JMZ.X sets the current task's instruction pointer to the A pointer if the A and B values pointed to by the B \
        pointer are zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.X)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
    });

    it("JMZ.X does not alter the current task's instruction pointer if the A value pointed to by the B pointer if not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.X)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("JMZ.X does not alter the current task's instruction pointer if the B value pointed to by the B pointer if not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.X)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("JMZ.I sets the current task's instruction pointer to the A pointer if the A and B values pointed to by the B \
        pointer are zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
    });

    it("JMZ.I does not alter the current task's instruction pointer if the A value pointed to by the B pointer if not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("JMZ.I does not alter the current task's instruction pointer if the B value pointed to by the B pointer if not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    // JMN

    it("JMN.A sets the current task's instruction pointer to the A pointer if the A value pointed to by the B pointer if not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.A)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
    });

    it("JMN.A does not alter the current task's instruction pointer if the A value pointed to by the B pointer if zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.A)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("JMN.BA sets the current task's instruction pointer to the A pointer if the A value pointed to by the B pointer if not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.BA)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
    });

    it("JMN.BA does not alter the current task's instruction pointer if the A value pointed to by the B pointer if zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.BA)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("JMN.B sets the current task's instruction pointer to the A pointer if the B value pointed to by the B pointer if not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.B)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
    });

    it("JMN.B does not alter the current task's instruction pointer if the B value pointed to by the B pointer if zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.B)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("JMN.AB sets the current task's instruction pointer to the A pointer if the B value pointed to by the B pointer if not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.AB)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
    });

    it("JMN.AB does not alter the current task's instruction pointer if the B value pointed to by the B pointer if zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.AB)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("JMN.F does not alter the current task's instruction pointer if both the A & B values pointed to by the B pointer are zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.F)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("JMN.F sets the current task's instruction pointer to the A pointer if the A value pointed to by the B pointer is not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.F)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
    });

    it("JMN.F sets the current task's instruction pointer to the A pointer if the B value pointed to by the B pointer is not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.F)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
    });

    it("JMN.X does not alter the current task's instruction pointer if both the A & B values pointed to by the B pointer are zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.X)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("JMN.X sets the current task's instruction pointer to the A pointer if the A value pointed to by the B pointer is not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.X)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
    });

    it("JMN.X sets the current task's instruction pointer to the A pointer if the B value pointed to by the B pointer is not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.X)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
    });

    it("JMN.I does not alter the current task's instruction pointer if both the A & B values pointed to by the B pointer are zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("JMN.I sets the current task's instruction pointer to the A pointer if the A value pointed to by the B pointer is not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
    });

    it("JMN.I sets the current task's instruction pointer to the A pointer if the B value pointed to by the B pointer is not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
    });

    // DJN

    it("DJN.A decrements the A value pointed to by the B pointer then sets the current task's instruction pointer to the A \
        pointer if the A value pointed to by the B pointer if not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DJN, ModifierType.A)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
        expect(context.core.wrap).toHaveBeenCalledWith(1);
    });

    it("DJN.A decrements the A value pointed to by the B pointer then does not alter the current task's instruction pointer \
        if the A value pointed to by the B pointer if zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DJN, ModifierType.A)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).toHaveBeenCalledWith(0);
    });

    it("DJN.BA decrements the A value pointed to by the B pointer then sets the current task's instruction pointer to the A \
        pointer if the A value pointed to by the B pointer if not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DJN, ModifierType.BA)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
        expect(context.core.wrap).toHaveBeenCalledWith(1);
    });

    it("DJN.BA decrements the A value pointed to by the B pointer then does not alter the current task's instruction pointer \
        if the A value pointed to by the B pointer if zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DJN, ModifierType.BA)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).toHaveBeenCalledWith(0);
    });

    it("DJN.B decrements the B value pointed to by the B pointer then sets the current task's instruction pointer to the A \
        pointer if the B value pointed to by the B pointer if not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 2),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DJN, ModifierType.B)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
        expect(context.core.wrap).toHaveBeenCalledWith(1);
    });

    it("DJN.B decrements the B value pointed to by the B pointer then does not alter the current task's instruction pointer \
        if the B value pointed to by the B pointer if zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DJN, ModifierType.B)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).toHaveBeenCalledWith(0);
    });

    it("DJN.AB decrements the B value pointed to by the B pointer then sets the current task's instruction pointer to the A \
        pointer if the B value pointed to by the B pointer if not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 2),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DJN, ModifierType.AB)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
        expect(context.core.wrap).toHaveBeenCalledWith(1);
    });

    it("DJN.AB decrements the B value pointed to by the B pointer then does not alter the current task's instruction pointer \
        if the B value pointed to by the B pointer if zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DJN, ModifierType.AB)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).toHaveBeenCalledWith(0);
    });

    it("DJN.F decrements the A & B values pointed to by the B pointer then does not alter the current task's instruction \
        pointer if both the A & B values pointed to by the B pointer are zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DJN, ModifierType.F)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).toHaveBeenCalledWith(0);
    });

    it("DJN.F decrements the A & B values pointed to by the B pointer then sets the current task's instruction pointer to \
        the A pointer if the A value pointed to by the B pointer is not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DJN, ModifierType.F)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
        expect(context.core.wrap).toHaveBeenCalledWith(1);
        expect(context.core.wrap).toHaveBeenCalledWith(0);
    });

    it("DJN.F decrements the A & B values pointed to by the B pointer then sets the current task's instruction pointer to \
        the A pointer if the B value pointed to by the B pointer is not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DJN, ModifierType.F)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
        expect(context.core.wrap).toHaveBeenCalledWith(1);
        expect(context.core.wrap).toHaveBeenCalledWith(0);
    });

    it("DJN.X decrements the A & B values pointed to by the B pointer then does not alter the current task's instruction \
        pointer if both the A & B values pointed to by the B pointer are zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DJN, ModifierType.X)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).toHaveBeenCalledWith(0);
    });

    it("DJN.X decrements the A & B values pointed to by the B pointer then sets the current task's instruction pointer to \
        the A pointer if the A value pointed to by the B pointer is not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DJN, ModifierType.X)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
        expect(context.core.wrap).toHaveBeenCalledWith(1);
        expect(context.core.wrap).toHaveBeenCalledWith(0);
    });

    it("DJN.X decrements the A & B values pointed to by the B pointer then sets the current task's instruction pointer to \
        the A pointer if the B value pointed to by the B pointer is not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DJN, ModifierType.X)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
        expect(context.core.wrap).toHaveBeenCalledWith(1);
        expect(context.core.wrap).toHaveBeenCalledWith(0);
    });

    it("DJN.I decrements the A & B values pointed to by the B pointer then does not alter the current task's instruction \
        pointer if both the A & B values pointed to by the B pointer are zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DJN, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).toHaveBeenCalledWith(0);
    });

    it("DJN.I decrements the A & B values pointed to by the B pointer then sets the current task's instruction pointer to \
        the A pointer if the A value pointed to by the B pointer is not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DJN, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
        expect(context.core.wrap).toHaveBeenCalledWith(1);
        expect(context.core.wrap).toHaveBeenCalledWith(0);
    });

    it("DJN.I decrements the A & B values pointed to by the B pointer then sets the current task's instruction pointer to \
        the A pointer if the B value pointed to by the B pointer is not zero",() => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.DJN, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
        expect(context.core.wrap).toHaveBeenCalledWith(1);
        expect(context.core.wrap).toHaveBeenCalledWith(0);
    });

    // CMP

    it("CMP.A does not modify the instruction pointer if the A values pointed to by the A and B pointers are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.CMP, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.CMP, ModifierType.A)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("CMP.A adds one to the instruction pointer if the A values pointed to by the A and B pointers are equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.CMP, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 4),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.CMP, ModifierType.A)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("CMP.B does not modify the instruction pointer if the B values pointed to by the A and B pointers are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
            DataHelper.buildInstruction(3, OpcodeType.CMP, ModifierType.B, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 3),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.CMP, ModifierType.B)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("CMP.B adds one to the instruction pointer if the B values pointed to by the A and B pointers are equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 1),
            DataHelper.buildInstruction(3, OpcodeType.CMP, ModifierType.B, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 4, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.CMP, ModifierType.B)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("CMP.AB does not modify the instruction pointer if the A & B values pointed to by the A & B pointers respectively \
        are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.CMP, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 3),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.CMP, ModifierType.AB)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("CMP.AB adds one to the instruction pointer if the A & B values pointed to by the A & B pointers respectively are equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.CMP, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 4, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.CMP, ModifierType.AB)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("CMP.BA does not modify the instruction pointer if the A & B values pointed to by the A & B pointers respectively \
        are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
            DataHelper.buildInstruction(3, OpcodeType.CMP, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.CMP, ModifierType.BA)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("CMP.BA adds one to the instruction pointer if the A & B values pointed to by the A & B pointers respectively are equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 1),
            DataHelper.buildInstruction(3, OpcodeType.CMP, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 4),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.CMP, ModifierType.BA)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("CMP.F does not modify the instruction pointer if the A values pointed to by the A & B pointers are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.CMP, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.CMP, ModifierType.F)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("CMP.F does not modify the instruction pointer if the B values pointed to by the A & B pointers are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.CMP, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.CMP, ModifierType.F)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("CMP.F adds one to the instruction pointer if both the A values pointed to by the A and B pointers and the B \
        values pointed to by the A & B pointers are equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.CMP, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.CMP, ModifierType.F)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("CMP.X does not modify the instruction pointer if the A value pointed to by the B pointer and the B value pointed \
        to by the A pointer are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.CMP, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.CMP, ModifierType.X)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("CMP.X does not modify the instruction pointer if the B value pointed to by the A pointer and the A value pointed \
        to by the B pointer are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.CMP, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.CMP, ModifierType.X)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("CMP.X adds one to the instruction pointer if both the B value pointed to by the A pointer and the A value pointed \
        to by the B pointer are equal and vice versa",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.CMP, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.CMP, ModifierType.X)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("CMP.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by opcode",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.CMP, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.CMP, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("CMP.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by modifier",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.X, ModeType.Immediate, 0, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.CMP, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.CMP, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("CMP.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by A mode",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Direct, 0, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.CMP, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.CMP, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("CMP.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by A address",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.CMP, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.CMP, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("CMP.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by B mode",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Direct, 0),
            DataHelper.buildInstruction(3, OpcodeType.CMP, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.CMP, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("CMP.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by B address",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
            DataHelper.buildInstruction(3, OpcodeType.CMP, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.CMP, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("CMP.I adds one to the instruction pointer if both the B value pointed to by the A pointer and the A value pointed \
        to by the B pointer are equal and vice versa",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
            DataHelper.buildInstruction(3, OpcodeType.CMP, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.CMP, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    // SEQ

    it("SEQ.A does not modify the instruction pointer if the A values pointed to by the A and B pointers are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SEQ, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SEQ, ModifierType.A)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SEQ.A adds one to the instruction pointer if the A values pointed to by the A and B pointers are equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.SEQ, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 4),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SEQ, ModifierType.A)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("SEQ.B does not modify the instruction pointer if the B values pointed to by the A and B pointers are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
            DataHelper.buildInstruction(3, OpcodeType.SEQ, ModifierType.B, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 3),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SEQ, ModifierType.B)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SEQ.B adds one to the instruction pointer if the B values pointed to by the A and B pointers are equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 1),
            DataHelper.buildInstruction(3, OpcodeType.SEQ, ModifierType.B, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 4, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SEQ, ModifierType.B)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("SEQ.AB does not modify the instruction pointer if the A & B values pointed to by the A & B pointers respectively \
        are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SEQ, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 3),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SEQ, ModifierType.AB)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SEQ.AB adds one to the instruction pointer if the A & B values pointed to by the A & B pointers respectively are equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.SEQ, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 4, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SEQ, ModifierType.AB)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("SEQ.BA does not modify the instruction pointer if the A & B values pointed to by the A & B pointers respectively \
        are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
            DataHelper.buildInstruction(3, OpcodeType.SEQ, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SEQ, ModifierType.BA)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SEQ.BA adds one to the instruction pointer if the A & B values pointed to by the A & B pointers respectively are equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 1),
            DataHelper.buildInstruction(3, OpcodeType.SEQ, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 4),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SEQ, ModifierType.BA)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("SEQ.F does not modify the instruction pointer if the A values pointed to by the A & B pointers are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SEQ, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SEQ, ModifierType.F)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SEQ.F does not modify the instruction pointer if the B values pointed to by the A & B pointers are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SEQ, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SEQ, ModifierType.F)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SEQ.F adds one to the instruction pointer if both the A values pointed to by the A and B pointers and the B values \
        pointed to by the A & B pointers are equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SEQ, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SEQ, ModifierType.F)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("SEQ.X does not modify the instruction pointer if the A value pointed to by the B pointer and the B value pointed \
        to by the A pointer are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SEQ, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SEQ, ModifierType.X)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SEQ.X does not modify the instruction pointer if the B value pointed to by the A pointer and the A value pointed \
        to by the B pointer are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SEQ, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SEQ, ModifierType.X)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SEQ.X adds one to the instruction pointer if both the B value pointed to by the A pointer and the A value pointed \
        to by the B pointer are equal and vice versa",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SEQ, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SEQ, ModifierType.X)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("SEQ.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by opcode",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SEQ, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SEQ, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SEQ.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by modifier",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.X, ModeType.Immediate, 0, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SEQ, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SEQ, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SEQ.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by A mode",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Direct, 0, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SEQ, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SEQ, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SEQ.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by A address",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SEQ, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SEQ, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SEQ.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by B mode",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Direct, 0),
            DataHelper.buildInstruction(3, OpcodeType.SEQ, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SEQ, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SEQ.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by B address",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
            DataHelper.buildInstruction(3, OpcodeType.SEQ, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SEQ, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SEQ.I adds one to the instruction pointer if both the B value pointed to by the A pointer and the A value pointed \
        to by the B pointer are equal and vice versa",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
            DataHelper.buildInstruction(3, OpcodeType.SEQ, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SEQ, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    // SNE

    it("SNE.A does not modify the instruction pointer if the A values pointed to by the A and B pointers are equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SNE, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SNE, ModifierType.A)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SNE.A adds one to the instruction pointer if the A values pointed to by the A and B pointers are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.SNE, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 4),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SNE, ModifierType.A)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("SNE.B does not modify the instruction pointer if the B values pointed to by the A and B pointers are equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
            DataHelper.buildInstruction(3, OpcodeType.SNE, ModifierType.B, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SNE, ModifierType.B)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SNE.B adds one to the instruction pointer if the B values pointed to by the A and B pointers are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 1),
            DataHelper.buildInstruction(3, OpcodeType.SNE, ModifierType.B, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 4, ModeType.Immediate, 3),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SNE, ModifierType.B)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("SNE.AB does not modify the instruction pointer if the A & B values pointed to by the A & B pointers respectively are equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SNE, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 3),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SNE, ModifierType.AB)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SNE.AB adds one to the instruction pointer if the A & B values pointed to by the A & B pointers respectively are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.SNE, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 4, ModeType.Immediate, 3),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SNE, ModifierType.AB)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("SNE.BA does not modify the instruction pointer if the A & B values pointed to by the A & B pointers respectively are equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
            DataHelper.buildInstruction(3, OpcodeType.SNE, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SNE, ModifierType.BA)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SNE.BA adds one to the instruction pointer if the A & B values pointed to by the A & B pointers respectively are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 1),
            DataHelper.buildInstruction(3, OpcodeType.SNE, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 4),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SNE, ModifierType.BA)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("SNE.F adds one to the instruction pointer if the A values pointed to by the A & B pointers are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SNE, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SNE, ModifierType.F)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);

    });

    it("SNE.F adds one to the instruction pointer if the B values pointed to by the A & B pointers are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SNE, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SNE, ModifierType.F)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("SNE.F does not modify the instruction pointer if both the A values pointed to by the A and B pointers and the \
        B values pointed to by the A & B pointers are equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SNE, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SNE, ModifierType.F)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SNE.X adds one to the instruction pointer if the A value pointed to by the B pointer and the B value pointed \
        to by the A pointer are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SNE, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SNE, ModifierType.X)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("SNE.X adds one to the instruction pointer if the B value pointed to by the A pointer and the A value pointed \
        to by the B pointer are not equal",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SNE, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SNE, ModifierType.X)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("SNE.X does not modify the instruction pointer if both the B value pointed to by the A pointer and the A value \
        pointed to by the B pointer are equal and vice versa",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SNE, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SNE, ModifierType.X)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SNE.I adds one to the instruction pointer if the instructions pointed to by the A & B pointers differ by opcode",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SNE, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SNE, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("SNE.I adds one to the instruction pointer if the instructions pointed to by the A & B pointers differ by modifier",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.X, ModeType.Immediate, 0, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SNE, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SNE, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("SNE.I adds one to the instruction pointer if the instructions pointed to by the A & B pointers differ by A mode",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Direct, 0, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SNE, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SNE, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("SNE.I adds one to the instruction pointer if the instructions pointed to by the A & B pointers differ by A address",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SNE, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SNE, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("SNE.I adds one to the instruction pointer if the instructions pointed to by the A & B pointers differ by B mode",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Direct, 0),
            DataHelper.buildInstruction(3, OpcodeType.SNE, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SNE, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("SNE.I adds one to the instruction pointer if the instructions pointed to by the A & B pointers differ by B address",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
            DataHelper.buildInstruction(3, OpcodeType.SNE, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SNE, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("SNE.I does not modify the instruction pointer if both the B value pointed to by the A pointer and the A value \
        pointed to by the B pointer are equal and vice versa",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
            DataHelper.buildInstruction(3, OpcodeType.SNE, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SNE, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    // SLT

    it("SLT.A does not modify the instruction pointer if the A value pointed to by the A pointer is greater than the A \
        value pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.SLT, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 4),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SLT, ModifierType.A)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SLT.A adds one to the instruction pointer if the A value pointed to by the A pointer is less than the A value \
        pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 4),
            DataHelper.buildInstruction(3, OpcodeType.SLT, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SLT, ModifierType.A)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("SLT.B does not modify the instruction pointer if the B value pointed to by the A pointer is greater than the B \
        value pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.SLT, ModifierType.B, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SLT, ModifierType.B)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SLT.B adds one to the instruction pointer if the B value pointed to by the A pointer is less than the B value \
        pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 4, ModeType.Immediate, 1),
            DataHelper.buildInstruction(3, OpcodeType.SLT, ModifierType.B, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 2),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SLT, ModifierType.B)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("SLT.AB does not modify the instruction pointer if the A value pointed to by the A pointer is greater than the \
        B value pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 4, ModeType.Immediate, 1),
            DataHelper.buildInstruction(3, OpcodeType.SLT, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SLT, ModifierType.AB)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SLT.AB adds one to the instruction pointer if the A value pointed to by the A pointer is less than the B value \
        pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.SLT, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 4),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SLT, ModifierType.AB)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("SLT.BA does not modify the instruction pointer if the B value pointed to by the A pointer is greater than the A \
        value pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 4),
            DataHelper.buildInstruction(3, OpcodeType.SLT, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 5),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SLT, ModifierType.BA)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SLT.BA adds one to the instruction pointer if the B value pointed to by the A pointer is less than the A value \
        pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 5, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.SLT, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 4, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SLT, ModifierType.BA)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);
    });

    it("SLT.F adds one to the instruction pointer if the A & B values pointed to by the A pointer are less than the A & B \
        values pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.SLT, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 4),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SLT, ModifierType.F)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);

    });

    it("SLT.F does not modify the instruction pointer if the A value pointed to by the A pointer is greater than the A \
        value pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SLT, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SLT, ModifierType.F)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SLT.F does not modify the instruction pointer if the B value pointed to by the A pointer is greater than the B \
        value pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.SLT, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SLT, ModifierType.F)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SLT.X adds one to the instruction pointer if the A & B values pointed to by the A pointer are less than the B & A \
        values pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 1),
            DataHelper.buildInstruction(3, OpcodeType.SLT, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 4),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SLT, ModifierType.X)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);

    });

    it("SLT.X does not modify the instruction pointer if the B value pointed to by the A pointer is greater than the A \
        value pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.SLT, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 4),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SLT, ModifierType.X)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SLT.X does not modify the instruction pointer if the A value pointed to by the A pointer is greater than the B \
        value pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.SLT, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 4, ModeType.Immediate, 2),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SLT, ModifierType.X)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SLT.I adds one to the instruction pointer if the A & B values pointed to by the A pointer are less than the A & B \
        values pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 3),
            DataHelper.buildInstruction(3, OpcodeType.SLT, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 4),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SLT, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(4);
        expect(context.core.wrap).toHaveBeenCalledWith(4);

    });

    it("SLT.I does not modify the instruction pointer if the A value pointed to by the A pointer is greater than the A \
        value pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
            DataHelper.buildInstruction(3, OpcodeType.SLT, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SLT, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    it("SLT.I does not modify the instruction pointer if the B value pointed to by the A pointer is greater than the B \
        value pointed to by the B pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.SLT, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SLT, ModifierType.I)].apply(exec, [context]);

        expect(context.task.instructionPointer).toBe(3);
        expect(context.core.wrap).not.toHaveBeenCalled();
    });

    // SPL

    it("SPL inserts an additional task to the current warrior's task list, directly after the current task",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.SPL, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SPL, ModifierType.F)].apply(exec, [context]);

        expect(context.warrior.tasks.length).toBe(4);
    });

    it("SPL sets the newly created task's instruction pointer to the A pointer",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.SPL, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SPL, ModifierType.F)].apply(exec, [context]);

        expect(context.warrior.tasks[2].instructionPointer).toBe(2);
        expect(context.core.wrap).toHaveBeenCalledWith(2);
    });

    it("SPL increments the current warrior's task index",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.SPL, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SPL, ModifierType.F)].apply(exec, [context]);

        expect(context.warrior.taskIndex).toBe(3);
    });

    it("SPL wraps the task index to zero if it exceeds the number of tasks in the queue",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.SPL, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        context.warrior.tasks.splice(2, 1);

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SPL, ModifierType.F)].apply(exec, [context]);

        expect(context.warrior.taskIndex).toBe(0);
    });

    it("SPL does not create a new task if this will breach the maximum number of tasks for the current warrior",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.SPL, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        options.instructionLimit = 3;

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SPL, ModifierType.F)].apply(exec, [context]);

        expect(context.warrior.tasks.length).toBe(3);
    });

    it("SPL does not increment the current warrior's task index if maximum number of tasks for the current warrior \
        has been reached",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.SPL, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        state.options.instructionLimit = 3;

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SPL, ModifierType.F)].apply(exec, [context]);

        expect(context.warrior.taskIndex).toBe(2);
    });

    // NOP

    it("NOP does nothing",() => {

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.B, ModeType.Immediate, 1, ModeType.AIndirect, 2),
            DataHelper.buildInstruction(3, OpcodeType.NOP, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.ADD, ModifierType.AB, ModeType.APostIncrement, 2, ModeType.BPostIncrement, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        state.options.instructionLimit = 3;

        var exec = new Executive();
		exec.initialise(options);
        exec.commandTable[decode(OpcodeType.NOP, ModifierType.F)].apply(exec, [context]);

        expect(instructions[0]).toEqualInstruction(DataHelper.buildInstruction(
            2, OpcodeType.MOV, ModifierType.B, ModeType.Immediate, 1, ModeType.AIndirect, 2));

        expect(instructions[1]).toEqualInstruction(DataHelper.buildInstruction(
            3, OpcodeType.NOP, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1));

        expect(instructions[2]).toEqualInstruction(DataHelper.buildInstruction(
            4, OpcodeType.ADD, ModifierType.AB, ModeType.APostIncrement, 2, ModeType.BPostIncrement, 0));

        expect(context.warrior.tasks.length).toBe(3);
        expect(context.warrior.taskIndex).toBe(2);
        expect(context.warrior.tasks[1].instructionPointer).toBe(3);
    });
});