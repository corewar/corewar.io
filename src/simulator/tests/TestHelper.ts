import * as chai from "chai";
import * as sinon from "sinon";

import { IToken, TokenCategory } from "@parser/interface/IToken";
import { IParseResult } from "@parser/interface/IParseResult";
import { IWarrior } from "@simulator/interface/IWarrior";
import { ITask } from "@simulator/interface/ITask";
import { OpcodeType, ModifierType } from "@simulator/interface/IInstruction";
import { ModeType } from "@simulator/interface/IOperand";
import { IInstruction } from "@simulator/interface/IInstruction";
import { ICore } from "@simulator/interface/ICore";
import { IOptions } from "@simulator/interface/IOptions";
import { IPublisher } from "@simulator/interface/IPublisher";
import { ILoader } from "@simulator/interface/ILoader";
import { IEndCondition } from "@simulator/interface/IEndCondition";
import { IOptionValidator } from "@simulator/interface/IOptionValidator";

"use strict";

export default class TestHelper {

    public static position = {
        line: 1,
        char: 1
    };

    public static buildPublisher(): IPublisher {

        return {
            queue: sinon.stub(),
            publish: sinon.stub(),
            republish: sinon.stub(),
            clear: sinon.stub(),
            setPublishProvider: sinon.stub()
        };
    }

    public static buildParseResult(tokens: IToken[]): IParseResult {
        return {
            tokens: tokens,
            messages: [],
            metaData: {
                name: "",
                author: "",
                strategy: ""
            },
            data: {}
        };
    }

    public static buildToken(category: TokenCategory, lexeme: string): IToken {
        return {
            category: category,
            lexeme: lexeme,
            position: TestHelper.position
        };
    }

    public static instruction(
        opcode: string,
        modifier: string,
        amode: string,
        anumber: number,
        bmode: string,
        bnumber: number): IToken[] {

        return [
            TestHelper.buildToken(TokenCategory.Opcode, opcode),
            TestHelper.buildToken(TokenCategory.Modifier, modifier),
            TestHelper.buildToken(TokenCategory.Mode, amode),
            TestHelper.buildToken(TokenCategory.Number, anumber.toString()),
            TestHelper.buildToken(TokenCategory.Comma, ","),
            TestHelper.buildToken(TokenCategory.Mode, bmode),
            TestHelper.buildToken(TokenCategory.Number, bnumber.toString()),
            TestHelper.buildToken(TokenCategory.EOL, "\n")
        ];
    }

    public static buildWarrior(id: number = 0, data: any = null): IWarrior {
        return {
            id: id,
            data: data,
            author: "",
            name: "",
            startAddress: 0,
            strategy: "",
            taskIndex: 0,
            tasks: []
        };
    }

    public static buildTask(): ITask {
        return {
            warrior: null,
            instructionPointer: 0
        };
    }

    public static buildInstruction(
        address: number,
        opcode: OpcodeType,
        modifier: ModifierType,
        amode: ModeType,
        aaddress: number,
        bmode: ModeType,
        baddress: number): IInstruction {

        return {
            address: address,
            opcode: opcode,
            modifier: modifier,
            aOperand: {
                mode: amode,
                address: aaddress
            },
            bOperand: {
                mode: bmode,
                address: baddress
            }
        };
    }

