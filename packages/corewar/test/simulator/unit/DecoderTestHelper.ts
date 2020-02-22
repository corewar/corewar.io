import * as sinon from 'sinon'

import TestHelper from '@simulator/tests/unit/TestHelper'

import { IExecutionContext } from '@simulator/interface/IExecutionContext'

export interface IInstructionAssertion extends Chai.Assertion {
    thisInstruction(IInstruction): void
}

export interface IDecoderTestConfig {
    core: string[]
    ip: number
    /* eslint-disable-next-line */
    e: any[];
}

function buildContext(testConfig: IDecoderTestConfig): IExecutionContext {
    const instruction = TestHelper.parseInstruction(testConfig.ip, testConfig.core[testConfig.ip])

    const result = {
        core: TestHelper.buildCore(testConfig.core.length),
        instruction: instruction,
        instructionPointer: testConfig.ip,
        operands: [],
        task: TestHelper.buildTask(),
        taskIndex: 2,
        warrior: TestHelper.buildWarriorInstance(),
        warriorIndex: 1
    }

    let i = 0
    const instructions = testConfig.core.map(c => TestHelper.parseInstruction(i++, c))

    const get = result.core.getAt as sinon.SinonStub
    get.callsFake(address => {
        return instructions[address]
    })

    const read = result.core.readAt as sinon.SinonStub
    read.callsFake((_, address) => {
        return instructions[address]
    })

    return result
}

export function runTest(testConfig: IDecoderTestConfig[], testMethod: (IExecutionContext, string) => void): void {
    testConfig.forEach(c => {
        const context = buildContext(c)
        testMethod(context, c.e)
    })
}
