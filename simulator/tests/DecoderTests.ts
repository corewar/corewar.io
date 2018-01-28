import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
var expect = chai.expect;
chai.use(sinonChai);

import TestHelper from "./TestHelper";
import * as Helper from "./DecoderTestHelper";

import { ICore, ICoreAccessEventArgs, CoreAccessType } from "../interface/ICore";
import { IInstruction } from "../interface/IInstruction";
import { OpcodeType, ModifierType } from "../interface/IInstruction";
import { IExecutive } from "../interface/IExecutive";
import { IExecutionContext } from "../interface/IExecutionContext";
import { ITask } from "../interface/ITask";
import Defaults from "../Defaults";
import { IOptions } from "../interface/IOptions";
import { ModeType } from "../interface/IOperand";
import { Decoder } from "../Decoder";
import { IDecoder } from "../interface/IDecoder";

"use strict";

describe("Decoder",() => {

    let executive: IExecutive;
    let decoder: IDecoder;

    beforeEach(() => {

        TestHelper.hookChaiInstructionAssertion();

        executive = {
            initialise: () => {
                //
            },
            commandTable: []
        };

        for (var i = 0; i < OpcodeType.Count; i++) {
            executive.commandTable[i] = (c: IExecutionContext) => {
                //
            };
        }

        decoder = new Decoder(executive);
    });

    Helper.runTest([
        {core: ["NOP.I $1, $2", "ADD.AB #3, #4", "DAT.F $5, $6"], ip: 1, e: ["ADD.AB #3, #4", "ADD.AB #3, #4"]},
        {core: ["NOP.I $1, $2", "ADD.AB $-1, $1", "DAT.F $5, $6"], ip: 1, e: ["NOP.I $1, $2", "DAT.F $5, $6"]},
        {core: ["NOP.I $2, $1", "ADD.AB *-1, *1", "DAT.F $-1, $1"], ip: 1, e: ["DAT.F $-1, $1", "ADD.AB *-1, *1"]},
        {core: ["NOP.I $1, $2", "ADD.AB @-1, @1", "DAT.F $5, $-1"], ip: 1, e: ["DAT.F $5, $-1", "ADD.AB @-1, @1"]},
        {core: ["NOP.I $1, $2", "ADD.AB {-1, {1", "DAT.F $0, $6"], ip: 1, e: ["NOP.I $0, $2", "ADD.AB {-1, {1"]},
        {core: ["NOP.I $2, $1", "ADD.AB <-1, <1", "DAT.F $5, $0"], ip: 1, e: ["NOP.I $2, $1", "ADD.AB <-1, <1"]},
        {core: ["NOP.I $1, $2", "ADD.AB }-1, }1", "DAT.F $0, $6"], ip: 1, e: ["ADD.AB }-1, }1", "DAT.F $0, $6"]},
        {core: ["NOP.I $2, $0", "ADD.AB >-1, >1", "DAT.F $5, $-1"], ip: 1, e: ["NOP.I $2, $0", "ADD.AB >-1, >1"]},
    ],
    (context, expectation) => {

        it("correctly decodes addressing modes", () => {

            const actual = decoder.decode(context);

            const aExpected = TestHelper.parseInstruction(1, expectation[0]);
            const bExpected = TestHelper.parseInstruction(1, expectation[1]);

            expect(actual.aInstruction).to.be.thisInstruction(aExpected);
            expect(actual.aInstruction).to.be.thisInstruction(bExpected);
        });
    });

    // it("sets the A pointer to equal instruction pointer if the A addressing mode is immediate",() => {

    //     prepareCore(5, [
    //         TestHelper.buildInstruction(3, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 5, ModeType.Immediate, 6)
    //     ]);

    //     var context = setInstructionPointer(3);

    //     var decoder = new Decoder(executive);
    //     decoder.decode(context);

    //     expect(context.aPointer).to.be.equal(3);
    // });

    // it("sets the B pointer to equal instruction pointer if the B addressing mode is immediate",() => {

    //     prepareCore(5, [
    //         TestHelper.buildInstruction(3, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 5, ModeType.Immediate, 6)
    //     ]);

    //     var context = setInstructionPointer(3);

    //     var decoder = new Decoder(executive);
    //     decoder.decode(context);

    //     expect(context.bPointer).to.be.equal(3);
    // });

    // it("sets the A pointer to the relative position of the A field value if the A addressing mode is direct",() => {

    //     prepareCore(5, [
    //         TestHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.Direct, 2, ModeType.Immediate, 0)
    //     ]);

    //     var context = setInstructionPointer(2);

    //     var decoder = new Decoder(executive);
    //     decoder.decode(context);

    //     expect(context.aPointer).to.be.equal(4);
    // });

    // it("sets the B pointer to the relative position of the B field value if the B addressing mode is direct",() => {

    //     prepareCore(5, [
    //         TestHelper.buildInstruction(1, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 0, ModeType.Direct, 3)
    //     ]);

    //     var context = setInstructionPointer(1);

    //     var decoder = new Decoder(executive);
    //     decoder.decode(context);

    //     expect(context.bPointer).to.be.equal(4);
    // });

    // it("sets the A pointer to the relative position of the A field value of the instruction pointed to by the current instruction A field \
    //     value if the A addressing mode is A Indirect",() => {

    //     prepareCore(5, [
    //         TestHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.AIndirect, 2, ModeType.Immediate, 0),
    //         TestHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, -1, ModeType.Immediate, 0),
    //     ]);

    //     var context = setInstructionPointer(2);

    //     var decoder = new Decoder(executive);
    //     decoder.decode(context);

    //     expect(context.aPointer).to.be.equal(3);
    // });

    // it("sets the B pointer to the relative position of the A field value of the instruction pointed to by the current instruction B field \
    //     value if the B addressing mode is A Indirect",() => {

    //     prepareCore(5, [
    //         TestHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 0, ModeType.AIndirect, 2),
    //         TestHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, -1, ModeType.Immediate, 0),
    //     ]);

    //     var context = setInstructionPointer(2);

    //     var decoder = new Decoder(executive);
    //     decoder.decode(context);

    //     expect(context.bPointer).to.be.equal(3);
    // });

    // it("sets the A pointer to the relative position of the B field value of the instruction pointed to by the current instruction A field \
    //     value if the A addressing mode is B Indirect",() => {

    //     prepareCore(5, [
    //         TestHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.BIndirect, 2, ModeType.Immediate, 0),
    //         TestHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 0, ModeType.Immediate, -1),
    //     ]);

    //     var context = setInstructionPointer(2);

    //     var decoder = new Decoder(executive);
    //     decoder.decode(context);

    //     expect(context.aPointer).to.be.equal(3);
    // });

    // it("sets the B pointer to the relative position of the B field value of the instruction pointed to by the current instruction B field \
    //     value if the B addressing mode is B Indirect",() => {

    //     prepareCore(5, [
    //         TestHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 0, ModeType.BIndirect, 2),
    //         TestHelper.buildInstruction(4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 0, ModeType.Immediate, -1),
    //     ]);

    //     var context = setInstructionPointer(2);

    //     var decoder = new Decoder(executive);
    //     decoder.decode(context);

    //     expect(context.bPointer).to.be.equal(3);
    // });

    // it("sets the A pointer to the relative position of the pre-deremented A field value of the instruction pointed to by the current \
    //     instruction A field value if the A addressing mode is A Pre-Decrement",() => {

    //     var expectedInstruction = TestHelper.buildInstruction(
    //         4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 0, ModeType.Immediate, 1);

    //     prepareCore(5, [
    //         TestHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.APreDecrement, 2, ModeType.Immediate, 0),
    //         expectedInstruction,
    //     ]);

    //     var context = setInstructionPointer(2);

    //     var decoder = new Decoder(executive);
    //     decoder.decode(context);

    //     expect(context.aPointer).to.be.equal(3);
    //     expect(core.setAt).to.have.been.calledWith(sinon.match.any, 4, expectedInstruction);
    //     expect(expectedInstruction.aOperand.address).to.be.equal(-1);
    // });

    // it("sets the B pointer to the relative position of the pre-deremented A field value of the instruction pointed to by the current \
    //     instruction B field value if the B addressing mode is A Pre-Decrement",() => {

    //     var expectedInstruction = TestHelper.buildInstruction(
    //         4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 0, ModeType.Immediate, 1);

    //     prepareCore(5, [
    //         TestHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 0, ModeType.APreDecrement, 2),
    //         expectedInstruction,
    //     ]);

    //     var context = setInstructionPointer(2);

    //     var decoder = new Decoder(executive);
    //     decoder.decode(context);

    //     expect(context.bPointer).to.be.equal(3);
    //     expect(core.setAt).to.have.been.calledWith(sinon.match.any, 4, expectedInstruction);
    //     expect(expectedInstruction.aOperand.address).to.be.equal(-1);
    // });

    // it("sets the A pointer to the relative position of the pre-deremented B field value of the instruction pointed to by the current \
    //     instruction A field value if the A addressing mode is B Pre-Decrement",() => {

    //     var expectedInstruction = TestHelper.buildInstruction(
    //         4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 1, ModeType.Immediate, 0);

    //     prepareCore(5, [
    //         TestHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.BPreDecrement, 2, ModeType.Immediate, 0),
    //         expectedInstruction,
    //     ]);

    //     var context = setInstructionPointer(2);

    //     var decoder = new Decoder(executive);
    //     decoder.decode(context);

    //     expect(context.aPointer).to.be.equal(3);
    //     expect(core.setAt).to.have.been.calledWith(sinon.match.any,4, expectedInstruction);
    //     expect(expectedInstruction.bOperand.address).to.be.equal(-1);
    // });

    // it("sets the B pointer to the relative position of the pre-deremented B field value of the instruction pointed to by the current \
    //     instruction B field value if the B addressing mode is B Pre-Decrement",() => {

    //     var expectedInstruction = TestHelper.buildInstruction(
    //         4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 1, ModeType.Immediate, 0);

    //     prepareCore(5, [
    //         TestHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 0, ModeType.BPreDecrement, 2),
    //         expectedInstruction,
    //     ]);

    //     var context = setInstructionPointer(2);

    //     var decoder = new Decoder(executive);
    //     decoder.decode(context);

    //     expect(context.bPointer).to.be.equal(3);
    //     expect(core.setAt).to.have.been.calledWith(sinon.match.any,4, expectedInstruction);
    //     expect(expectedInstruction.bOperand.address).to.be.equal(-1);
    // });

    // it("sets the A pointer to the relative position of the post-incremented A field value of the instruction pointed to by the current \
    //     instruction A field value if the A addressing mode is A Post-Increment",() => {

    //     var expectedInstruction = TestHelper.buildInstruction(
    //         4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, -1, ModeType.Immediate, 1);

    //     prepareCore(5, [
    //         TestHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.APostIncrement, 2, ModeType.Immediate, 0),
    //         expectedInstruction,
    //     ]);

    //     var context = setInstructionPointer(2);

    //     var decoder = new Decoder(executive);
    //     decoder.decode(context);

    //     expect(context.aPointer).to.be.equal(3);
    //     expect(core.setAt).to.have.been.calledWith(sinon.match.any,4, expectedInstruction);
    //     expect(expectedInstruction.aOperand.address).to.be.equal(0);
    // });

    // it("sets the B pointer to the relative position of the post-incremented A field value of the instruction pointed to by the current \
    //     instruction B field value if the B addressing mode is A Post-Increment",() => {

    //     var expectedInstruction = TestHelper.buildInstruction(
    //         4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, -1, ModeType.Immediate, 1);

    //     prepareCore(5, [
    //         TestHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 0, ModeType.APostIncrement, 2),
    //         expectedInstruction,
    //     ]);

    //     var context = setInstructionPointer(2);

    //     var decoder = new Decoder(executive);
    //     decoder.decode(context);

    //     expect(context.bPointer).to.be.equal(3);
    //     expect(core.setAt).to.have.been.calledWith(sinon.match.any,4, expectedInstruction);
    //     expect(expectedInstruction.aOperand.address).to.be.equal(0);
    // });

    // it("sets the A pointer to the relative position of the post-incremented B field value of the instruction pointed to by the current \
    //     instruction A field value if the A addressing mode is B Post-Increment",() => {

    //     var expectedInstruction = TestHelper.buildInstruction(
    //         4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 1, ModeType.Immediate, -1);

    //     prepareCore(5, [
    //         TestHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.BPostIncrement, 2, ModeType.Immediate, 0),
    //         expectedInstruction,
    //     ]);

    //     var context = setInstructionPointer(2);

    //     var decoder = new Decoder(executive);
    //     decoder.decode(context);

    //     expect(context.aPointer).to.be.equal(3);
    //     expect(core.setAt).to.have.been.calledWith(sinon.match.any,4, expectedInstruction);
    //     expect(expectedInstruction.bOperand.address).to.be.equal(0);
    // });

    // it("sets the B pointer to the relative position of the post-incremented B field value of the instruction pointed to by the current \
    //     instruction B field value if the B addressing mode is B Post-Increment",() => {

    //     var expectedInstruction = TestHelper.buildInstruction(
    //         4, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 1, ModeType.Immediate, -1);

    //     prepareCore(5, [
    //         TestHelper.buildInstruction(2, OpcodeType.MOV, ModifierType.I, ModeType.Immediate, 0, ModeType.BPostIncrement, 2),
    //         expectedInstruction,
    //     ]);

    //     var context = setInstructionPointer(2);

    //     var decoder = new Decoder(executive);
    //     decoder.decode(context);

    //     expect(context.bPointer).to.be.equal(3);
    //     expect(core.setAt).to.have.been.calledWith(sinon.match.any,4, expectedInstruction);
    //     expect(expectedInstruction.bOperand.address).to.be.equal(0);
    // });

    // it("returns the command from the command table which corresponds with the combination of the current instruction's \
    //     opcode and modifier",() => {

    //     prepareCore(5, [
    //         TestHelper.buildInstruction(3, OpcodeType.MOV, ModifierType.BA, ModeType.Immediate, 5, ModeType.Immediate, 6)
    //     ]);

    //     var context = setInstructionPointer(3);

    //     var decoder = new Decoder(executive);
    //     decoder.decode(context);

    //     // OpcodeType.MOV = 1
    //     // ModifierType.Count = 7
    //     // ModifierType.BA = 3
    //     // 1*7 + 3 = 10
    //     expect(context.command).to.be.equal(executive.commandTable[10]);
    // });
});