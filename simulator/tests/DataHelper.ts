/// <reference path="references.ts" />
import { IToken, TokenCategory } from "../../Parser//Interface/IToken";
import { IParseResult } from "../../Parser/Interface/IParseResult";
import { IWarrior } from "../Interface/IWarrior";
import { ITask } from "../Interface/ITask";
import { OpcodeType, ModifierType } from "../Interface/IInstruction";
import { ModeType } from "../Interface/IOperand";
import { IInstruction } from "../Interface/IInstruction";

"use strict";

export default class DataHelper {

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
            position: DataHelper.position
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
            DataHelper.buildToken(TokenCategory.Opcode, opcode),
            DataHelper.buildToken(TokenCategory.Modifier, modifier),
            DataHelper.buildToken(TokenCategory.Mode, amode),
            DataHelper.buildToken(TokenCategory.Number, anumber.toString()),
            DataHelper.buildToken(TokenCategory.Comma, ","),
            DataHelper.buildToken(TokenCategory.Mode, bmode),
            DataHelper.buildToken(TokenCategory.Number, bnumber.toString()),
            DataHelper.buildToken(TokenCategory.EOL, "\n")
        ];
    }

    public static buildWarrior(): IWarrior {
        return {
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
}