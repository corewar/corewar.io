import { IToken, TokenCategory } from "../interface/IToken";
import * as _ from "underscore";

"use strict";

export class TestHelper {

    public static instruction(
        line: number,
        label: string,
        opcode: string,
        modifier: string,
        aMode: string,
        aAddress: string,
        comma: string,
        bMode: string,
        bAddress: string,
        comment: string): IToken[] {

        var result: IToken[] = [];
        var category: TokenCategory;

        if (label !== "") {
            result.push({
                category: TokenCategory.Label,
                lexeme: label,
                position: { line: line, char: 0 }
            });
        }

        if (opcode !== "") {
            result.push({
                category: TokenCategory.Opcode,
                lexeme: opcode,
                position: { line: line, char: 1 }
            });
        }

        if (modifier !== "") {
            result.push({
                category: TokenCategory.Modifier,
                lexeme: modifier,
                position: { line: line, char: 2 }
            });
        }

        if (aMode !== "") {
            result.push({
                category: TokenCategory.Mode,
                lexeme: aMode,
                position: { line: line, char: 3 }
            });
        }

        if (aAddress !== "") {

            category = TokenCategory.Label;
            if (_.contains(["-", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], aAddress[0])) {
                category = TokenCategory.Number;
            }

            result.push({
                category: category,
                lexeme: aAddress,
                position: { line: line, char: 4 }
            });
        }

        if (comma !== "") {
            result.push({
                category: TokenCategory.Comma,
                lexeme: comma,
                position: { line: line, char: 5 }
            });
        }

        if (bMode !== "") {
            result.push({
                category: TokenCategory.Mode,
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
                category: TokenCategory.Comment,
                lexeme: comment,
                position: { line: line, char: 8 }
            });
        }

        result.push({
            category: TokenCategory.EOL,
            lexeme: "\n",
            position: { line: line, char: 9 }
        });

        return result;
    }

    public static comment(line: number, comment: string): IToken[] {

        return [
            {
                category: TokenCategory.Comment,
                lexeme: comment,
                position: { line: line, char: 1 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: line, char: 2 }
            }
        ];
    }

    public static emptyLine(line: number): IToken[] {

        return [
            {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: line, char: 1 }
            }
        ];
    }

    public static endStatement(line: number, label: string, comment?: string): IToken[] {

        var result: IToken[] = [];

        result.push({
            category: TokenCategory.Preprocessor,
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

        if (comment) {
            result.push({
                category: TokenCategory.Comment,
                lexeme: comment,
                position: { line: line, char: 1 }
            })
        }

        result.push({
            category: TokenCategory.EOL,
            lexeme: "\n",
            position: { line: line, char: 1 }
        });

        return result;
    }

    public static equ(line: number, label: string, expression: IToken[]): IToken[] {

        var result: IToken[] = [];

        if (label !== "") {
            result.push({
                category: TokenCategory.Label,
                lexeme: label,
                position: { line: line, char: 1 }
            });
        }

        result.push({
            category: TokenCategory.Preprocessor,
            lexeme: "EQU",
            position: { line: line, char: 2 }
        });

        result = result.concat(expression).concat([
            {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: line, char: 15 }
            }
        ]);

        return result;
    }

    public static org(line: number, address: string): IToken[] {

        var category = TestHelper.getCategory(address);

        return [
            {
                category: TokenCategory.Preprocessor,
                lexeme: "ORG",
                position: { line: line, char: 1 }
            }, {
                category: category,
                lexeme: address,
                position: { line: line, char: 2 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: line, char: 3 }
            }
        ];
    }

    public static forStatement(line: number, statement: IToken[]): IToken[] {

        var forline = [
            {
                category: TokenCategory.Preprocessor,
                lexeme: "FOR",
                position: { line: line, char: 1 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: line, char: 3 }
            }
        ];

        var rofLine = [
            {
                category: TokenCategory.Preprocessor,
                lexeme: "ROF",
                position: { line: line + 2, char: 1 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: line + 2, char: 3 }
            }
        ];

        return forline.concat(statement).concat(rofLine);
    }

    private static getCategory(lexeme: string): TokenCategory {

        var category = TokenCategory.Label;
        if (_.contains(["-", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], lexeme[0])) {
            category = TokenCategory.Number;
        }

        return category;
    }
}