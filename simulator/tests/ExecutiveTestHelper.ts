import * as chai from "chai";
import * as sinon from "sinon";

import * as Helper from "./ExecutiveTestHelper";

import { IInstruction, OpcodeType, ModifierType } from "../interface/IInstruction";
import { IExecutionContext } from "../interface/IExecutionContext";
import { ICore } from "../interface/ICore";
import { IOptions } from "../interface/IOptions";
import { IExecutive } from "../interface/IExecutive";
import Defaults from "../Defaults";
import DataHelper from "./DataHelper";
import { ModeType } from "../interface/IOperand";

interface IExecutiveTestConfig {
    i: string,
    a: string,
    b: string,
    e: string
}

export function hookChaiInstructionAssertion() {
    chai.use((chai, util) => {
        chai.Assertion.addMethod("thisInstruction", function (expected: IInstruction) {

            var actual = <IInstruction>this._obj;

            this.assert(
                actual.opcode === expected.opcode,
                "expected #{this} to have opcode #{exp} but got #{act}",
                "ITS NOT CLEAR FROM THE DOCS WHAT THIS STRING IS FOR - LET ME KNOW IF YOU SEE IT!!",
                expected.opcode,
                actual.opcode
            );

            this.assert(
                actual.modifier === expected.modifier,
                "expected #{this} to have modifier #{exp} but got #{act}",
                "ITS NOT CLEAR FROM THE DOCS WHAT THIS STRING IS FOR - LET ME KNOW IF YOU SEE IT!!",
                expected.modifier,
                actual.modifier
            );

            this.assert(
                actual.aOperand.mode === expected.aOperand.mode,
                "expected #{this} to have A operand mode #{exp} but got #{act}",
                "ITS NOT CLEAR FROM THE DOCS WHAT THIS STRING IS FOR - LET ME KNOW IF YOU SEE IT!!",
                expected.aOperand.mode,
                actual.aOperand.mode
            );

            this.assert(
                actual.aOperand.address === expected.aOperand.address,
                "expected #{this} to have A operand address #{exp} but got #{act}",
                "ITS NOT CLEAR FROM THE DOCS WHAT THIS STRING IS FOR - LET ME KNOW IF YOU SEE IT!!",
                expected.aOperand.address,
                actual.aOperand.address
            );

            this.assert(
                actual.bOperand.mode === expected.bOperand.mode,
                "expected #{this} to have B operand mode #{exp} but got #{act}",
                "ITS NOT CLEAR FROM THE DOCS WHAT THIS STRING IS FOR - LET ME KNOW IF YOU SEE IT!!",
                expected.bOperand.mode,
                actual.bOperand.mode
            );

            this.assert(
                actual.bOperand.address === expected.bOperand.address,
                "expected #{this} to have B operand address #{exp} but got #{act}",
                "ITS NOT CLEAR FROM THE DOCS WHAT THIS STRING IS FOR - LET ME KNOW IF YOU SEE IT!!",
                expected.bOperand.address,
                actual.bOperand.address
            );
        });
    });
}

function buildCore(size: number): ICore {

    const wrapStub = sinon.stub();
    wrapStub.callsFake((address: number) => {
        return address;
    });

    return {
        getSize: () => { return size; },
        executeAt: sinon.stub(),
        readAt: sinon.stub(),
        getAt: sinon.stub(),
        getWithInfoAt: sinon.stub(),
        setAt: sinon.stub(),
        wrap: wrapStub,
        initialise: (options: IOptions) => { }
    };
}

function buildContext(instructions: IInstruction[]): IExecutionContext {

    const options = Object.assign({}, Defaults);
    options.maxTasks = 100;
    options.coresize = instructions.length;

    return {
        core: this.buildCore(instructions.length),
        instruction: instructions[1],
        instructionPointer: 1,
        operands
    };
}

const opcodeTable = {

    "DAT": OpcodeType.DAT,
    "MOV": OpcodeType.MOV,
    "ADD": OpcodeType.ADD,
    "SUB": OpcodeType.SUB,
    "MUL": OpcodeType.MUL,
    "DIV": OpcodeType.DIV,
    "MOD": OpcodeType.MOD,
    "JMP": OpcodeType.JMP,
    "JMZ": OpcodeType.JMZ,
    "JMN": OpcodeType.JMN,
    "DJN": OpcodeType.DJN,
    "CMP": OpcodeType.CMP,
    "SEQ": OpcodeType.SEQ,
    "SNE": OpcodeType.SNE,
    "SLT": OpcodeType.SLT,
    "SPL": OpcodeType.SPL,
    "NOP": OpcodeType.NOP
};

const modifierTable = {

    ".A": ModifierType.A,
    ".B": ModifierType.B,
    ".AB": ModifierType.AB,
    ".BA": ModifierType.BA,
    ".F": ModifierType.F,
    ".X": ModifierType.X,
    ".I": ModifierType.I,
};

const modeTable = {

    "#": ModeType.Immediate,
    "$": ModeType.Direct,
    "*": ModeType.AIndirect,
    "@": ModeType.BIndirect,
    "{": ModeType.APreDecrement,
    "<": ModeType.BPreDecrement,
    "}": ModeType.APostIncrement,
    ">": ModeType.BPostIncrement
};

function parseLine(address: number, line: string): IInstruction {

    const parts = line.split(" ");
    const command = parts[0].split(".");
    const opcode = command[0];
    const modifier = command[1];
    const aMode = parts[1].substring(0, 1);
    const aOperand = parseInt(parts[1].substring(1));
    const bMode = parts[1].substring(0, 1);
    const bOperand = parseInt(parts[1].substring(1));

    return DataHelper.buildInstruction(
        address,
        this.opcodeTable[opcode],
        this.modifierTable[modifier],
        this.modeTable[aMode],
        aOperand,
        this.modeTable[bMode],
        bOperand);
}

function parseInstructions(core: string): IInstruction[] {

    let address = 0;
    return core.split("; ").map(line => this.parseInstruction(address++, line));
}

export function runTest(core: IExecutiveTestConfig[], testMethod: (IExecutionContext) => void) {

    core.forEach(c => {
        const instructions = this.parseInstructions(c);
        const context = this.buildContext(instructions);
        testMethod(context);
    });
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