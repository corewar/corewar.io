import * as chai from "chai";
import * as sinon from "sinon";

import * as Helper from "./ExecutiveTestHelper";
import TestHelper from "./TestHelper";

import { IInstruction, OpcodeType, ModifierType } from "../interface/IInstruction";
import { IExecutionContext, IOperandPair } from "../interface/IExecutionContext";
import { ICore } from "../interface/ICore";
import { IOptions } from "../interface/IOptions";
import { IExecutive } from "../interface/IExecutive";
import { ModeType } from "../interface/IOperand";
import Defaults from "../Defaults";
import { Decoder } from "../Decoder";
import { IWarrior } from "../interface/IWarrior";

interface IExecutiveTestConfig {
    i: string,
    a: string,
    b: string,
    taskCount?: number;
    e: any
}

export function runTest(testConfig: IExecutiveTestConfig[], testMethod: (IExecutionContext, string) => void) {

    testConfig.forEach(c => {

        const context = buildContext(c);
        testMethod(context, c.e);
    });
}

function buildContext(testConfig: IExecutiveTestConfig): IExecutionContext {

    const options = Object.assign({}, Defaults);
    options.maxTasks = 100;
    options.coresize = 50;

    const instruction = TestHelper.parseInstruction(0, testConfig.i);
    const aInstruction = TestHelper.parseInstruction(0, testConfig.a);
    const bInstruction = TestHelper.parseInstruction(0, testConfig.b);
    const operands = buildOperands(instruction, aInstruction, bInstruction);

    const core = TestHelper.buildCore(options.coresize);

    const wrapStub = <sinon.stub>core.wrap;
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

function buildWarrior(testConfig: IExecutiveTestConfig): IWarrior {
    const warrior = TestHelper.buildWarrior(7);
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



/*export function prepareCore(size: number, instructions: IInstruction[]) {

    const coreData = [];

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

export function buildContext(instructionPointer: number,
    aInstruction: IInstruction,
    bInstruction: IInstruction,
    currentTaskIndex: number = 1,
    numberOfTasks: number = 3): IExecutionContext {

    var warrior = DataHelper.buildWarrior(7);

    for (let i = 0; i < numberOfTasks; i++) {
        const task = DataHelper.buildTask();
        task.instructionPointer = i === currentTaskIndex ? instructionPointer : 0;
        warrior.tasks.push(task);
    }

    state.warriors = [warrior];

    state.warriorIndex = 0;
    warrior.taskIndex = currentTaskIndex + 1; // Task Index 'currentTaskIndex' is executing but the index has been incremented by the fetch

    return {
        aInstruction: aInstruction,
        bInstruction: bInstruction,
        operands: [],
        core: core,
        instruction: core.getAt(instructionPointer),
        instructionPointer: instructionPointer,
        task: warrior.tasks[currentTaskIndex],
        taskIndex: currentTaskIndex, // Task which is actually executing
        warrior: warrior,
        warriorIndex: state.warriorIndex
    };
}

export function decode(opcode: OpcodeType, modifier: ModifierType) {
    return opcode * ModifierType.Count + modifier;
}*/