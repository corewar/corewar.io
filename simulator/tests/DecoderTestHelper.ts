import * as sinon from "sinon";

import TestHelper from "@simulator/tests/TestHelper";

import { IExecutionContext } from "@simulator/interface/IExecutionContext";

export interface IDecoderTestConfig {
    core: string[],
    ip: number,
    e: any[]
}

function buildContext(testConfig: IDecoderTestConfig): IExecutionContext {

    const instruction = TestHelper.parseInstruction(testConfig.ip, testConfig.core[testConfig.ip]);

    const result = {
        core: TestHelper.buildCore(testConfig.core.length),
        instruction: instruction,
        instructionPointer: testConfig.ip,
        operands: [],
        task: TestHelper.buildTask(),
        taskIndex: 2,
        warrior: TestHelper.buildWarrior(),
        warriorIndex: 1
    };

    let i = 0;
    const instructions = testConfig.core.map(c => TestHelper.parseInstruction(i++, c));

    const get = <sinon.SinonStub>result.core.getAt;
    get.callsFake(address => {
        return instructions[address];
    });

    const read = <sinon.SinonStub>result.core.readAt;
    read.callsFake((task, address) => {
        return instructions[address];
    });

    return result;
}

export function runTest(testConfig: IDecoderTestConfig[], testMethod: (IExecutionContext, string) => void) {

    testConfig.forEach(c => {

        const context = buildContext(c);
        testMethod(context, c.e);
    });
}