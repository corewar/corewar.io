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
import { MessageType } from "../interface/IMessage";

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

    Helper.runTest([
        { i: "DAT.I", a: "DAT.I $0, $0", b: "DAT.I $0, $0", taskCount: 3, e: { taskIndex: 1, taskCount: 2 } },
        { i: "DAT.I", a: "DAT.I $0, $0", b: "DAT.I $0, $0", taskCount: 2, e: { taskIndex: 0, taskCount: 1 } },
        { i: "DIV.A", a: "DAT.I $0, $0", b: "DAT.I $1, $1", taskCount: 3, e: { taskIndex: 1, taskCount: 2 } },
        { i: "MOD.A", a: "DAT.I $0, $0", b: "DAT.I $1, $1", taskCount: 3, e: { taskIndex: 1, taskCount: 2 } }
    ], (context: IExecutionContext, expectation: any) => {
        it("removes the current task from the queue when " + TestHelper.instructionToString(context.instruction) + " is executed", () => {

            this.executive.commandTable[context.instruction.opcode].apply(this.executive, [context]);

            expect(context.warrior.tasks.length).to.be.equal(expectation.taskCount);
            expect(context.warrior.taskIndex).to.be.equal(expectation.taskIndex);

            expect(publisher.queue).to.have.been.calledWith({
                type: MessageType.TaskCount,
                payload: {
                    warriorId: context.warrior.id,
                    taskCount: expectation.taskCount
                }
            });
        });
    });

    Helper.runTest([
        { i: "MOV.A", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #1, #4" },
        { i: "MOV.B", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #3, #2" },
        { i: "MOV.AB", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #3, #1" },
        { i: "MOV.BA", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #2, #4" },
        { i: "MOV.F", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #1, #2" },
        { i: "MOV.X", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #2, #1" },
        { i: "MOV.I", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "NOP.A $1, $2" },

        { i: "ADD.A", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #4, #4" },
        { i: "ADD.B", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #3, #6" },
        { i: "ADD.AB", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #3, #5" },
        { i: "ADD.BA", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #5, #4" },
        { i: "ADD.F", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #4, #6" },
        { i: "ADD.X", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #5, #5" },
        { i: "ADD.I", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #4, #6" },
        { i: "ADD.F", a: "NOP.A $48, $49", b: "DAT.F #2, #2", e: "DAT.F #0, #1" },

        { i: "SUB.A", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #2, #4" },
        { i: "SUB.B", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #3, #2" },
        { i: "SUB.AB", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #3, #3" },
        { i: "SUB.BA", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #1, #4" },
        { i: "SUB.F", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #2, #2" },
        { i: "SUB.X", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #1, #3" },
        { i: "SUB.I", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #2, #2" },
        { i: "SUB.F", a: "NOP.A $2, $3", b: "DAT.F #1, #3", e: "DAT.F #49, #0" },

        { i: "MUL.A", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #3, #4" },
        { i: "MUL.B", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #3, #8" },
        { i: "MUL.AB", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #3, #4" },
        { i: "MUL.BA", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #6, #4" },
        { i: "MUL.F", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #3, #8" },
        { i: "MUL.X", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #6, #4" },
        { i: "MUL.I", a: "NOP.A $1, $2", b: "DAT.F #3, #4", e: "DAT.F #3, #8" },
        { i: "MUL.I", a: "NOP.A $8, $7", b: "DAT.F #8, #7", e: "DAT.F #14, #49" },

        { i: "DIV.A", a: "NOP.A $2, $4", b: "DAT.F #8, #12", e: "DAT.F #4, #12" },
        { i: "DIV.B", a: "NOP.A $2, $4", b: "DAT.F #8, #12", e: "DAT.F #8, #3" },
        { i: "DIV.AB", a: "NOP.A $2, $4", b: "DAT.F #8, #12", e: "DAT.F #8, #6" },
        { i: "DIV.BA", a: "NOP.A $2, $4", b: "DAT.F #8, #12", e: "DAT.F #2, #12" },
        { i: "DIV.F", a: "NOP.A $2, $4", b: "DAT.F #8, #12", e: "DAT.F #4, #3" },
        { i: "DIV.X", a: "NOP.A $2, $4", b: "DAT.F #8, #12", e: "DAT.F #2, #6" },
        { i: "DIV.I", a: "NOP.A $2, $4", b: "DAT.F #8, #12", e: "DAT.F #4, #3" },
        { i: "DIV.F", a: "NOP.A $3, $7", b: "DAT.F #1, #22", e: "DAT.F #0, #3" },
        //TODO test rounding
        //TODO test divide by zero in separate test

        { i: "MOD.A", a: "NOP.A $2, $4", b: "DAT.F #9, #14", e: "DAT.F #1, #14" },
        { i: "MOD.B", a: "NOP.A $2, $4", b: "DAT.F #9, #14", e: "DAT.F #9, #2" },
        { i: "MOD.AB", a: "NOP.A $2, $4", b: "DAT.F #9, #14", e: "DAT.F #9, #0" },
        { i: "MOD.BA", a: "NOP.A $2, $4", b: "DAT.F #9, #14", e: "DAT.F #1, #14" },
        { i: "MOD.F", a: "NOP.A $2, $4", b: "DAT.F #9, #14", e: "DAT.F #1, #2" },
        { i: "MOD.X", a: "NOP.A $2, $4", b: "DAT.F #9, #14", e: "DAT.F #1, #0" },
        { i: "MOD.I", a: "NOP.A $2, $4", b: "DAT.F #9, #14", e: "DAT.F #1, #2" }
    ], (context: IExecutionContext, expectation: string) => {

        it("correctly executes " + TestHelper.instructionToString(context.instruction), () => {

            this.executive.commandTable[context.instruction.opcode].apply(this.executive, [context]);

            const expected = TestHelper.parseInstruction(0, expectation);

            expect(context.core.setAt).to.have.been.calledWith(context.task, context.bInstruction.address, expected);
        });
    });

    Helper.runTest([
        { i: "NOP.A", a: "DAT.F $0, $0", b: "DAT.F $0, $0", taskCount: 3, e: {} }
    ], (context: IExecutionContext, expectation: string) => {
        it("NOP instruction does not modify core or warrior tasks", () => {

            this.executive.commandTable[OpcodeType.NOP].apply(this.executive, [context]);

            expect(context.core.setAt).not.to.have.been.called;
            expect(context.warrior.tasks.length).to.be.equal(3);
        });
    });
});