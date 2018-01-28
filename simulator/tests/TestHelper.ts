import * as chai from "chai";
import * as sinon from "sinon";

import { IToken, TokenCategory } from "../../parser/interface/IToken";
import { IParseResult } from "../../parser/interface/IParseResult";
import { IWarrior } from "../interface/IWarrior";
import { ITask } from "../interface/ITask";
import { OpcodeType, ModifierType } from "../interface/IInstruction";
import { ModeType } from "../interface/IOperand";
import { IInstruction } from "../interface/IInstruction";
import { ICore } from "../interface/ICore";
import { IOptions } from "../interface/IOptions";

"use strict";

export default class TestHelper {

    public static position = {
        line: 1,
        char: 1
    };

    public static buildParseResult(tokens: IToken[]): IParseResult {
        return {
            tokens: tokens,
            messages: [],
            metaData: {
                name: "",
                author: "",
                strategy: ""
            }

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
        bnumber: number): IToken[]{

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

    public static buildWarrior(id: number = 0): IWarrior {
        return {
            id: id,
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
    
        ".A": ModifierType.A,
        ".B": ModifierType.B,
        ".AB": ModifierType.AB,
        ".BA": ModifierType.BA,
        ".F": ModifierType.F,
        ".X": ModifierType.X,
        ".I": ModifierType.I,
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

        const parts = line.split(" ");
        const command = parts[0].split(".");
        const opcode = command[0];
        const modifier = command[1];
        const aMode = parts[1].substring(0, 1);
        const aOperand = parseInt(parts[1].substring(1));
        const bMode = parts[1].substring(0, 1);
        const bOperand = parseInt(parts[1].substring(1));
    
        return TestHelper.buildInstruction(
            address,
            this.opcodeTable[opcode],
            this.modifierTable[modifier],
            this.modeTable[aMode],
            aOperand,
            this.modeTable[bMode],
            bOperand);
    }
}