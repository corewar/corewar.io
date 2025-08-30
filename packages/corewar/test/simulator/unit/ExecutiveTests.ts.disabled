import * as chai from 'chai'
import * as sinonChai from 'sinon-chai'
const expect = chai.expect
chai.use(sinonChai)

import TestHelper from '@simulator/tests/unit/TestHelper'
import * as Helper from '@simulator/tests/unit/ExecutiveTestHelper'
import { Executive } from '@simulator/Executive'
import { IPublisher } from '@simulator/interface/IPublisher'
import { OpcodeType } from '@simulator/interface/IInstruction'
import { IExecutionContext } from '@simulator/interface/IExecutionContext'
import { MessageType } from '@simulator/interface/IMessage'

describe('Executive', () => {
    let publisher: IPublisher

    beforeEach(() => {
        publisher = TestHelper.buildPublisher()

        this!.executive = new Executive(publisher)
    })

    Helper.runTest(
        [
            { i: 'DAT.I', a: 'DAT.I $0, $0', b: 'DAT.I $0, $0', taskCount: 3, e: { taskIndex: 1, taskCount: 2 } },
            { i: 'DAT.I', a: 'DAT.I $0, $0', b: 'DAT.I $0, $0', taskCount: 2, e: { taskIndex: 0, taskCount: 1 } },
            { i: 'DIV.A', a: 'DAT.I $0, $0', b: 'DAT.I $1, $1', taskCount: 3, e: { taskIndex: 1, taskCount: 2 } },
            { i: 'MOD.A', a: 'DAT.I $0, $0', b: 'DAT.I $1, $1', taskCount: 3, e: { taskIndex: 1, taskCount: 2 } }
            /* eslint-disable-next-line */
    ], (context: IExecutionContext, expectation: any) => {
            it(
                'removes the current task from the queue when ' +
                    TestHelper.instructionToString(context.instruction) +
                    ' is executed',
                () => {
                    const payload = {
                        warriorId: context.instance.warrior.internalId,
                        warriorData: { data: 'true' },
                        taskCount: expectation.taskCount
                    }

                    this!.executive.commandTable[context.instruction.opcode].apply(this!.executive, [context])

                    expect(context.instance.tasks.length).to.be.equal(expectation.taskCount)
                    expect(context.instance.taskIndex).to.be.equal(expectation.taskIndex)

                    expect(publisher.queue).to.have.been.calledWith({
                        type: MessageType.TaskCount,
                        payload
                    })

                    expect(publisher.queue).not.to.have.been.calledWith({
                        type: MessageType.WarriorDead,
                        payload
                    })
                }
            )
        }
    )

    Helper.runTest(
        [
            { i: 'DAT.I', a: 'DAT.I $0, $0', b: 'DAT.I $0, $0', taskCount: 1, e: { taskIndex: 1, taskCount: 0 } }
            /* eslint-disable-next-line */
    ], (context: IExecutionContext) => {
            it('queues warrior dead message when warrior task count reduced to zero', () => {
                const payload = {
                    warriorId: context.instance.warrior.internalId,
                    warriorData: { data: 'true' },
                    taskCount: 0
                }

                this!.executive.commandTable[context.instruction.opcode].apply(this!.executive, [context])

                expect(publisher.queue).to.have.been.calledWith({
                    type: MessageType.WarriorDead,
                    payload
                })
            })
        }
    )

    Helper.runTest(
        [
            { i: 'MOV.A', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #1, #4' },
            { i: 'MOV.B', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #3, #2' },
            { i: 'MOV.AB', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #3, #1' },
            { i: 'MOV.BA', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #2, #4' },
            { i: 'MOV.F', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #1, #2' },
            { i: 'MOV.X', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #2, #1' },
            { i: 'MOV.I', a: '12: NOP.A $1, $2', b: '10: DAT.F #3, #4', e: '10: NOP.A $1, $2' },

            { i: 'ADD.A', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #4, #4' },
            { i: 'ADD.B', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #3, #6' },
            { i: 'ADD.AB', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #3, #5' },
            { i: 'ADD.BA', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #5, #4' },
            { i: 'ADD.F', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #4, #6' },
            { i: 'ADD.X', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #5, #5' },
            { i: 'ADD.I', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #4, #6' },
            { i: 'ADD.F', a: 'NOP.A $48, $49', b: 'DAT.F #2, #2', e: 'DAT.F #0, #1' },

            { i: 'SUB.A', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #2, #4' },
            { i: 'SUB.B', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #3, #2' },
            { i: 'SUB.AB', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #3, #3' },
            { i: 'SUB.BA', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #1, #4' },
            { i: 'SUB.F', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #2, #2' },
            { i: 'SUB.X', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #1, #3' },
            { i: 'SUB.I', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #2, #2' },
            { i: 'SUB.F', a: 'NOP.A $2, $3', b: 'DAT.F #1, #3', e: 'DAT.F #49, #0' },

            { i: 'MUL.A', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #3, #4' },
            { i: 'MUL.B', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #3, #8' },
            { i: 'MUL.AB', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #3, #4' },
            { i: 'MUL.BA', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #6, #4' },
            { i: 'MUL.F', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #3, #8' },
            { i: 'MUL.X', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #6, #4' },
            { i: 'MUL.I', a: 'NOP.A $1, $2', b: 'DAT.F #3, #4', e: 'DAT.F #3, #8' },
            { i: 'MUL.I', a: 'NOP.A $8, $7', b: 'DAT.F #8, #7', e: 'DAT.F #14, #49' },

            { i: 'DIV.A', a: 'NOP.A $2, $4', b: 'DAT.F #8, #12', e: 'DAT.F #4, #12' },
            { i: 'DIV.B', a: 'NOP.A $2, $4', b: 'DAT.F #8, #12', e: 'DAT.F #8, #3' },
            { i: 'DIV.AB', a: 'NOP.A $2, $4', b: 'DAT.F #8, #12', e: 'DAT.F #8, #6' },
            { i: 'DIV.BA', a: 'NOP.A $2, $4', b: 'DAT.F #8, #12', e: 'DAT.F #2, #12' },
            { i: 'DIV.F', a: 'NOP.A $2, $4', b: 'DAT.F #8, #12', e: 'DAT.F #4, #3' },
            { i: 'DIV.X', a: 'NOP.A $2, $4', b: 'DAT.F #8, #12', e: 'DAT.F #2, #6' },
            { i: 'DIV.I', a: 'NOP.A $2, $4', b: 'DAT.F #8, #12', e: 'DAT.F #4, #3' },
            { i: 'DIV.F', a: 'NOP.A $3, $7', b: 'DAT.F #1, #22', e: 'DAT.F #0, #3' },

            { i: 'MOD.A', a: 'NOP.A $2, $4', b: 'DAT.F #9, #14', e: 'DAT.F #1, #14' },
            { i: 'MOD.B', a: 'NOP.A $2, $4', b: 'DAT.F #9, #14', e: 'DAT.F #9, #2' },
            { i: 'MOD.AB', a: 'NOP.A $2, $4', b: 'DAT.F #9, #14', e: 'DAT.F #9, #0' },
            { i: 'MOD.BA', a: 'NOP.A $2, $4', b: 'DAT.F #9, #14', e: 'DAT.F #1, #14' },
            { i: 'MOD.F', a: 'NOP.A $2, $4', b: 'DAT.F #9, #14', e: 'DAT.F #1, #2' },
            { i: 'MOD.X', a: 'NOP.A $2, $4', b: 'DAT.F #9, #14', e: 'DAT.F #1, #0' },
            { i: 'MOD.I', a: 'NOP.A $2, $4', b: 'DAT.F #9, #14', e: 'DAT.F #1, #2' }
        ],
        (context: IExecutionContext, expectation: string) => {
            it('correctly executes ' + TestHelper.instructionToString(context.instruction), () => {
                this!.executive.commandTable[context.instruction.opcode].apply(this!.executive, [context])

                const expected = TestHelper.parseInstruction(0, expectation)

                expect(context.core.setAt).to.have.been.calledWith(context.task, context.bInstruction.address, expected)
            })
        }
    )

    // Helper.runTest([
    //     { i: "MOV.I", a: "10: NOP.A $1, $2", b: "12: DAT.F #3, #4", e: "12: NOP.A $1, $2" }
    // ], (context: IExecutionContext, expectation: string) => {

    //     it("maintains correct address for b instruction when executing MOV.I", () => {

    //         this!.executive.commandTable[context.instruction.opcode].apply(this!.executive, [context]);

    //         const expected = TestHelper.parseInstruction(0, expectation);

    //         expect(context.core.setAt).to.have.been.calledWith(sinon.any, context.bInstruction.address, expected);
    //     });
    // });

    Helper.runTest(
        [
            { i: 'JMP.A', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $0', e: { ip: 13 } },
            { i: 'JMP.B', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $0', e: { ip: 13 } },
            { i: 'JMP.AB', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $0', e: { ip: 13 } },
            { i: 'JMP.BA', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $0', e: { ip: 13 } },
            { i: 'JMP.F', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $0', e: { ip: 13 } },
            { i: 'JMP.X', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $0', e: { ip: 13 } },
            { i: 'JMP.I', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $0', e: { ip: 13 } },

            { i: 'JMZ.A', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $0', e: { ip: 13 } },
            { i: 'JMZ.A', a: '13: DAT.F $0, $0', b: 'DAT.F $1, $0', e: { ip: 0 } },
            { i: 'JMZ.B', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $0', e: { ip: 13 } },
            { i: 'JMZ.B', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $1', e: { ip: 0 } },
            { i: 'JMZ.AB', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $0', e: { ip: 13 } },
            { i: 'JMZ.AB', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $1', e: { ip: 0 } },
            { i: 'JMZ.BA', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $0', e: { ip: 13 } },
            { i: 'JMZ.BA', a: '13: DAT.F $0, $0', b: 'DAT.F $1, $0', e: { ip: 0 } },
            { i: 'JMZ.F', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $0', e: { ip: 13 } },
            { i: 'JMZ.F', a: '13: DAT.F $0, $0', b: 'DAT.F $1, $0', e: { ip: 0 } },
            { i: 'JMZ.F', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $1', e: { ip: 0 } },
            { i: 'JMZ.X', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $0', e: { ip: 13 } },
            { i: 'JMZ.X', a: '13: DAT.F $0, $0', b: 'DAT.F $1, $0', e: { ip: 0 } },
            { i: 'JMZ.X', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $1', e: { ip: 0 } },
            { i: 'JMZ.I', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $0', e: { ip: 13 } },
            { i: 'JMZ.I', a: '13: DAT.F $0, $0', b: 'DAT.F $1, $0', e: { ip: 0 } },
            { i: 'JMZ.I', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $1', e: { ip: 0 } },

            { i: 'JMN.A', a: '13: DAT.F $0, $0', b: 'DAT.F $1, $0', e: { ip: 13 } },
            { i: 'JMN.A', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $0', e: { ip: 0 } },
            { i: 'JMN.B', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $1', e: { ip: 13 } },
            { i: 'JMN.B', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $0', e: { ip: 0 } },
            { i: 'JMN.AB', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $1', e: { ip: 13 } },
            { i: 'JMN.AB', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $0', e: { ip: 0 } },
            { i: 'JMN.BA', a: '13: DAT.F $0, $0', b: 'DAT.F $1, $0', e: { ip: 13 } },
            { i: 'JMN.BA', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $0', e: { ip: 0 } },
            { i: 'JMN.F', a: '13: DAT.F $0, $0', b: 'DAT.F $1, $1', e: { ip: 13 } },
            { i: 'JMN.F', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $1', e: { ip: 0 } },
            { i: 'JMN.F', a: '13: DAT.F $0, $0', b: 'DAT.F $1, $0', e: { ip: 0 } },
            { i: 'JMN.X', a: '13: DAT.F $0, $0', b: 'DAT.F $1, $1', e: { ip: 13 } },
            { i: 'JMN.X', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $1', e: { ip: 0 } },
            { i: 'JMN.X', a: '13: DAT.F $0, $0', b: 'DAT.F $1, $0', e: { ip: 0 } },
            { i: 'JMN.I', a: '13: DAT.F $0, $0', b: 'DAT.F $1, $1', e: { ip: 13 } },
            { i: 'JMN.I', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $1', e: { ip: 0 } },
            { i: 'JMN.I', a: '13: DAT.F $0, $0', b: 'DAT.F $1, $0', e: { ip: 0 } }
            /* eslint-disable-next-line */
    ], (context: IExecutionContext, expectation: any) => {
            it('correctly executes ' + TestHelper.instructionToString(context.instruction), () => {
                this!.executive.commandTable[context.instruction.opcode].apply(this!.executive, [context])

                expect(context.task.instructionPointer).to.be.equal(expectation.ip)
            })
        }
    )

    Helper.runTest(
        [
            { i: 'DJN.A', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $0', e: { ip: 13, i: 'DAT.F $49, $0' } },
            { i: 'DJN.A', a: '13: DAT.F $0, $0', b: 'DAT.F $1, $0', e: { ip: 0, i: 'DAT.F $0, $0' } },
            { i: 'DJN.B', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $0', e: { ip: 13, i: 'DAT.F $0, $49' } },
            { i: 'DJN.B', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $1', e: { ip: 0, i: 'DAT.F $0, $0' } },
            { i: 'DJN.AB', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $0', e: { ip: 13, i: 'DAT.F $0, $49' } },
            { i: 'DJN.AB', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $1', e: { ip: 0, i: 'DAT.F $0, $0' } },
            { i: 'DJN.BA', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $0', e: { ip: 13, i: 'DAT.F $49, $0' } },
            { i: 'DJN.BA', a: '13: DAT.F $0, $0', b: 'DAT.F $1, $0', e: { ip: 0, i: 'DAT.F $0, $0' } },
            { i: 'DJN.F', a: '13: DAT.F $0, $0', b: 'DAT.F $1, $0', e: { ip: 13, i: 'DAT.F $0, $49' } },
            { i: 'DJN.F', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $1', e: { ip: 13, i: 'DAT.F $49, $0' } },
            { i: 'DJN.F', a: '13: DAT.F $0, $0', b: 'DAT.F $1, $1', e: { ip: 0, i: 'DAT.F $0, $0' } },
            { i: 'DJN.X', a: '13: DAT.F $0, $0', b: 'DAT.F $1, $0', e: { ip: 13, i: 'DAT.F $0, $49' } },
            { i: 'DJN.X', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $1', e: { ip: 13, i: 'DAT.F $49, $0' } },
            { i: 'DJN.X', a: '13: DAT.F $0, $0', b: 'DAT.F $1, $1', e: { ip: 0, i: 'DAT.F $0, $0' } },
            { i: 'DJN.I', a: '13: DAT.F $0, $0', b: 'DAT.F $1, $0', e: { ip: 13, i: 'DAT.F $0, $49' } },
            { i: 'DJN.I', a: '13: DAT.F $0, $0', b: 'DAT.F $0, $1', e: { ip: 13, i: 'DAT.F $49, $0' } },
            { i: 'DJN.I', a: '13: DAT.F $0, $0', b: 'DAT.F $1, $1', e: { ip: 0, i: 'DAT.F $0, $0' } }
            /* eslint-disable-next-line */
    ], (context: IExecutionContext, expectation: any) => {
            it('correctly executes ' + TestHelper.instructionToString(context.instruction), () => {
                this!.executive.commandTable[context.instruction.opcode].apply(this!.executive, [context])

                const expected = TestHelper.parseInstruction(0, expectation.i)

                expect(context.task.instructionPointer).to.be.equal(expectation.ip)
                expect(context.core.setAt).to.have.been.calledWith(context.task, context.bInstruction.address, expected)
            })
        }
    )

    Helper.runTest(
        [
            { i: 'SEQ.A', a: 'DAT.F $0, $2', b: 'DAT.F $0, $3', e: { ip: 1 } },
            { i: 'SEQ.A', a: 'DAT.F $0, $2', b: 'DAT.F $1, $3', e: { ip: 0 } },
            { i: 'SEQ.A', a: 'DAT.F $1, $2', b: 'DAT.F $0, $3', e: { ip: 0 } },
            { i: 'SEQ.B', a: 'DAT.F $2, $0', b: 'DAT.F $3, $0', e: { ip: 1 } },
            { i: 'SEQ.B', a: 'DAT.F $2, $0', b: 'DAT.F $3, $1', e: { ip: 0 } },
            { i: 'SEQ.B', a: 'DAT.F $2, $1', b: 'DAT.F $3, $0', e: { ip: 0 } },
            { i: 'SEQ.AB', a: 'DAT.F $0, $2', b: 'DAT.F $3, $0', e: { ip: 1 } },
            { i: 'SEQ.AB', a: 'DAT.F $0, $2', b: 'DAT.F $3, $1', e: { ip: 0 } },
            { i: 'SEQ.AB', a: 'DAT.F $1, $2', b: 'DAT.F $3, $0', e: { ip: 0 } },
            { i: 'SEQ.BA', a: 'DAT.F $2, $0', b: 'DAT.F $0, $3', e: { ip: 1 } },
            { i: 'SEQ.BA', a: 'DAT.F $2, $0', b: 'DAT.F $1, $3', e: { ip: 0 } },
            { i: 'SEQ.BA', a: 'DAT.F $2, $1', b: 'DAT.F $0, $3', e: { ip: 0 } },
            { i: 'SEQ.F', a: 'DAT.F $0, $1', b: 'DAT.F $0, $1', e: { ip: 1 } },
            { i: 'SEQ.F', a: 'DAT.F $1, $1', b: 'DAT.F $0, $1', e: { ip: 0 } },
            { i: 'SEQ.F', a: 'DAT.F $0, $2', b: 'DAT.F $0, $1', e: { ip: 0 } },
            { i: 'SEQ.X', a: 'DAT.F $0, $1', b: 'DAT.F $1, $0', e: { ip: 1 } },
            { i: 'SEQ.X', a: 'DAT.F $1, $1', b: 'DAT.F $1, $0', e: { ip: 0 } },
            { i: 'SEQ.X', a: 'DAT.F $0, $2', b: 'DAT.F $1, $0', e: { ip: 0 } },
            { i: 'SEQ.I', a: 'DAT.F $0, $1', b: 'DAT.F $0, $1', e: { ip: 1 } },
            { i: 'SEQ.I', a: 'MOV.F $0, $1', b: 'DAT.F $0, $1', e: { ip: 0 } },
            { i: 'SEQ.I', a: 'DAT.A $0, $1', b: 'DAT.F $0, $1', e: { ip: 0 } },
            { i: 'SEQ.I', a: 'DAT.F #0, $1', b: 'DAT.F $0, $1', e: { ip: 0 } },
            { i: 'SEQ.I', a: 'DAT.F $0, @1', b: 'DAT.F $0, $1', e: { ip: 0 } },
            { i: 'SEQ.I', a: 'DAT.F $1, $1', b: 'DAT.F $0, $1', e: { ip: 0 } },
            { i: 'SEQ.I', a: 'DAT.F $0, $2', b: 'DAT.F $0, $1', e: { ip: 0 } },

            { i: 'CMP.A', a: 'DAT.F $0, $2', b: 'DAT.F $0, $3', e: { ip: 1 } },
            { i: 'CMP.A', a: 'DAT.F $0, $2', b: 'DAT.F $1, $3', e: { ip: 0 } },

            { i: 'SNE.A', a: 'DAT.F $0, $2', b: 'DAT.F $0, $3', e: { ip: 0 } },
            { i: 'SNE.A', a: 'DAT.F $0, $2', b: 'DAT.F $1, $3', e: { ip: 1 } },
            { i: 'SNE.A', a: 'DAT.F $1, $2', b: 'DAT.F $0, $3', e: { ip: 1 } },
            { i: 'SNE.B', a: 'DAT.F $2, $0', b: 'DAT.F $3, $0', e: { ip: 0 } },
            { i: 'SNE.B', a: 'DAT.F $2, $0', b: 'DAT.F $3, $1', e: { ip: 1 } },
            { i: 'SNE.B', a: 'DAT.F $2, $1', b: 'DAT.F $3, $0', e: { ip: 1 } },
            { i: 'SNE.AB', a: 'DAT.F $0, $2', b: 'DAT.F $3, $0', e: { ip: 0 } },
            { i: 'SNE.AB', a: 'DAT.F $0, $2', b: 'DAT.F $3, $1', e: { ip: 1 } },
            { i: 'SNE.AB', a: 'DAT.F $1, $2', b: 'DAT.F $3, $0', e: { ip: 1 } },
            { i: 'SNE.BA', a: 'DAT.F $2, $0', b: 'DAT.F $0, $3', e: { ip: 0 } },
            { i: 'SNE.BA', a: 'DAT.F $2, $0', b: 'DAT.F $1, $3', e: { ip: 1 } },
            { i: 'SNE.BA', a: 'DAT.F $2, $1', b: 'DAT.F $0, $3', e: { ip: 1 } },
            { i: 'SNE.F', a: 'DAT.F $0, $1', b: 'DAT.F $0, $1', e: { ip: 0 } },
            { i: 'SNE.F', a: 'DAT.F $1, $1', b: 'DAT.F $0, $1', e: { ip: 1 } },
            { i: 'SNE.F', a: 'DAT.F $0, $2', b: 'DAT.F $0, $1', e: { ip: 1 } },
            { i: 'SNE.X', a: 'DAT.F $0, $1', b: 'DAT.F $1, $0', e: { ip: 0 } },
            { i: 'SNE.X', a: 'DAT.F $1, $1', b: 'DAT.F $1, $0', e: { ip: 1 } },
            { i: 'SNE.X', a: 'DAT.F $0, $2', b: 'DAT.F $1, $0', e: { ip: 1 } },
            { i: 'SNE.I', a: 'DAT.F $0, $1', b: 'DAT.F $0, $1', e: { ip: 0 } },
            { i: 'SNE.I', a: 'MOV.F $0, $1', b: 'DAT.F $0, $1', e: { ip: 1 } },
            { i: 'SNE.I', a: 'DAT.A $0, $1', b: 'DAT.F $0, $1', e: { ip: 1 } },
            { i: 'SNE.I', a: 'DAT.F #0, $1', b: 'DAT.F $0, $1', e: { ip: 1 } },
            { i: 'SNE.I', a: 'DAT.F $0, @1', b: 'DAT.F $0, $1', e: { ip: 1 } },
            { i: 'SNE.I', a: 'DAT.F $1, $1', b: 'DAT.F $0, $1', e: { ip: 1 } },
            { i: 'SNE.I', a: 'DAT.F $0, $2', b: 'DAT.F $0, $1', e: { ip: 1 } },

            { i: 'SLT.A', a: 'DAT.F $0, $0', b: 'DAT.F $1, $0', e: { ip: 1 } },
            { i: 'SLT.A', a: 'DAT.F $1, $0', b: 'DAT.F $1, $0', e: { ip: 0 } },
            { i: 'SLT.A', a: 'DAT.F $1, $0', b: 'DAT.F $0, $0', e: { ip: 0 } },
            { i: 'SLT.B', a: 'DAT.F $0, $0', b: 'DAT.F $0, $1', e: { ip: 1 } },
            { i: 'SLT.B', a: 'DAT.F $0, $1', b: 'DAT.F $0, $1', e: { ip: 0 } },
            { i: 'SLT.B', a: 'DAT.F $0, $1', b: 'DAT.F $0, $0', e: { ip: 0 } },
            { i: 'SLT.AB', a: 'DAT.F $0, $0', b: 'DAT.F $0, $1', e: { ip: 1 } },
            { i: 'SLT.AB', a: 'DAT.F $1, $0', b: 'DAT.F $0, $1', e: { ip: 0 } },
            { i: 'SLT.AB', a: 'DAT.F $1, $0', b: 'DAT.F $0, $0', e: { ip: 0 } },
            { i: 'SLT.BA', a: 'DAT.F $0, $0', b: 'DAT.F $1, $0', e: { ip: 1 } },
            { i: 'SLT.BA', a: 'DAT.F $0, $1', b: 'DAT.F $1, $0', e: { ip: 0 } },
            { i: 'SLT.BA', a: 'DAT.F $0, $1', b: 'DAT.F $0, $0', e: { ip: 0 } },
            { i: 'SLT.F', a: 'DAT.F $0, $1', b: 'DAT.F $1, $2', e: { ip: 1 } },
            { i: 'SLT.F', a: 'DAT.F $0, $1', b: 'DAT.F $0, $2', e: { ip: 0 } },
            { i: 'SLT.F', a: 'DAT.F $0, $1', b: 'DAT.F $1, $1', e: { ip: 0 } },
            { i: 'SLT.X', a: 'DAT.F $1, $0', b: 'DAT.F $1, $2', e: { ip: 1 } },
            { i: 'SLT.X', a: 'DAT.F $1, $0', b: 'DAT.F $0, $2', e: { ip: 0 } },
            { i: 'SLT.X', a: 'DAT.F $1, $0', b: 'DAT.F $1, $1', e: { ip: 0 } },
            { i: 'SLT.I', a: 'DAT.F $0, $1', b: 'DAT.F $1, $2', e: { ip: 1 } },
            { i: 'SLT.I', a: 'DAT.F $0, $1', b: 'DAT.F $0, $2', e: { ip: 0 } },
            { i: 'SLT.I', a: 'DAT.F $0, $1', b: 'DAT.F $1, $1', e: { ip: 0 } }
            /* eslint-disable-next-line */
    ], (context: IExecutionContext, expectation: any) => {
            it('correctly executes ' + TestHelper.instructionToString(context.instruction), () => {
                this!.executive.commandTable[context.instruction.opcode].apply(this!.executive, [context])

                expect(context.task.instructionPointer).to.be.equal(expectation.ip)
            })
        }
    )

    Helper.runTest(
        [
            {
                i: 'SPL.A',
                a: '13: DAT.F $0, $0',
                b: 'DAT.F $0, $0',
                taskCount: 2,
                e: { taskCount: 3, taskIndex: 1, maxTasks: 10 }
            },
            {
                i: 'SPL.B',
                a: '13: DAT.F $0, $0',
                b: 'DAT.F $0, $0',
                taskCount: 2,
                e: { taskCount: 3, taskIndex: 1, maxTasks: 10 }
            },
            {
                i: 'SPL.AB',
                a: '13: DAT.F $0, $0',
                b: 'DAT.F $0, $0',
                taskCount: 2,
                e: { taskCount: 3, taskIndex: 1, maxTasks: 10 }
            },
            {
                i: 'SPL.BA',
                a: '13: DAT.F $0, $0',
                b: 'DAT.F $0, $0',
                taskCount: 2,
                e: { taskCount: 3, taskIndex: 1, maxTasks: 10 }
            },
            {
                i: 'SPL.F',
                a: '13: DAT.F $0, $0',
                b: 'DAT.F $0, $0',
                taskCount: 2,
                e: { taskCount: 3, taskIndex: 1, maxTasks: 10 }
            },
            {
                i: 'SPL.X',
                a: '13: DAT.F $0, $0',
                b: 'DAT.F $0, $0',
                taskCount: 2,
                e: { taskCount: 3, taskIndex: 1, maxTasks: 10 }
            },
            {
                i: 'SPL.I',
                a: '13: DAT.F $0, $0',
                b: 'DAT.F $0, $0',
                taskCount: 2,
                e: { taskCount: 3, taskIndex: 1, maxTasks: 10 }
            },
            {
                i: 'SPL.A',
                a: '13: DAT.F $0, $0',
                b: 'DAT.F $0, $0',
                taskCount: 2,
                e: { taskCount: 2, taskIndex: 0, maxTasks: 2 }
            }
            /* eslint-disable-next-line */
    ], (context: IExecutionContext, expectation: any) => {
            it('correctly executes ' + TestHelper.instructionToString(context.instruction), () => {
                this!.executive.initialise(expectation)
                this!.executive.commandTable[context.instruction.opcode].apply(this!.executive, [context])

                expect(context.instance.tasks.length).to.be.equal(expectation.taskCount)
                expect(context.instance.taskIndex).to.be.equal(expectation.taskIndex)
                expect(context.instance.tasks[context.instance.taskIndex].instructionPointer).to.be.equal(0)

                if (expectation.taskCount === expectation.maxTasks) {
                    return
                }

                expect(context.instance.tasks[0].instructionPointer).to.be.equal(13)

                expect(publisher.queue).to.have.been.calledWith({
                    type: MessageType.TaskCount,
                    payload: {
                        warriorId: context.instance.warrior.internalId,
                        warriorData: { data: 'true' },
                        taskCount: expectation.taskCount
                    }
                })
            })
        }
    )

    Helper.runTest(
        [
            { i: 'NOP.A', a: 'DAT.F $0, $0', b: 'DAT.F $0, $0', taskCount: 3, e: {} }
            /* eslint-disable-next-line */
    ], (context: IExecutionContext, _: any) => {
            it('NOP instruction does not modify core or warrior tasks', () => {
                this!.executive.commandTable[OpcodeType.NOP].apply(this!.executive, [context])

                expect(context.core.setAt).not.to.have.been.called
                expect(context.instance.tasks.length).to.be.equal(3)
            })
        }
    )
})
