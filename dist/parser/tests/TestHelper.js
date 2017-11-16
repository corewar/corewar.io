"use strict";
/// <reference path="references.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const IToken_1 = require("../interface/IToken");
const _ = require("underscore");
"use strict";
class TestHelper {
    static instruction(line, label, opcode, modifier, aMode, aAddress, comma, bMode, bAddress, comment) {
        var result = [];
        var category;
        if (label !== "") {
            result.push({
                category: IToken_1.TokenCategory.Label,
                lexeme: label,
                position: { line: line, char: 0 }
            });
        }
        if (opcode !== "") {
            result.push({
                category: IToken_1.TokenCategory.Opcode,
                lexeme: opcode,
                position: { line: line, char: 1 }
            });
        }
        if (modifier !== "") {
            result.push({
                category: IToken_1.TokenCategory.Modifier,
                lexeme: modifier,
                position: { line: line, char: 2 }
            });
        }
        if (aMode !== "") {
            result.push({
                category: IToken_1.TokenCategory.Mode,
                lexeme: aMode,
                position: { line: line, char: 3 }
            });
        }
        if (aAddress !== "") {
            category = IToken_1.TokenCategory.Label;
            if (_.contains(["-", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], aAddress[0])) {
                category = IToken_1.TokenCategory.Number;
            }
            result.push({
                category: category,
                lexeme: aAddress,
                position: { line: line, char: 4 }
            });
        }
        if (comma !== "") {
            result.push({
                category: IToken_1.TokenCategory.Comma,
                lexeme: comma,
                position: { line: line, char: 5 }
            });
        }
        if (bMode !== "") {
            result.push({
                category: IToken_1.TokenCategory.Mode,
                lexeme: bMode,
                position: { line: line, char: 6 }
            });
        }
        if (bAddress !== "") {
            category = TestHelper.getCategory(bAddress);
            result.push({
                category: category,
                lexeme: bAddress,
                position: { line: line, char: 7 }
            });
        }
        if (comment !== "") {
            result.push({
                category: IToken_1.TokenCategory.Comment,
                lexeme: comment,
                position: { line: line, char: 8 }
            });
        }
        result.push({
            category: IToken_1.TokenCategory.EOL,
            lexeme: "\n",
            position: { line: line, char: 9 }
        });
        return result;
    }
    static comment(line, comment) {
        return [
            {
                category: IToken_1.TokenCategory.Comment,
                lexeme: comment,
                position: { line: line, char: 1 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: line, char: 2 }
            }
        ];
    }
    static emptyLine(line) {
        return [
            {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: line, char: 1 }
            }
        ];
    }
    static endStatement(line, label) {
        var result = [];
        result.push({
            category: IToken_1.TokenCategory.Preprocessor,
            lexeme: "END",
            position: { line: line, char: 1 }
        });
        if (label !== "") {
            var category = this.getCategory(label);
            result.push({
                category: category,
                lexeme: label,
                position: { line: line, char: 1 }
            });
        }
        result.push({
            category: IToken_1.TokenCategory.EOL,
            lexeme: "\n",
            position: { line: line, char: 1 }
        });
        return result;
    }
    static equ(line, label, expression) {
        var result = [];
        if (label !== "") {
            result.push({
                category: IToken_1.TokenCategory.Label,
                lexeme: label,
                position: { line: line, char: 1 }
            });
        }
        result.push({
            category: IToken_1.TokenCategory.Preprocessor,
            lexeme: "EQU",
            position: { line: line, char: 2 }
        });
        result = result.concat(expression).concat([
            {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: line, char: 15 }
            }
        ]);
        return result;
    }
    static org(line, address) {
        var category = TestHelper.getCategory(address);
        return [
            {
                category: IToken_1.TokenCategory.Preprocessor,
                lexeme: "ORG",
                position: { line: line, char: 1 }
            }, {
                category: category,
                lexeme: address,
                position: { line: line, char: 2 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: line, char: 3 }
            }
        ];
    }
    static forStatement(line, statement) {
        var forline = [
            {
                category: IToken_1.TokenCategory.Preprocessor,
                lexeme: "FOR",
                position: { line: line, char: 1 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: line, char: 3 }
            }
        ];
        var rofLine = [
            {
                category: IToken_1.TokenCategory.Preprocessor,
                lexeme: "ROF",
                position: { line: line + 2, char: 1 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: line + 2, char: 3 }
            }
        ];
        return forline.concat(statement).concat(rofLine);
    }
    static getCategory(lexeme) {
        var category = IToken_1.TokenCategory.Label;
        if (_.contains(["-", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], lexeme[0])) {
            category = IToken_1.TokenCategory.Number;
        }
        return category;
    }
}
exports.TestHelper = TestHelper;
