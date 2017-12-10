import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
var expect = chai.expect;
chai.use(sinonChai);

import { OpcodeType, ModifierType } from "../interface/IInstruction";
import { IInstruction } from "../interface/IInstruction";
import { ICore, ICoreAccessEventArgs, CoreAccessType } from "../interface/ICore";
import Defaults from "../Defaults";
import { IOptions } from "../interface/IOptions";
import { IState } from "../interface/IState";
import { ModeType } from "../interface/IOperand";
import { Executive } from "../Executive";
import { IExecutionContext } from "../interface/IExecutionContext";
import { ITask } from "../interface/ITask";
import DataHelper from "./DataHelper";
import * as _ from "underscore";

"use strict";

describe("Executive", () => {

    var state: IState;
    var core: ICore;
    var options: IOptions;

    var coreData: IInstruction[];

    beforeEach(() => {

        options = Object.assign({}, Defaults);
        options.coresize = 5;
        options.instructionLimit = 100;

        var readAtSpy = sinon.stub();
        readAtSpy.returns(options.initialInstruction);

        var getAtSpy = sinon.stub();
        getAtSpy.returns(options.initialInstruction);

        var executeAtSpy = sinon.stub();
        executeAtSpy.returns(options.initialInstruction);

        var setAtSpy = sinon.stub();

        var wrapSpy = sinon.stub();
        wrapSpy.callsFake((address: number) => {
            return address;
        });

        core = {
            getSize: () => { return 0; },
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
            cycle: 0,
            options: options,
            warriorIndex: 0,
            warriors: []
        };

        chai.use((chai, util) => {
            chai.Assertion.addMethod("thisInstruction", function(expected: IInstruction) {

                var actual = <IInstruction>this._obj;

                this.assert(
                    actual.opcode === expected.opcode,
                    "expected #{this} to have opcode #{exp} but got #{act}",
                    "ITS NOT CLEAR FROM THE DOCS WHAT THIS STRING IS FOR - LET ME KNOW IF YOU SEE IT!!",
                    expected.opcode,
                    actual.opcode
                );

                this.assert(
                    actual.modifier === expected.modifier,
                    "expected #{this} to have modifier #{exp} but got #{act}",
                    "ITS NOT CLEAR FROM THE DOCS WHAT THIS STRING IS FOR - LET ME KNOW IF YOU SEE IT!!",
                    expected.modifier,
                    actual.modifier
                );

                this.assert(
                    actual.aOperand.mode === expected.aOperand.mode,
                    "expected #{this} to have A operand mode #{exp} but got #{act}",
                    "ITS NOT CLEAR FROM THE DOCS WHAT THIS STRING IS FOR - LET ME KNOW IF YOU SEE IT!!",
                    expected.aOperand.mode,
                    actual.aOperand.mode
                );

                this.assert(
                    actual.aOperand.address === expected.aOperand.address,
                    "expected #{this} to have A operand address #{exp} but got #{act}",
                    "ITS NOT CLEAR FROM THE DOCS WHAT THIS STRING IS FOR - LET ME KNOW IF YOU SEE IT!!",
                    expected.aOperand.address,
                    actual.aOperand.address
                );

                this.assert(
                    actual.bOperand.mode === expected.bOperand.mode,
                    "expected #{this} to have B operand mode #{exp} but got #{act}",
                    "ITS NOT CLEAR FROM THE DOCS WHAT THIS STRING IS FOR - LET ME KNOW IF YOU SEE IT!!",
                    expected.bOperand.mode,
                    actual.bOperand.mode
                );

                this.assert(
                    actual.bOperand.address === expected.bOperand.address,
                    "expected #{this} to have B operand address #{exp} but got #{act}",
                    "ITS NOT CLEAR FROM THE DOCS WHAT THIS STRING IS FOR - LET ME KNOW IF YOU SEE IT!!",
                    expected.bOperand.address,
                    actual.bOperand.address
                );
            });
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

        (<sinon.stub>core.executeAt).callsFake((task: ITask, address: number) => {
            return coreData[address % size];
        });
        (<sinon.stub>core.readAt).callsFake((task: ITask, address: number) => {
            return coreData[address % size];
        });
        (<sinon.stub>core.getAt).callsFake((address: number) => {
            return coreData[address % size];
        });
        (<sinon.stub>core.setAt).callsFake((task: ITask, address: number, value: IInstruction) => {
            coreData[address % size] = value;
        });
    }

    function buildContext(instructionPointer: number, aPointer: number, bPointer: number): IExecutionContext {

        var warrior = DataHelper.buildWarrior(7);
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
            instruction: core.getAt(instructionPointer),
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

    it("removes the current task from the queue when the DAT instruction is executed", () => {

        const pubsub = {
            publishSync: sinon.stub()
        };

        prepareCore(5, [
            DataHelper.buildInstruction(3, OpcodeType.DAT, ModifierType.A, ModeType.Direct, 0, ModeType.Direct, 0)
        ]);

        var context = buildContext(3, 0, 0);

        var exec = new Executive();
        exec.setMessageProvider(pubsub);
        exec.initialise(options);
        exec.commandTable[OpcodeType.DAT].apply(exec, [context]);

        expect(state.warriors[0].taskIndex).to.be.equal(1);
        expect(state.warriors[0].tasks.length).to.be.equal(2);
        expect(state.warriors[0].tasks[0].instructionPointer).to.be.equal(0);
        expect(state.warriors[0].tasks[1].instructionPointer).to.be.equal(0);

        expect(pubsub.publishSync).to.be.calledWith('TASK_COUNT', {
            warriorId: 7,
            taskCount: 2
        });
    });

    // MOV

    it("MOV.A replaces the A number of the instruction pointed to by the B pointer with the A number of the \
        instruction pointed to by the A pointer", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 4));
        });

    it("MOV.B replaces the B number of the instruction pointed to by the B pointer with the B number of the \
        instruction pointed to by the A pointer", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 2));
        });

    it("MOV.AB replaces the B number of the instruction pointed to by the B pointer with the A number of the \
        instruction pointed to by the A pointer", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 1));
        });

    it("MOV.BA replaces the A number of the instruction pointed to by the B pointer with the B number of the \
        instruction pointed to by the A pointer", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 4));
        });

    it("MOV.F replaces the A and B numbers of the instruction pointed to by the B pointer with the A and B numbers of the \
        instruction pointed to by the A pointer", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2));
        });

    it("MOV.X replaces the A and B numbers of the instruction pointed to by the B pointer with the B and A numbers of the \
        instruction pointed to by the A pointer", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 1));
        });

    it("MOV.I replaces the instruction pointed to by the B pointer with the instruction pointed to by the A pointer", () => {

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

        expect(core.readAt).not.to.have.been.called;

        expect(core.readAt(null, 2)).to.be.thisInstruction(
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2));

        expect(core.readAt(null, 4)).to.be.thisInstruction(
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2));
    });

    // ADD

    it("ADD.A replaces the A number of the instruction pointed to by the B pointer with the sum of the A values pointed to \
        by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 15, ModeType.Direct, 19));

            expect(core.wrap).to.have.been.calledWith(15);
        });

    it("ADD.B replaces the B number of the instruction pointed to by the B pointer with the sum of the B values pointed to \
        by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 13, ModeType.Direct, 22));

            expect(core.wrap).to.have.been.calledWith(22);
        });

    it("ADD.AB replaces the B number of the instruction pointed to by the B pointer with the sum of the A value pointed to \
        by the A pointer and the B value pointed to by the B pointer", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 13, ModeType.Direct, 21));

            expect(core.wrap).to.have.been.calledWith(21);
        });

    it("ADD.BA replaces the A number of the instruction pointed to by the B pointer with the sum of the A value pointed to \
        by the A pointer and the B value pointed to by the B pointer", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 16, ModeType.Direct, 19));

            expect(core.wrap).to.have.been.calledWith(16);
        });

    it("ADD.F replaces the A and B numbers of the instruction pointed to by the B pointer with the sum of the A and B values \
        respectively pointed to by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 15, ModeType.Direct, 22));

            expect(core.wrap).to.have.been.calledWith(15);
            expect(core.wrap).to.have.been.calledWith(22);
        });

    it("ADD.X replaces the A and B numbers of the instruction pointed to by the B pointer with the sum of the B and A values \
        respectively pointed to by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 16, ModeType.Direct, 21));

            expect(core.wrap).to.have.been.calledWith(16);
            expect(core.wrap).to.have.been.calledWith(21);
        });

    it("ADD.I replaces the A and B numbers of the instruction pointed to by the B pointer with the sum of the A and B values \
        respectively pointed to by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 15, ModeType.Direct, 22));

            expect(core.wrap).to.have.been.calledWith(15);
            expect(core.wrap).to.have.been.calledWith(22);
        });

    // SUB

    it("SUB.A replaces the A number of the instruction pointed to by the B pointer with the difference of the A values \
        pointed to by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 19));

            expect(core.wrap).to.have.been.calledWith(11);
        });

    it("SUB.B replaces the B number of the instruction pointed to by the B pointer with the difference of the B values \
        pointed to by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 13, ModeType.Direct, 16));

            expect(core.wrap).to.have.been.calledWith(16);
        });

    it("SUB.AB replaces the B number of the instruction pointed to by the B pointer with the difference of the A value \
        pointed to by the A pointer and the B value pointed to by the B pointer", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 13, ModeType.Direct, 17));

            expect(core.wrap).to.have.been.calledWith(17);
        });

    it("SUB.BA replaces the A number of the instruction pointed to by the B pointer with the difference of the A value \
        pointed to by the A pointer and the B value pointed to by the B pointer", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 10, ModeType.Direct, 19));

            expect(core.wrap).to.have.been.calledWith(10);
        });

    it("SUB.F replaces the A and B numbers of the instruction pointed to by the B pointer with the difference of the A and \
        B values respectively pointed to by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 16));

            expect(core.wrap).to.have.been.calledWith(11);
            expect(core.wrap).to.have.been.calledWith(16);
        });

    it("SUB.X replaces the A and B numbers of the instruction pointed to by the B pointer with the difference of the B and \
        A values respectively pointed to by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 10, ModeType.Direct, 17));

            expect(core.wrap).to.have.been.calledWith(10);
            expect(core.wrap).to.have.been.calledWith(17);
        });

    it("SUB.I replaces the A and B numbers of the instruction pointed to by the B pointer with the difference of the A and \
        B values respectively pointed to by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 16));

            expect(core.wrap).to.have.been.calledWith(11);
            expect(core.wrap).to.have.been.calledWith(16);
        });

    // MUL

    it("MUL.A replaces the A number of the instruction pointed to by the B pointer with the product of the A values pointed \
        to by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 10, ModeType.Direct, 7));

            expect(core.wrap).to.have.been.calledWith(10);
        });

    it("MUL.B replaces the B number of the instruction pointed to by the B pointer with the product of the B values pointed \
        to by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 21));

            expect(core.wrap).to.have.been.calledWith(21);
        });

    it("MUL.AB replaces the B number of the instruction pointed to by the B pointer with the product of the A value pointed \
        to by the A pointer and the B value pointed to by the B pointer", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 14));

            expect(core.wrap).to.have.been.calledWith(14);
        });

    it("MUL.BA replaces the A number of the instruction pointed to by the B pointer with the product of the A value pointed \
        to by the A pointer and the B value pointed to by the B pointer", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 15, ModeType.Direct, 7));

            expect(core.wrap).to.have.been.calledWith(15);
        });

    it("MUL.F replaces the A and B numbers of the instruction pointed to by the B pointer with the product of the A and \
        B values respectively pointed to by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 10, ModeType.Direct, 21));

            expect(core.wrap).to.have.been.calledWith(10);
            expect(core.wrap).to.have.been.calledWith(21);
        });

    it("MUL.X replaces the A and B numbers of the instruction pointed to by the B pointer with the product of the B and \
        A values respectively pointed to by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 15, ModeType.Direct, 14));

            expect(core.wrap).to.have.been.calledWith(15);
            expect(core.wrap).to.have.been.calledWith(14);
        });

    it("MUL.I replaces the A and B numbers of the instruction pointed to by the B pointer with the product of the A and \
        B values respectively pointed to by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 10, ModeType.Direct, 21));

            expect(core.wrap).to.have.been.calledWith(10);
            expect(core.wrap).to.have.been.calledWith(21);
        });

    // DIV

    it("DIV.A replaces the A number of the instruction pointed to by the B pointer with the quotient of the A values \
        pointed to by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 7));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 3));
        });

    it("DIV.B replaces the B number of the instruction pointed to by the B pointer with the quotient of the B values \
        pointed to by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 5, ModeType.Immediate, 2));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 2, ModeType.Direct, 3));
        });

    it("DIV.AB replaces the B number of the instruction pointed to by the B pointer with the quotient of the A value \
        pointed to by the A pointer and the B value pointed to by the B pointer", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 5));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 3, ModeType.Direct, 5));
        });

    it("DIV.BA replaces the A number of the instruction pointed to by the B pointer with the quotient of the A value \
        pointed to by the A pointer and the B value pointed to by the B pointer", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 7, ModeType.Immediate, 4));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 2, ModeType.Direct, 2));
        });

    it("DIV.F replaces the A and B numbers of the instruction pointed to by the B pointer with the quotient of the A and \
        B values respectively pointed to by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 3));
        });

    it("DIV.X replaces the A and B numbers of the instruction pointed to by the B pointer with the quotient of the B and \
        A values respectively pointed to by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 2));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 3));
        });

    it("DIV.I replaces the A and B numbers of the instruction pointed to by the B pointer with the quotient of the A and \
        B values respectively pointed to by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 3));
        });

    it("DIV.A leaves the A number of the instruction pointed to by the B pointer unchanged if the A value pointed to by \
        the A pointer is zero when the instruction is DIV.A and removes the current task from the task list", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 3));

            expect(state.warriors[0].taskIndex).to.be.equal(1);
            expect(state.warriors[0].tasks.length).to.be.equal(2);
            expect(state.warriors[0].tasks[0].instructionPointer).to.be.equal(0);
            expect(state.warriors[0].tasks[1].instructionPointer).to.be.equal(0);
        });

    it("DIV.B leaves the B number of the instruction pointed to by the B pointer unchanged if the B value pointed to by \
        the A pointer is zero when the instruction is DIV.B and removes the current task from the task list", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 2, ModeType.Direct, 7));

            expect(state.warriors[0].taskIndex).to.be.equal(1);
            expect(state.warriors[0].tasks.length).to.be.equal(2);
            expect(state.warriors[0].tasks[0].instructionPointer).to.be.equal(0);
            expect(state.warriors[0].tasks[1].instructionPointer).to.be.equal(0);
        });

    it("DIV.AB leaves the B number of the instruction pointed to by the B pointer unchanged if the A value pointed to by \
        the A pointer is zero when the instruction is DIV.AB and removes the current task from the task list", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 3, ModeType.Direct, 16));

            expect(state.warriors[0].taskIndex).to.be.equal(1);
            expect(state.warriors[0].tasks.length).to.be.equal(2);
            expect(state.warriors[0].tasks[0].instructionPointer).to.be.equal(0);
            expect(state.warriors[0].tasks[1].instructionPointer).to.be.equal(0);
        });

    it("DIV.BA leaves the A number of the instruction pointed to by the B pointer unchanged if the A value pointed to by \
        the A pointer is zero when the instruction is DIV.BA and removes the current task from the task list", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 9, ModeType.Direct, 2));

            expect(state.warriors[0].taskIndex).to.be.equal(1);
            expect(state.warriors[0].tasks.length).to.be.equal(2);
            expect(state.warriors[0].tasks[0].instructionPointer).to.be.equal(0);
            expect(state.warriors[0].tasks[1].instructionPointer).to.be.equal(0);
        });

    it("DIV.F leaves the A number of the instruction pointed to by the A pointer unchanged if the A value pointed to by \
        the A pointer is zero when instruction is DIV.F and removes the current task from the task list", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 3));

            expect(state.warriors[0].taskIndex).to.be.equal(1);
            expect(state.warriors[0].tasks.length).to.be.equal(2);
            expect(state.warriors[0].tasks[0].instructionPointer).to.be.equal(0);
            expect(state.warriors[0].tasks[1].instructionPointer).to.be.equal(0);
        });

    it("DIV.F leaves the B number of the instruction pointed to by the B pointer unchanged if the B value pointed to by \
        the B pointer is zero when instruction is DIV.F and removes the current task from the task list", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 10));

            expect(state.warriors[0].taskIndex).to.be.equal(1);
            expect(state.warriors[0].tasks.length).to.be.equal(2);
            expect(state.warriors[0].tasks[0].instructionPointer).to.be.equal(0);
            expect(state.warriors[0].tasks[1].instructionPointer).to.be.equal(0);
        });

    it("DIV.X leaves the A number of the instruction pointed to by the A pointer unchanged if the B value pointed to by \
        the B pointer is zero when the instruction is DIV.X and removes the current task from the task list", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 3));

            expect(state.warriors[0].taskIndex).to.be.equal(1);
            expect(state.warriors[0].tasks.length).to.be.equal(2);
            expect(state.warriors[0].tasks[0].instructionPointer).to.be.equal(0);
            expect(state.warriors[0].tasks[1].instructionPointer).to.be.equal(0);
        });

    it("DIV.X leaves the B number of the instruction pointed to by the B pointer unchanged if the A value pointed to by \
        the A pointer is zero when the instruction is DIV.X and removes the current task from the task list", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 10));

            expect(state.warriors[0].taskIndex).to.be.equal(1);
            expect(state.warriors[0].tasks.length).to.be.equal(2);
            expect(state.warriors[0].tasks[0].instructionPointer).to.be.equal(0);
            expect(state.warriors[0].tasks[1].instructionPointer).to.be.equal(0);
        });

    it("DIV.I leaves the A number of the instruction pointed to by the A pointer unchanged if the A value pointed to by \
        the A pointer is zero when instruction is DIV.I and removes the current task from the task list", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 3));

            expect(state.warriors[0].taskIndex).to.be.equal(1);
            expect(state.warriors[0].tasks.length).to.be.equal(2);
            expect(state.warriors[0].tasks[0].instructionPointer).to.be.equal(0);
            expect(state.warriors[0].tasks[1].instructionPointer).to.be.equal(0);
        });

    it("DIV.I leaves the B number of the instruction pointed to by the B pointer unchanged if the B value pointed to by \
        the B pointer is zero when instruction is DIV.I and removes the current task from the task list", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 5, ModeType.Direct, 10));

            expect(state.warriors[0].taskIndex).to.be.equal(1);
            expect(state.warriors[0].tasks.length).to.be.equal(2);
            expect(state.warriors[0].tasks[0].instructionPointer).to.be.equal(0);
            expect(state.warriors[0].tasks[1].instructionPointer).to.be.equal(0);
        });

    // MOD

    it("MOD.A replaces the A number of the instruction pointed to by the B pointer with the remainder of the A values \
        pointed to by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 7));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 1, ModeType.Direct, 3));
        });

    it("MOD.B replaces the B number of the instruction pointed to by the B pointer with the remainder of the B values \
        pointed to by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 5, ModeType.Immediate, 2));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 2, ModeType.Direct, 1));
        });

    it("MOD.AB replaces the B number of the instruction pointed to by the B pointer with the remainder of the A value \
        pointed to by the A pointer and the B value pointed to by the B pointer", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 5));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 3, ModeType.Direct, 1));
        });

    it("MOD.BA replaces the A number of the instruction pointed to by the B pointer with the remainder of the A value \
        pointed to by the A pointer and the B value pointed to by the B pointer", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 7, ModeType.Immediate, 4));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 1, ModeType.Direct, 2));
        });

    it("MOD.F replaces the A and B numbers of the instruction pointed to by the B pointer with the remainder of the A and \
        B values respectively pointed to by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 1, ModeType.Direct, 2));
        });

    it("MOD.X replaces the A and B numbers of the instruction pointed to by the B pointer with the remainder of the B and \
        A values respectively pointed to by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 3, ModeType.Immediate, 2));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 1, ModeType.Direct, 2));
        });

    it("MOD.I replaces the A and B numbers of the instruction pointed to by the B pointer with the remainder of the A and \
        B values respectively pointed to by the A and B pointers", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 2)).to.be.thisInstruction(
                DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 3));

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 1, ModeType.Direct, 2));
        });

    it("MOD.A leaves the A number of the instruction pointed to by the B pointer unchanged if the A value pointed to by the \
        A pointer is zero and removes the current task from the task list", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 3));

            expect(state.warriors[0].taskIndex).to.be.equal(1);
            expect(state.warriors[0].tasks.length).to.be.equal(2);
            expect(state.warriors[0].tasks[0].instructionPointer).to.be.equal(0);
            expect(state.warriors[0].tasks[1].instructionPointer).to.be.equal(0);
        });

    it("MOD.B leaves the B number of the instruction pointed to by the B pointer unchanged if the B value pointed to by the \
        A pointer is zero and removes the current task from the task list", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 2, ModeType.Direct, 7));

            expect(state.warriors[0].taskIndex).to.be.equal(1);
            expect(state.warriors[0].tasks.length).to.be.equal(2);
            expect(state.warriors[0].tasks[0].instructionPointer).to.be.equal(0);
            expect(state.warriors[0].tasks[1].instructionPointer).to.be.equal(0);
        });

    it("MOD.AB leaves the B number of the instruction pointed to by the B pointer unchanged if the A value pointed to by the \
        A pointer is zero and removes the current task from the task list", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 3, ModeType.Direct, 16));

            expect(state.warriors[0].taskIndex).to.be.equal(1);
            expect(state.warriors[0].tasks.length).to.be.equal(2);
            expect(state.warriors[0].tasks[0].instructionPointer).to.be.equal(0);
            expect(state.warriors[0].tasks[1].instructionPointer).to.be.equal(0);
        });

    it("MOD.BA leaves the A number of the instruction pointed to by the B pointer unchanged if the A value pointed to by the \
        A pointer is zero and removes the current task from the task list", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 9, ModeType.Direct, 2));

            expect(state.warriors[0].taskIndex).to.be.equal(1);
            expect(state.warriors[0].tasks.length).to.be.equal(2);
            expect(state.warriors[0].tasks[0].instructionPointer).to.be.equal(0);
            expect(state.warriors[0].tasks[1].instructionPointer).to.be.equal(0);
        });

    it("MOD.F leaves the A number of the instruction pointed to by the A pointer unchanged if the A value pointed to by the \
        A pointer is zero and removes the current task from the task list", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 1));

            expect(state.warriors[0].taskIndex).to.be.equal(1);
            expect(state.warriors[0].tasks.length).to.be.equal(2);
            expect(state.warriors[0].tasks[0].instructionPointer).to.be.equal(0);
            expect(state.warriors[0].tasks[1].instructionPointer).to.be.equal(0);
        });

    it("MOD.F leaves the B number of the instruction pointed to by the B pointer unchanged if the B value pointed to by the \
        B pointer is zero and removes the current task from the task list", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 1, ModeType.Direct, 10));

            expect(state.warriors[0].taskIndex).to.be.equal(1);
            expect(state.warriors[0].tasks.length).to.be.equal(2);
            expect(state.warriors[0].tasks[0].instructionPointer).to.be.equal(0);
            expect(state.warriors[0].tasks[1].instructionPointer).to.be.equal(0);
        });

    it("MOD.X leaves the A number of the instruction pointed to by the A pointer unchanged if the B value pointed to by the \
        B pointer is zero and removes the current task from the task list", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 1));

            expect(state.warriors[0].taskIndex).to.be.equal(1);
            expect(state.warriors[0].tasks.length).to.be.equal(2);
            expect(state.warriors[0].tasks[0].instructionPointer).to.be.equal(0);
            expect(state.warriors[0].tasks[1].instructionPointer).to.be.equal(0);
        });

    it("MOD.X leaves the B number of the instruction pointed to by the B pointer unchanged if the A value pointed to by the \
        A pointer is zero and removes the current task from the task list", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 1, ModeType.Direct, 10));

            expect(state.warriors[0].taskIndex).to.be.equal(1);
            expect(state.warriors[0].tasks.length).to.be.equal(2);
            expect(state.warriors[0].tasks[0].instructionPointer).to.be.equal(0);
            expect(state.warriors[0].tasks[1].instructionPointer).to.be.equal(0);
        });

    it("MOD.I leaves the A number of the instruction pointed to by the A pointer unchanged if the A value pointed to by the \
        A pointer is zero and removes the current task from the task list", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 11, ModeType.Direct, 1));

            expect(state.warriors[0].taskIndex).to.be.equal(1);
            expect(state.warriors[0].tasks.length).to.be.equal(2);
            expect(state.warriors[0].tasks[0].instructionPointer).to.be.equal(0);
            expect(state.warriors[0].tasks[1].instructionPointer).to.be.equal(0);
        });

    it("MOD.I leaves the B number of the instruction pointed to by the B pointer unchanged if the B value pointed to by the \
        B pointer is zero and removes the current task from the task list", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(core.readAt(null, 4)).to.be.thisInstruction(
                DataHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.X, ModeType.Direct, 1, ModeType.Direct, 10));

            expect(state.warriors[0].taskIndex).to.be.equal(1);
            expect(state.warriors[0].tasks.length).to.be.equal(2);
            expect(state.warriors[0].tasks[0].instructionPointer).to.be.equal(0);
            expect(state.warriors[0].tasks[1].instructionPointer).to.be.equal(0);
        });

    // JMP

    it("JMP sets the current task's instruction pointer to the A pointer", () => {

        prepareCore(5, [
            DataHelper.buildInstruction(1, OpcodeType.JMP, ModifierType.A, ModeType.Direct, 3, ModeType.Direct, 0)
        ]);

        var context = buildContext(1, 4, 0);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMP, ModifierType.A)].apply(exec, [context]);

        expect(core.readAt).not.to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(4);
        expect(context.core.wrap).to.have.been.calledWith(4);
    });

    // JMZ

    it("JMZ.A sets the current task's instruction pointer to the A pointer if the A value pointed to by the B pointer if zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.A)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(2);
        expect(context.core.wrap).to.have.been.calledWith(2);
    });

    it("JMZ.A does not alter the current task's instruction pointer if the A value pointed to by the B pointer if not zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.A)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("JMZ.BA sets the current task's instruction pointer to the A pointer if the A value pointed to by the B pointer if zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.BA)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(2);
        expect(context.core.wrap).to.have.been.calledWith(2);
    });

    it("JMZ.BA does not alter the current task's instruction pointer if the A value pointed to by the B pointer if not zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.BA)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("JMZ.B sets the current task's instruction pointer to the A pointer if the B value pointed to by the B pointer if zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.B)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(2);
        expect(context.core.wrap).to.have.been.calledWith(2);
    });

    it("JMZ.B does not alter the current task's instruction pointer if the B value pointed to by the B pointer if not zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.B)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("JMZ.AB sets the current task's instruction pointer to the A pointer if the B value pointed to by the B pointer if zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.AB)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(2);
        expect(context.core.wrap).to.have.been.calledWith(2);
    });

    it("JMZ.AB does not alter the current task's instruction pointer if the B value pointed to by the B pointer if not zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.AB)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("JMZ.F sets the current task's instruction pointer to the A pointer if the A and B values pointed to by the B \
        pointer are zero", () => {

            var instructions = [
                DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
            ];

            prepareCore(5, instructions);
            var context = buildContext(3, 2, 4);

            var exec = new Executive();
            exec.initialise(options);
            exec.commandTable[decode(OpcodeType.JMZ, ModifierType.F)].apply(exec, [context]);

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(2);
            expect(context.core.wrap).to.have.been.calledWith(2);
        });

    it("JMZ.F does not alter the current task's instruction pointer if the A value pointed to by the B pointer if not zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.F)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("JMZ.F does not alter the current task's instruction pointer if the B value pointed to by the B pointer if not zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.F)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("JMZ.X sets the current task's instruction pointer to the A pointer if the A and B values pointed to by the B \
        pointer are zero", () => {

            var instructions = [
                DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
            ];

            prepareCore(5, instructions);
            var context = buildContext(3, 2, 4);

            var exec = new Executive();
            exec.initialise(options);
            exec.commandTable[decode(OpcodeType.JMZ, ModifierType.X)].apply(exec, [context]);

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(2);
            expect(context.core.wrap).to.have.been.calledWith(2);
        });

    it("JMZ.X does not alter the current task's instruction pointer if the A value pointed to by the B pointer if not zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.X)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("JMZ.X does not alter the current task's instruction pointer if the B value pointed to by the B pointer if not zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.X)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("JMZ.I sets the current task's instruction pointer to the A pointer if the A and B values pointed to by the B \
        pointer are zero", () => {

            var instructions = [
                DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
            ];

            prepareCore(5, instructions);
            var context = buildContext(3, 2, 4);

            var exec = new Executive();
            exec.initialise(options);
            exec.commandTable[decode(OpcodeType.JMZ, ModifierType.I)].apply(exec, [context]);

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(2);
            expect(context.core.wrap).to.have.been.calledWith(2);
        });

    it("JMZ.I does not alter the current task's instruction pointer if the A value pointed to by the B pointer if not zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.I)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("JMZ.I does not alter the current task's instruction pointer if the B value pointed to by the B pointer if not zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMZ, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMZ, ModifierType.I)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    // JMN

    it("JMN.A sets the current task's instruction pointer to the A pointer if the A value pointed to by the B pointer if not zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.A)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(2);
        expect(context.core.wrap).to.have.been.calledWith(2);
    });

    it("JMN.A does not alter the current task's instruction pointer if the A value pointed to by the B pointer if zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.A)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("JMN.BA sets the current task's instruction pointer to the A pointer if the A value pointed to by the B pointer if not zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.BA)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(2);
        expect(context.core.wrap).to.have.been.calledWith(2);
    });

    it("JMN.BA does not alter the current task's instruction pointer if the A value pointed to by the B pointer if zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.BA)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("JMN.B sets the current task's instruction pointer to the A pointer if the B value pointed to by the B pointer if not zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.B)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(2);
        expect(context.core.wrap).to.have.been.calledWith(2);
    });

    it("JMN.B does not alter the current task's instruction pointer if the B value pointed to by the B pointer if zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.B)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("JMN.AB sets the current task's instruction pointer to the A pointer if the B value pointed to by the B pointer if not zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.AB)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(2);
        expect(context.core.wrap).to.have.been.calledWith(2);
    });

    it("JMN.AB does not alter the current task's instruction pointer if the B value pointed to by the B pointer if zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.AB)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("JMN.F does not alter the current task's instruction pointer if both the A & B values pointed to by the B pointer are zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.F)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("JMN.F sets the current task's instruction pointer to the A pointer if the A value pointed to by the B pointer is not zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.F)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(2);
        expect(context.core.wrap).to.have.been.calledWith(2);
    });

    it("JMN.F sets the current task's instruction pointer to the A pointer if the B value pointed to by the B pointer is not zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.F)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(2);
        expect(context.core.wrap).to.have.been.calledWith(2);
    });

    it("JMN.X does not alter the current task's instruction pointer if both the A & B values pointed to by the B pointer are zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.X)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("JMN.X sets the current task's instruction pointer to the A pointer if the A value pointed to by the B pointer is not zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.X)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(2);
        expect(context.core.wrap).to.have.been.calledWith(2);
    });

    it("JMN.X sets the current task's instruction pointer to the A pointer if the B value pointed to by the B pointer is not zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.X)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(2);
        expect(context.core.wrap).to.have.been.calledWith(2);
    });

    it("JMN.I does not alter the current task's instruction pointer if both the A & B values pointed to by the B pointer are zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.I)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("JMN.I sets the current task's instruction pointer to the A pointer if the A value pointed to by the B pointer is not zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.I)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(2);
        expect(context.core.wrap).to.have.been.calledWith(2);
    });

    it("JMN.I sets the current task's instruction pointer to the A pointer if the B value pointed to by the B pointer is not zero", () => {

        var instructions = [
            DataHelper.buildInstruction(3, OpcodeType.JMN, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 1),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.JMN, ModifierType.I)].apply(exec, [context]);

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(2);
        expect(context.core.wrap).to.have.been.calledWith(2);
    });

    // DJN

    it("DJN.A decrements the A value pointed to by the B pointer then sets the current task's instruction pointer to the A \
        pointer if the A value pointed to by the B pointer if not zero", () => {

            var instructions = [
                DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
            ];

            prepareCore(5, instructions);
            var context = buildContext(3, 2, 4);

            var exec = new Executive();
            exec.initialise(options);
            exec.commandTable[decode(OpcodeType.DJN, ModifierType.A)].apply(exec, [context]);

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(2);
            expect(context.core.wrap).to.have.been.calledWith(2);
            expect(context.core.wrap).to.have.been.calledWith(1);
        });

    it("DJN.A decrements the A value pointed to by the B pointer then does not alter the current task's instruction pointer \
        if the A value pointed to by the B pointer if zero", () => {

            var instructions = [
                DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
            ];

            prepareCore(5, instructions);
            var context = buildContext(3, 2, 4);

            var exec = new Executive();
            exec.initialise(options);
            exec.commandTable[decode(OpcodeType.DJN, ModifierType.A)].apply(exec, [context]);

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).to.have.been.calledWith(0);
        });

    it("DJN.BA decrements the A value pointed to by the B pointer then sets the current task's instruction pointer to the A \
        pointer if the A value pointed to by the B pointer if not zero", () => {

            var instructions = [
                DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
            ];

            prepareCore(5, instructions);
            var context = buildContext(3, 2, 4);

            var exec = new Executive();
            exec.initialise(options);
            exec.commandTable[decode(OpcodeType.DJN, ModifierType.BA)].apply(exec, [context]);

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(2);
            expect(context.core.wrap).to.have.been.calledWith(2);
            expect(context.core.wrap).to.have.been.calledWith(1);
        });

    it("DJN.BA decrements the A value pointed to by the B pointer then does not alter the current task's instruction pointer \
        if the A value pointed to by the B pointer if zero", () => {

            var instructions = [
                DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.BA, ModeType.Direct, -1, ModeType.Direct, 1),
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
            ];

            prepareCore(5, instructions);
            var context = buildContext(3, 2, 4);

            var exec = new Executive();
            exec.initialise(options);
            exec.commandTable[decode(OpcodeType.DJN, ModifierType.BA)].apply(exec, [context]);

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).to.have.been.calledWith(0);
        });

    it("DJN.B decrements the B value pointed to by the B pointer then sets the current task's instruction pointer to the A \
        pointer if the B value pointed to by the B pointer if not zero", () => {

            var instructions = [
                DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 2),
            ];

            prepareCore(5, instructions);
            var context = buildContext(3, 2, 4);

            var exec = new Executive();
            exec.initialise(options);
            exec.commandTable[decode(OpcodeType.DJN, ModifierType.B)].apply(exec, [context]);

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(2);
            expect(context.core.wrap).to.have.been.calledWith(2);
            expect(context.core.wrap).to.have.been.calledWith(1);
        });

    it("DJN.B decrements the B value pointed to by the B pointer then does not alter the current task's instruction pointer \
        if the B value pointed to by the B pointer if zero", () => {

            var instructions = [
                DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.A, ModeType.Direct, -1, ModeType.Direct, 1),
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
            ];

            prepareCore(5, instructions);
            var context = buildContext(3, 2, 4);

            var exec = new Executive();
            exec.initialise(options);
            exec.commandTable[decode(OpcodeType.DJN, ModifierType.B)].apply(exec, [context]);

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).to.have.been.calledWith(0);
        });

    it("DJN.AB decrements the B value pointed to by the B pointer then sets the current task's instruction pointer to the A \
        pointer if the B value pointed to by the B pointer if not zero", () => {

            var instructions = [
                DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 0, ModeType.Immediate, 2),
            ];

            prepareCore(5, instructions);
            var context = buildContext(3, 2, 4);

            var exec = new Executive();
            exec.initialise(options);
            exec.commandTable[decode(OpcodeType.DJN, ModifierType.AB)].apply(exec, [context]);

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(2);
            expect(context.core.wrap).to.have.been.calledWith(2);
            expect(context.core.wrap).to.have.been.calledWith(1);
        });

    it("DJN.AB decrements the B value pointed to by the B pointer then does not alter the current task's instruction pointer \
        if the B value pointed to by the B pointer if zero", () => {

            var instructions = [
                DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.AB, ModeType.Direct, -1, ModeType.Direct, 1),
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
            ];

            prepareCore(5, instructions);
            var context = buildContext(3, 2, 4);

            var exec = new Executive();
            exec.initialise(options);
            exec.commandTable[decode(OpcodeType.DJN, ModifierType.AB)].apply(exec, [context]);

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).to.have.been.calledWith(0);
        });

    it("DJN.F decrements the A & B values pointed to by the B pointer then does not alter the current task's instruction \
        pointer if both the A & B values pointed to by the B pointer are zero", () => {

            var instructions = [
                DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
            ];

            prepareCore(5, instructions);
            var context = buildContext(3, 2, 4);

            var exec = new Executive();
            exec.initialise(options);
            exec.commandTable[decode(OpcodeType.DJN, ModifierType.F)].apply(exec, [context]);

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).to.have.been.calledWith(0);
        });

    it("DJN.F decrements the A & B values pointed to by the B pointer then sets the current task's instruction pointer to \
        the A pointer if the A value pointed to by the B pointer is not zero", () => {

            var instructions = [
                DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 1),
            ];

            prepareCore(5, instructions);
            var context = buildContext(3, 2, 4);

            var exec = new Executive();
            exec.initialise(options);
            exec.commandTable[decode(OpcodeType.DJN, ModifierType.F)].apply(exec, [context]);

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(2);
            expect(context.core.wrap).to.have.been.calledWith(2);
            expect(context.core.wrap).to.have.been.calledWith(1);
            expect(context.core.wrap).to.have.been.calledWith(0);
        });

    it("DJN.F decrements the A & B values pointed to by the B pointer then sets the current task's instruction pointer to \
        the A pointer if the B value pointed to by the B pointer is not zero", () => {

            var instructions = [
                DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
            ];

            prepareCore(5, instructions);
            var context = buildContext(3, 2, 4);

            var exec = new Executive();
            exec.initialise(options);
            exec.commandTable[decode(OpcodeType.DJN, ModifierType.F)].apply(exec, [context]);

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(2);
            expect(context.core.wrap).to.have.been.calledWith(2);
            expect(context.core.wrap).to.have.been.calledWith(1);
            expect(context.core.wrap).to.have.been.calledWith(0);
        });

    it("DJN.X decrements the A & B values pointed to by the B pointer then does not alter the current task's instruction \
        pointer if both the A & B values pointed to by the B pointer are zero", () => {

            var instructions = [
                DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
            ];

            prepareCore(5, instructions);
            var context = buildContext(3, 2, 4);

            var exec = new Executive();
            exec.initialise(options);
            exec.commandTable[decode(OpcodeType.DJN, ModifierType.X)].apply(exec, [context]);

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).to.have.been.calledWith(0);
        });

    it("DJN.X decrements the A & B values pointed to by the B pointer then sets the current task's instruction pointer to \
        the A pointer if the A value pointed to by the B pointer is not zero", () => {

            var instructions = [
                DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 1),
            ];

            prepareCore(5, instructions);
            var context = buildContext(3, 2, 4);

            var exec = new Executive();
            exec.initialise(options);
            exec.commandTable[decode(OpcodeType.DJN, ModifierType.X)].apply(exec, [context]);

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(2);
            expect(context.core.wrap).to.have.been.calledWith(2);
            expect(context.core.wrap).to.have.been.calledWith(1);
            expect(context.core.wrap).to.have.been.calledWith(0);
        });

    it("DJN.X decrements the A & B values pointed to by the B pointer then sets the current task's instruction pointer to \
        the A pointer if the B value pointed to by the B pointer is not zero", () => {

            var instructions = [
                DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.X, ModeType.Direct, -1, ModeType.Direct, 1),
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
            ];

            prepareCore(5, instructions);
            var context = buildContext(3, 2, 4);

            var exec = new Executive();
            exec.initialise(options);
            exec.commandTable[decode(OpcodeType.DJN, ModifierType.X)].apply(exec, [context]);

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(2);
            expect(context.core.wrap).to.have.been.calledWith(2);
            expect(context.core.wrap).to.have.been.calledWith(1);
            expect(context.core.wrap).to.have.been.calledWith(0);
        });

    it("DJN.I decrements the A & B values pointed to by the B pointer then does not alter the current task's instruction \
        pointer if both the A & B values pointed to by the B pointer are zero", () => {

            var instructions = [
                DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 1),
            ];

            prepareCore(5, instructions);
            var context = buildContext(3, 2, 4);

            var exec = new Executive();
            exec.initialise(options);
            exec.commandTable[decode(OpcodeType.DJN, ModifierType.I)].apply(exec, [context]);

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).to.have.been.calledWith(0);
        });

    it("DJN.I decrements the A & B values pointed to by the B pointer then sets the current task's instruction pointer to \
        the A pointer if the A value pointed to by the B pointer is not zero", () => {

            var instructions = [
                DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 1),
            ];

            prepareCore(5, instructions);
            var context = buildContext(3, 2, 4);

            var exec = new Executive();
            exec.initialise(options);
            exec.commandTable[decode(OpcodeType.DJN, ModifierType.I)].apply(exec, [context]);

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(2);
            expect(context.core.wrap).to.have.been.calledWith(2);
            expect(context.core.wrap).to.have.been.calledWith(1);
            expect(context.core.wrap).to.have.been.calledWith(0);
        });

    it("DJN.I decrements the A & B values pointed to by the B pointer then sets the current task's instruction pointer to \
        the A pointer if the B value pointed to by the B pointer is not zero", () => {

            var instructions = [
                DataHelper.buildInstruction(3, OpcodeType.DJN, ModifierType.I, ModeType.Direct, -1, ModeType.Direct, 1),
                DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
            ];

            prepareCore(5, instructions);
            var context = buildContext(3, 2, 4);

            var exec = new Executive();
            exec.initialise(options);
            exec.commandTable[decode(OpcodeType.DJN, ModifierType.I)].apply(exec, [context]);

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(2);
            expect(context.core.wrap).to.have.been.calledWith(2);
            expect(context.core.wrap).to.have.been.calledWith(1);
            expect(context.core.wrap).to.have.been.calledWith(0);
        });

    // CMP

    it("CMP.A does not modify the instruction pointer if the A values pointed to by the A and B pointers are not equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("CMP.A adds one to the instruction pointer if the A values pointed to by the A and B pointers are equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(4);
        expect(context.core.wrap).to.have.been.calledWith(4);
    });

    it("CMP.B does not modify the instruction pointer if the B values pointed to by the A and B pointers are not equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("CMP.B adds one to the instruction pointer if the B values pointed to by the A and B pointers are equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(4);
        expect(context.core.wrap).to.have.been.calledWith(4);
    });

    it("CMP.AB does not modify the instruction pointer if the A & B values pointed to by the A & B pointers respectively \
        are not equal", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).not.to.have.been.called;
        });

    it("CMP.AB adds one to the instruction pointer if the A & B values pointed to by the A & B pointers respectively are equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(4);
        expect(context.core.wrap).to.have.been.calledWith(4);
    });

    it("CMP.BA does not modify the instruction pointer if the A & B values pointed to by the A & B pointers respectively \
        are not equal", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).not.to.have.been.called;
        });

    it("CMP.BA adds one to the instruction pointer if the A & B values pointed to by the A & B pointers respectively are equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(4);
        expect(context.core.wrap).to.have.been.calledWith(4);
    });

    it("CMP.F does not modify the instruction pointer if the A values pointed to by the A & B pointers are not equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("CMP.F does not modify the instruction pointer if the B values pointed to by the A & B pointers are not equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("CMP.F adds one to the instruction pointer if both the A values pointed to by the A and B pointers and the B \
        values pointed to by the A & B pointers are equal", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(4);
            expect(context.core.wrap).to.have.been.calledWith(4);
        });

    it("CMP.X does not modify the instruction pointer if the A value pointed to by the B pointer and the B value pointed \
        to by the A pointer are not equal", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).not.to.have.been.called;
        });

    it("CMP.X does not modify the instruction pointer if the B value pointed to by the A pointer and the A value pointed \
        to by the B pointer are not equal", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).not.to.have.been.called;
        });

    it("CMP.X adds one to the instruction pointer if both the B value pointed to by the A pointer and the A value pointed \
        to by the B pointer are equal and vice versa", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(4);
            expect(context.core.wrap).to.have.been.calledWith(4);
        });

    it("CMP.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by opcode", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("CMP.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by modifier", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("CMP.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by A mode", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("CMP.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by A address", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("CMP.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by B mode", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("CMP.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by B address", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("CMP.I adds one to the instruction pointer if both the B value pointed to by the A pointer and the A value pointed \
        to by the B pointer are equal and vice versa", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(4);
            expect(context.core.wrap).to.have.been.calledWith(4);
        });

    // SEQ

    it("SEQ.A does not modify the instruction pointer if the A values pointed to by the A and B pointers are not equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("SEQ.A adds one to the instruction pointer if the A values pointed to by the A and B pointers are equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(4);
        expect(context.core.wrap).to.have.been.calledWith(4);
    });

    it("SEQ.B does not modify the instruction pointer if the B values pointed to by the A and B pointers are not equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("SEQ.B adds one to the instruction pointer if the B values pointed to by the A and B pointers are equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(4);
        expect(context.core.wrap).to.have.been.calledWith(4);
    });

    it("SEQ.AB does not modify the instruction pointer if the A & B values pointed to by the A & B pointers respectively \
        are not equal", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).not.to.have.been.called;
        });

    it("SEQ.AB adds one to the instruction pointer if the A & B values pointed to by the A & B pointers respectively are equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(4);
        expect(context.core.wrap).to.have.been.calledWith(4);
    });

    it("SEQ.BA does not modify the instruction pointer if the A & B values pointed to by the A & B pointers respectively \
        are not equal", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).not.to.have.been.called;
        });

    it("SEQ.BA adds one to the instruction pointer if the A & B values pointed to by the A & B pointers respectively are equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(4);
        expect(context.core.wrap).to.have.been.calledWith(4);
    });

    it("SEQ.F does not modify the instruction pointer if the A values pointed to by the A & B pointers are not equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("SEQ.F does not modify the instruction pointer if the B values pointed to by the A & B pointers are not equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("SEQ.F adds one to the instruction pointer if both the A values pointed to by the A and B pointers and the B values \
        pointed to by the A & B pointers are equal", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(4);
            expect(context.core.wrap).to.have.been.calledWith(4);
        });

    it("SEQ.X does not modify the instruction pointer if the A value pointed to by the B pointer and the B value pointed \
        to by the A pointer are not equal", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).not.to.have.been.called;
        });

    it("SEQ.X does not modify the instruction pointer if the B value pointed to by the A pointer and the A value pointed \
        to by the B pointer are not equal", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).not.to.have.been.called;
        });

    it("SEQ.X adds one to the instruction pointer if both the B value pointed to by the A pointer and the A value pointed \
        to by the B pointer are equal and vice versa", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(4);
            expect(context.core.wrap).to.have.been.calledWith(4);
        });

    it("SEQ.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by opcode", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("SEQ.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by modifier", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("SEQ.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by A mode", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("SEQ.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by A address", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("SEQ.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by B mode", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("SEQ.I does not modify the instruction pointer if the instructions pointed to by the A & B pointers differ by B address", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("SEQ.I adds one to the instruction pointer if both the B value pointed to by the A pointer and the A value pointed \
        to by the B pointer are equal and vice versa", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(4);
            expect(context.core.wrap).to.have.been.calledWith(4);
        });

    // SNE

    it("SNE.A does not modify the instruction pointer if the A values pointed to by the A and B pointers are equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("SNE.A adds one to the instruction pointer if the A values pointed to by the A and B pointers are not equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(4);
        expect(context.core.wrap).to.have.been.calledWith(4);
    });

    it("SNE.B does not modify the instruction pointer if the B values pointed to by the A and B pointers are equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("SNE.B adds one to the instruction pointer if the B values pointed to by the A and B pointers are not equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(4);
        expect(context.core.wrap).to.have.been.calledWith(4);
    });

    it("SNE.AB does not modify the instruction pointer if the A & B values pointed to by the A & B pointers respectively are equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("SNE.AB adds one to the instruction pointer if the A & B values pointed to by the A & B pointers respectively are not equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(4);
        expect(context.core.wrap).to.have.been.calledWith(4);
    });

    it("SNE.BA does not modify the instruction pointer if the A & B values pointed to by the A & B pointers respectively are equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(3);
        expect(context.core.wrap).not.to.have.been.called;
    });

    it("SNE.BA adds one to the instruction pointer if the A & B values pointed to by the A & B pointers respectively are not equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(4);
        expect(context.core.wrap).to.have.been.calledWith(4);
    });

    it("SNE.F adds one to the instruction pointer if the A values pointed to by the A & B pointers are not equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(4);
        expect(context.core.wrap).to.have.been.calledWith(4);

    });

    it("SNE.F adds one to the instruction pointer if the B values pointed to by the A & B pointers are not equal", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(4);
        expect(context.core.wrap).to.have.been.calledWith(4);
    });

    it("SNE.F does not modify the instruction pointer if both the A values pointed to by the A and B pointers and the \
        B values pointed to by the A & B pointers are equal", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).not.to.have.been.called;
        });

    it("SNE.X adds one to the instruction pointer if the A value pointed to by the B pointer and the B value pointed \
        to by the A pointer are not equal", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(4);
            expect(context.core.wrap).to.have.been.calledWith(4);
        });

    it("SNE.X adds one to the instruction pointer if the B value pointed to by the A pointer and the A value pointed \
        to by the B pointer are not equal", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(4);
            expect(context.core.wrap).to.have.been.calledWith(4);
        });

    it("SNE.X does not modify the instruction pointer if both the B value pointed to by the A pointer and the A value \
        pointed to by the B pointer are equal and vice versa", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).not.to.have.been.called;
        });

    it("SNE.I adds one to the instruction pointer if the instructions pointed to by the A & B pointers differ by opcode", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(4);
        expect(context.core.wrap).to.have.been.calledWith(4);
    });

    it("SNE.I adds one to the instruction pointer if the instructions pointed to by the A & B pointers differ by modifier", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(4);
        expect(context.core.wrap).to.have.been.calledWith(4);
    });

    it("SNE.I adds one to the instruction pointer if the instructions pointed to by the A & B pointers differ by A mode", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(4);
        expect(context.core.wrap).to.have.been.calledWith(4);
    });

    it("SNE.I adds one to the instruction pointer if the instructions pointed to by the A & B pointers differ by A address", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(4);
        expect(context.core.wrap).to.have.been.calledWith(4);
    });

    it("SNE.I adds one to the instruction pointer if the instructions pointed to by the A & B pointers differ by B mode", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(4);
        expect(context.core.wrap).to.have.been.calledWith(4);
    });

    it("SNE.I adds one to the instruction pointer if the instructions pointed to by the A & B pointers differ by B address", () => {

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

        expect(core.readAt).to.have.been.called;

        expect(context.task.instructionPointer).to.be.equal(4);
        expect(context.core.wrap).to.have.been.calledWith(4);
    });

    it("SNE.I does not modify the instruction pointer if both the B value pointed to by the A pointer and the A value \
        pointed to by the B pointer are equal and vice versa", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).not.to.have.been.called;
        });

    // SLT

    it("SLT.A does not modify the instruction pointer if the A value pointed to by the A pointer is greater than the A \
        value pointed to by the B pointer", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).not.to.have.been.called;
        });

    it("SLT.A adds one to the instruction pointer if the A value pointed to by the A pointer is less than the A value \
        pointed to by the B pointer", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(4);
            expect(context.core.wrap).to.have.been.calledWith(4);
        });

    it("SLT.B does not modify the instruction pointer if the B value pointed to by the A pointer is greater than the B \
        value pointed to by the B pointer", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).not.to.have.been.called;
        });

    it("SLT.B adds one to the instruction pointer if the B value pointed to by the A pointer is less than the B value \
        pointed to by the B pointer", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(4);
            expect(context.core.wrap).to.have.been.calledWith(4);
        });

    it("SLT.AB does not modify the instruction pointer if the A value pointed to by the A pointer is greater than the \
        B value pointed to by the B pointer", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).not.to.have.been.called;
        });

    it("SLT.AB adds one to the instruction pointer if the A value pointed to by the A pointer is less than the B value \
        pointed to by the B pointer", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(4);
            expect(context.core.wrap).to.have.been.calledWith(4);
        });

    it("SLT.BA does not modify the instruction pointer if the B value pointed to by the A pointer is greater than the A \
        value pointed to by the B pointer", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).not.to.have.been.called;
        });

    it("SLT.BA adds one to the instruction pointer if the B value pointed to by the A pointer is less than the A value \
        pointed to by the B pointer", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(4);
            expect(context.core.wrap).to.have.been.calledWith(4);
        });

    it("SLT.F adds one to the instruction pointer if the A & B values pointed to by the A pointer are less than the A & B \
        values pointed to by the B pointer", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(4);
            expect(context.core.wrap).to.have.been.calledWith(4);

        });

    it("SLT.F does not modify the instruction pointer if the A value pointed to by the A pointer is greater than the A \
        value pointed to by the B pointer", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).not.to.have.been.called;
        });

    it("SLT.F does not modify the instruction pointer if the B value pointed to by the A pointer is greater than the B \
        value pointed to by the B pointer", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).not.to.have.been.called;
        });

    it("SLT.X adds one to the instruction pointer if the A & B values pointed to by the A pointer are less than the B & A \
        values pointed to by the B pointer", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(4);
            expect(context.core.wrap).to.have.been.calledWith(4);

        });

    it("SLT.X does not modify the instruction pointer if the B value pointed to by the A pointer is greater than the A \
        value pointed to by the B pointer", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).not.to.have.been.called;
        });

    it("SLT.X does not modify the instruction pointer if the A value pointed to by the A pointer is greater than the B \
        value pointed to by the B pointer", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).not.to.have.been.called;
        });

    it("SLT.I adds one to the instruction pointer if the A & B values pointed to by the A pointer are less than the A & B \
        values pointed to by the B pointer", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(4);
            expect(context.core.wrap).to.have.been.calledWith(4);

        });

    it("SLT.I does not modify the instruction pointer if the A value pointed to by the A pointer is greater than the A \
        value pointed to by the B pointer", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).not.to.have.been.called;
        });

    it("SLT.I does not modify the instruction pointer if the B value pointed to by the A pointer is greater than the B \
        value pointed to by the B pointer", () => {

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

            expect(core.readAt).to.have.been.called;

            expect(context.task.instructionPointer).to.be.equal(3);
            expect(context.core.wrap).not.to.have.been.called;
        });

    // SPL

    it("SPL inserts an additional task to the current warrior's task list, directly after the current task", () => {

        const pubsub = {
            publishSync: sinon.stub()
        };

        var instructions = [
            DataHelper.buildInstruction(2, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 1, ModeType.Immediate, 2),
            DataHelper.buildInstruction(3, OpcodeType.SPL, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1),
            DataHelper.buildInstruction(4, OpcodeType.DAT, ModifierType.F, ModeType.Immediate, 2, ModeType.Immediate, 0),
        ];

        prepareCore(5, instructions);
        var context = buildContext(3, 2, 4);

        var exec = new Executive();
        exec.setMessageProvider(pubsub);
        exec.initialise(options);
        exec.commandTable[decode(OpcodeType.SPL, ModifierType.F)].apply(exec, [context]);

        expect(core.readAt).not.to.have.been.called;

        expect(context.warrior.tasks.length).to.be.equal(4);

        expect(pubsub.publishSync).to.be.calledWith('TASK_COUNT', {
            warriorId: 7,
            taskCount: 4
        });
    });

    it("SPL sets the newly created task's instruction pointer to the A pointer", () => {

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

        expect(core.readAt).not.to.have.been.called;

        expect(context.warrior.tasks[2].instructionPointer).to.be.equal(2);
        expect(context.core.wrap).to.have.been.calledWith(2);
    });

    it("SPL increments the current warrior's task index", () => {

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

        expect(core.readAt).not.to.have.been.called;

        expect(context.warrior.taskIndex).to.be.equal(3);
    });

    it("SPL wraps the task index to zero if it exceeds the number of tasks in the queue", () => {

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

        expect(core.readAt).not.to.have.been.called;

        expect(context.warrior.taskIndex).to.be.equal(0);
    });

    it("SPL does not create a new task if this will breach the maximum number of tasks for the current warrior", () => {

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

        expect(core.readAt).not.to.have.been.called;

        expect(context.warrior.tasks.length).to.be.equal(3);
    });

    it("SPL does not increment the current warrior's task index if maximum number of tasks for the current warrior \
        has been reached", () => {

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

            expect(core.readAt).not.to.have.been.called;

            expect(context.warrior.taskIndex).to.be.equal(2);
        });

    // NOP

    it("NOP does nothing", () => {

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

        expect(instructions[0]).to.be.thisInstruction(DataHelper.buildInstruction(
            2, OpcodeType.MOV, ModifierType.B, ModeType.Immediate, 1, ModeType.AIndirect, 2));

        expect(instructions[1]).to.be.thisInstruction(DataHelper.buildInstruction(
            3, OpcodeType.NOP, ModifierType.F, ModeType.Direct, -1, ModeType.Direct, 1));

        expect(instructions[2]).to.be.thisInstruction(DataHelper.buildInstruction(
            4, OpcodeType.ADD, ModifierType.AB, ModeType.APostIncrement, 2, ModeType.BPostIncrement, 0));

        expect(context.warrior.tasks.length).to.be.equal(3);
        expect(context.warrior.taskIndex).to.be.equal(2);
        expect(context.warrior.tasks[1].instructionPointer).to.be.equal(3);
    });
});