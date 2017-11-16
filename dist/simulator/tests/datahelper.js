"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="references.ts" />
const IToken_1 = require("../../Parser/interface/IToken");
"use strict";
class DataHelper {
    static buildParseResult(tokens) {
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
    static buildToken(category, lexeme) {
        return {
            category: category,
            lexeme: lexeme,
            position: DataHelper.position
        };
    }
    static instruction(opcode, modifier, amode, anumber, bmode, bnumber) {
        return [
            DataHelper.buildToken(IToken_1.TokenCategory.Opcode, opcode),
            DataHelper.buildToken(IToken_1.TokenCategory.Modifier, modifier),
            DataHelper.buildToken(IToken_1.TokenCategory.Mode, amode),
            DataHelper.buildToken(IToken_1.TokenCategory.Number, anumber.toString()),
            DataHelper.buildToken(IToken_1.TokenCategory.Comma, ","),
            DataHelper.buildToken(IToken_1.TokenCategory.Mode, bmode),
            DataHelper.buildToken(IToken_1.TokenCategory.Number, bnumber.toString()),
            DataHelper.buildToken(IToken_1.TokenCategory.EOL, "\n")
        ];
    }
    static buildWarrior() {
        return {
            author: "",
            name: "",
            startAddress: 0,
            strategy: "",
            taskIndex: 0,
            tasks: []
        };
    }
    static buildTask() {
        return {
            warrior: null,
            instructionPointer: 0
        };
    }
    static buildInstruction(address, opcode, modifier, amode, aaddress, bmode, baddress) {
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
DataHelper.position = {
    line: 1,
    char: 1
};
exports.default = DataHelper;