    public static buildCore(size: number): ICore {

        const wrapStub = sinon.stub();
        wrapStub.callsFake((address: number) => {
            address = address % size;
            address = address >= 0 ? address : address + size;

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

    public static hookChaiInstructionAssertion() {
        chai.use((chai, util) => {
            chai.Assertion.addMethod("thisInstruction", function (expected: IInstruction) {

                var actual = <IInstruction>this._obj;

                this.assert(
                    actual.opcode === expected.opcode,
                    "expected " + TestHelper.instructionToString(actual) + " to have opcode #{exp} but got #{act}",
                    "ITS NOT CLEAR FROM THE DOCS WHAT THIS STRING IS FOR - LET ME KNOW IF YOU SEE IT!!",
                    expected.opcode,
                    actual.opcode
                );

                this.assert(
                    actual.modifier === expected.modifier,
                    "expected " + TestHelper.instructionToString(actual) + " to have modifier #{exp} but got #{act}",
                    "ITS NOT CLEAR FROM THE DOCS WHAT THIS STRING IS FOR - LET ME KNOW IF YOU SEE IT!!",
                    expected.modifier,
                    actual.modifier
                );

                this.assert(
                    actual.aOperand.mode === expected.aOperand.mode,
                    "expected " + TestHelper.instructionToString(actual) + " to have A operand mode #{exp} but got #{act}",
                    "ITS NOT CLEAR FROM THE DOCS WHAT THIS STRING IS FOR - LET ME KNOW IF YOU SEE IT!!",
                    expected.aOperand.mode,
                    actual.aOperand.mode
                );

                this.assert(
                    actual.aOperand.address === expected.aOperand.address,
                    "expected " + TestHelper.instructionToString(actual) + " to have A operand address #{exp} but got #{act}",
                    "ITS NOT CLEAR FROM THE DOCS WHAT THIS STRING IS FOR - LET ME KNOW IF YOU SEE IT!!",
                    expected.aOperand.address,
                    actual.aOperand.address
                );

                this.assert(
                    actual.bOperand.mode === expected.bOperand.mode,
                    "expected " + TestHelper.instructionToString(actual) + " to have B operand mode #{exp} but got #{act}",
                    "ITS NOT CLEAR FROM THE DOCS WHAT THIS STRING IS FOR - LET ME KNOW IF YOU SEE IT!!",
                    expected.bOperand.mode,
                    actual.bOperand.mode
                );

                this.assert(
                    actual.bOperand.address === expected.bOperand.address,
                    "expected " + TestHelper.instructionToString(actual) + " to have B operand address #{exp} but got #{act}",
                    "ITS NOT CLEAR FROM THE DOCS WHAT THIS STRING IS FOR - LET ME KNOW IF YOU SEE IT!!",
                    expected.bOperand.address,
                    actual.bOperand.address
                );
            });
        });
    }

    static opcodeTable = {

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

    static modifierTable = {

        "A": ModifierType.A,
        "B": ModifierType.B,
        "AB": ModifierType.AB,
        "BA": ModifierType.BA,
        "F": ModifierType.F,
        "X": ModifierType.X,
        "I": ModifierType.I,
    };

    static modeTable = {

        "#": ModeType.Immediate,
        "$": ModeType.Direct,
        "*": ModeType.AIndirect,
        "@": ModeType.BIndirect,
        "{": ModeType.APreDecrement,
        "<": ModeType.BPreDecrement,
        "}": ModeType.APostIncrement,
        ">": ModeType.BPostIncrement
    };

    public static parseInstruction(address: number, line: string): IInstruction {

        const lineNumberParts = line.split(": ");
        if (lineNumberParts.length == 2) {
            address = parseInt(lineNumberParts[0]);
            line = lineNumberParts[1];
        }

        const parts = line.split(" ");
        const command = parts[0].split(".");
        const opcode = command[0];
        const modifier = command[1];

        let aMode = "$";
        let aOperand = 0;
        let bMode = "$";
        let bOperand = 0;

        if (parts.length > 1) {
            aMode = parts[1].substring(0, 1);
            aOperand = parseInt(parts[1].substring(1));
            bMode = parts[2].substring(0, 1);
            bOperand = parseInt(parts[2].substring(1));
        }

        return TestHelper.buildInstruction(
            address,
            this.opcodeTable[opcode],
            this.modifierTable[modifier],
            this.modeTable[aMode],
            aOperand,
            this.modeTable[bMode],
            bOperand);
    }

    public static instructionToString(instruction: IInstruction) {

        const opcode = this.reverseLookup(this.opcodeTable, instruction.opcode);
        const modifier = this.reverseLookup(this.modifierTable, instruction.modifier);
        const aMode = this.reverseLookup(this.modeTable, instruction.aOperand.mode);
        const aAddress = instruction.aOperand.address.toString();
        const bMode = this.reverseLookup(this.modeTable, instruction.bOperand.mode);
        const bAddress = instruction.bOperand.address.toString();

        return opcode + "." + modifier + " " + aMode + aAddress + ", " + bMode + bAddress;
    }

    private static reverseLookup = function (dictionary, value) {
        for (var prop in dictionary) {
            if (dictionary.hasOwnProperty(prop)) {
                if (dictionary[prop] === value)
                    return prop;
            }
        }
    }

    public static getPublisher(): IPublisher {

        return {
            queue: sinon.stub(),
            publish: sinon.stub(),
            republish: sinon.stub(),
            clear: sinon.stub(),
            setPublishProvider: sinon.stub()
        };
    }

    public static getLoader(): ILoader {

        return {
            load: sinon.stub()
        };
    }

    public static getEndCondition(): IEndCondition {

        return {
            check: sinon.stub()
        };
    }

    public static getOptionValidator(): IOptionValidator {

        return {
            validate: sinon.stub()
        };
    }
}