import * as chai from "chai";
import * as sinonChai from "sinon-chai";
var expect = chai.expect;
chai.use(sinonChai);

import TestHelper from "@simulator/tests/unit/TestHelper";
import * as Helper from "@simulator/tests/unit/DecoderTestHelper";

import { OpcodeType } from "@simulator/interface/IInstruction";
import { IExecutive } from "@simulator/interface/IExecutive";
import { IExecutionContext } from "@simulator/interface/IExecutionContext";
import { Decoder } from "@simulator/Decoder";
import { IDecoder } from "@simulator/interface/IDecoder";

"use strict";

describe("Decoder", () => {

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
        { core: ["NOP.I $1, $2", "ADD.AB #3, #4", "DAT.F $5, $6"], ip: 1, e: ["ADD.AB #3, #4", "ADD.AB #3, #4"] },
        { core: ["NOP.I $1, $2", "ADD.AB $-1, $1", "DAT.F $5, $6"], ip: 1, e: ["NOP.I $1, $2", "DAT.F $5, $6"] },
        { core: ["NOP.I $2, $1", "ADD.AB *-1, *1", "DAT.F $-1, $1"], ip: 1, e: ["DAT.F $-1, $1", "ADD.AB *-1, *1"] },
        { core: ["NOP.I $1, $2", "ADD.AB @-1, @1", "DAT.F $5, $-1"], ip: 1, e: ["DAT.F $5, $-1", "ADD.AB @-1, @1"] },
        { core: ["NOP.I $1, $2", "ADD.AB {0, {1", "DAT.F $0, $6"], ip: 1, e: ["NOP.I $1, $2", "ADD.AB {0, {1"] },
        { core: ["NOP.I $2, $1", "ADD.AB <-1, <1", "DAT.F $5, $0"], ip: 1, e: ["NOP.I $2, $0", "ADD.AB <-1, <1"] },
        { core: ["NOP.I $1, $2", "ADD.AB }-1, }1", "DAT.F $0, $6"], ip: 1, e: ["ADD.AB }-1, }1", "DAT.F $0, $6"] },
        { core: ["NOP.I $2, $0", "ADD.AB >-1, >1", "DAT.F $5, $-1"], ip: 1, e: ["NOP.I $2, $0", "ADD.AB >-1, >1"] }
    ],
        (context, expectation) => {

            it("correctly decodes addressing modes for " + TestHelper.instructionToString(context.instruction), () => {

                const actual = decoder.decode(context);

                const aExpected = TestHelper.parseInstruction(1, expectation[0]);
                const bExpected = TestHelper.parseInstruction(1, expectation[1]);

                (expect(actual.aInstruction).to.be as Helper.InstructionAssertion).thisInstruction(aExpected);
                (expect(actual.bInstruction).to.be as Helper.InstructionAssertion).thisInstruction(bExpected);
            });
        });

    Helper.runTest([
        { core: ["ADD.A #3, #4"], ip: 0, e: ["3, 3"] },
        { core: ["ADD.B #3, #4"], ip: 0, e: ["4, 4"] },
        { core: ["ADD.AB #3, #4"], ip: 0, e: ["3, 4"] },
        { core: ["ADD.BA #3, #4"], ip: 0, e: ["4, 3"] },
        { core: ["ADD.F #3, #4"], ip: 0, e: ["3, 3", "4, 4"] },
        { core: ["ADD.X #3, #4"], ip: 0, e: ["3, 4", "4, 3"] },
        { core: ["ADD.I #3, #4"], ip: 0, e: ["3, 3", "4, 4"] },
    ],
        (context, expectation) => {

            it("correctly decodes modifier for " + TestHelper.instructionToString(context.instruction), () => {

                const actual = decoder.decode(context);

                const expected = expectation.map(e => {
                    const parts = e.split(", ");
                    return {
                        source: parseInt(parts[0]),
                        destination: parseInt(parts[1])
                    }
                });

                expect(actual.operands.length).to.be.equal(expected.length);

                let i = 0;
                actual.operands.forEach(o => {

                    expect(o.source.address).to.be.equal(expected[i].source);
                    expect(o.destination.address).to.be.equal(expected[i].destination);
                    i++;
                });
            });
        });

    Helper.runTest([
        { core: ["ADD.BLAH #3, #4"], ip: 0, e: ["3, 3"] }
    ],
    (context, expectation) => {
        it("throws an error for invalid modifier", () => {

            let actual = null;
            try {
                decoder.decode(context);
            } catch (e) {
                actual = e;
            }

            expect(actual).to.not.be.null;
            expect(actual).to.be.equal("Unknown modifier: undefined");
        });
    });

    Helper.runTest([
        { core: ["DAT.I"], ip: 0, e: [OpcodeType.DAT] },
        { core: ["MOV.I"], ip: 0,e: [OpcodeType.MOV] },
        { core: ["ADD.I"], ip: 0,e: [OpcodeType.ADD] },
        { core: ["SUB.I"], ip: 0,e: [OpcodeType.SUB] },
        { core: ["MUL.I"], ip: 0,e: [OpcodeType.MUL] },
        { core: ["DIV.I"], ip: 0,e: [OpcodeType.DIV] },
        { core: ["MOD.I"], ip: 0,e: [OpcodeType.MOD] },
        { core: ["JMP.I"], ip: 0,e: [OpcodeType.JMP] },
        { core: ["JMZ.I"], ip: 0,e: [OpcodeType.JMZ] },
        { core: ["JMN.I"], ip: 0,e: [OpcodeType.JMN] },
        { core: ["DJN.I"], ip: 0,e: [OpcodeType.DJN] },
        { core: ["CMP.I"], ip: 0,e: [OpcodeType.CMP] },
        { core: ["SEQ.I"], ip: 0,e: [OpcodeType.SEQ] },
        { core: ["SNE.I"], ip: 0,e: [OpcodeType.SNE] },
        { core: ["SLT.I"], ip: 0,e: [OpcodeType.SLT] },
        { core: ["SPL.I"], ip: 0,e: [OpcodeType.SPL] },
        { core: ["NOP.I"], ip: 0,e: [OpcodeType.NOP] }
    ],
        (context, expectation) => {
            it("selects correct executive command for " + TestHelper.instructionToString(context.instruction), () => {

                const actual = decoder.decode(context);

                expect(actual.command).to.be.equal(executive.commandTable[expectation]);
            });
        });
});