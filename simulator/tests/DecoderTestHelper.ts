import { IExecutionContext } from "../interface/IExecutionContext";
import TestHelper from "./TestHelper";


export interface IDecoderTestConfig {
    core: string[],
    ip: number,
    e: string[]
}

function buildContext(testConfig: IDecoderTestConfig): IExecutionContext {

    const instruction = TestHelper.parseInstruction(testConfig.ip, testConfig.core[testConfig.ip]);

    return {
        core: TestHelper.buildCore(testConfig.core.length),
        instruction: instruction,
        instructionPointer: testConfig.ip,
        operands: [],
        task: TestHelper.buildTask(),
        taskIndex: 2,
        warrior: TestHelper.buildWarrior(),
        warriorIndex: 1
    };
}

export function runTest(testConfig: IDecoderTestConfig[], testMethod: (IExecutionContext, string) => void) {

    testConfig.forEach(c => {

        const context = this.buildContext(testConfig);
        testMethod(context, c.e);
    });
}