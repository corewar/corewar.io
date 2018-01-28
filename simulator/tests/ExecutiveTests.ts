import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
var expect = chai.expect;
chai.use(sinonChai);

import TestHelper from "./TestHelper";
import * as Helper from "./ExecutiveTestHelper";
import { Executive } from "../Executive";
import { IPublisher } from "../interface/IPublisher";
import { OpcodeType } from "../interface/IInstruction";
import { IExecutionContext } from "../interface/IExecutionContext";

describe("Executive", () => {

    let executive: Executive;

    let publisher: IPublisher;

    beforeEach(() => {

        publisher = {
            queue: sinon.stub(),
            publish: sinon.stub(),
            setPublishProvider: sinon.stub()
        };

        this.executive = new Executive(publisher);
    });

    // Helper.runTest([
    //     { i: "DAT.I", a: "DAT.I $0, $0", b: "DAT.I $0, $0", e: "DAT.I $0, $0" }
    // ], (context: IExecutionContext) => {
    //     it("removes the current task from the queue when the DAT instruction is executed", () => {

    //         this.exec.commandTable[context.instruction.opcode].apply(this.exec, [context]);


    //     });
    // });

    Helper.runTest([
        { i: "MOV.A" , a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #1, #4" },
        { i: "MOV.B" , a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #3, #2" },
        { i: "MOV.AB", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #3, #1" },
        { i: "MOV.BA", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #2, #4" },
        { i: "MOV.F" , a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #1, #2" },
        { i: "MOV.X" , a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #2, #1" },
        { i: "MOV.I" , a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "NOP.A $1, $2" }
    ], (context: IExecutionContext, expectation: string) => {
        it("correctly executes MOV instruction", () => {

            this.exec.commandTable[context.instruction.opcode].apply(this.exec, [context]);

            const expected = TestHelper.parseInstruction(0, expectation);
            
            expect(context.core.setAt).to.have.been.calledWith(context.task, context.bInstruction.address, expected);
        });
    });
});