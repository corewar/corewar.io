import * as sinon from "sinon";

import TestHelper from "@simulator/tests/unit/TestHelper";

import { IInstruction, ModifierType } from "@simulator/interface/IInstruction";
import { IExecutionContext, IOperandPair } from "@simulator/interface/IExecutionContext";
import Defaults from "@simulator/Defaults";
import { IWarrior } from "@simulator/interface/IWarrior";

interface IExecutiveTestConfig {
    i: string;
    a: string;
    b: string;
    taskCount?: number;
    maxTasks?: number;
    /* eslint-disable-next-line */
    e: any;
}

function buildWarrior(testConfig: IExecutiveTestConfig): IWarrior {
    const warrior = TestHelper.buildWarrior(7, { data: "true" });
    warrior.tasks = [];
    for (let i = 0; i < (testConfig.taskCount || 3); i++) {
        warrior.tasks.push(TestHelper.buildTask());
    }
    return warrior;
}

function buildOperands(
    instruction: IInstruction,
    aInstruction: IInstruction,
    bInstruction: IInstruction): IOperandPair[] {

    switch (instruction.modifier) {

        case ModifierType.A:
            return [{ source: aInstruction.aOperand, destination: bInstruction.aOperand }];
        case ModifierType.B:
            return [{ source: aInstruction.bOperand, destination: bInstruction.bOperand }];
        case ModifierType.AB:
            return [{ source: aInstruction.aOperand, destination: bInstruction.bOperand }];
        case ModifierType.BA:
            return [{ source: aInstruction.bOperand, destination: bInstruction.aOperand }];
        case ModifierType.F:
        case ModifierType.I:
            return [
                { source: aInstruction.aOperand, destination: bInstruction.aOperand },
                { source: aInstruction.bOperand, destination: bInstruction.bOperand }
            ];
        case ModifierType.X:
            return [
                { source: aInstruction.aOperand, destination: bInstruction.bOperand },
                { source: aInstruction.bOperand, destination: bInstruction.aOperand }
            ];
        default:
            throw Error("Unknown modifier type: " + instruction.modifier);
    }
}

export function buildContext(testConfig: IExecutiveTestConfig): IExecutionContext {

    const options = Object.assign({}, Defaults);
    options.maxTasks = testConfig.maxTasks || 100;
    options.coresize = 50;

    const instruction = TestHelper.parseInstruction(0, testConfig.i);
    const aInstruction = TestHelper.parseInstruction(0, testConfig.a);
    const bInstruction = TestHelper.parseInstruction(0, testConfig.b);
    const operands = buildOperands(instruction, aInstruction, bInstruction);

    const core = TestHelper.buildCore(options.coresize);

    const wrapStub = core.wrap as sinon.SinonStub;
    wrapStub.callsFake((address: number) => {
        address = address % options.coresize;
        if (address < 0) {
            address += options.coresize;
        }
        return address;
    });

    const warrior = buildWarrior(testConfig);
    const taskIndex = 1;

    return {
        core: core,
        instruction: instruction,
        instructionPointer: 1,
        aInstruction: aInstruction,
        bInstruction: bInstruction,
        operands: operands,
        task: warrior.tasks[taskIndex],
        taskIndex: taskIndex,
        warrior: warrior,
        warriorIndex: 1
    };
}

export function runTest(testConfig: IExecutiveTestConfig[], testMethod: (IExecutionContext, string) => void): void {

    testConfig.forEach(c => {

        const context = buildContext(c);
        testMethod(context, c.e);
    });
}
