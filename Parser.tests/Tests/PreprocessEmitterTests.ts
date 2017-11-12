/// <reference path="../references.ts" />
import { Context } from "./../../Corewar/Parser/Context";
import { IToken, TokenCategory } from "./../../Corewar/Parser/Interface/IToken";
import { Parser } from "./../../Corewar/Parser/Parser";
import { PreprocessEmitter } from "./../../Corewar/Parser/PreprocessEmitter";
import { MessageType } from "./../../Corewar/Parser/Interface/IMessage";

"use strict";

describe("PreprocessEmitter", () => {

    it("Does not modify tokens if no labels are found which have been declared as EQUs", () => {

        var context = new Context();
        context.equs["SomeRandomLabel"] = [
            {
                category: TokenCategory.Maths,
                position: { line: 1, char: 1 },
                lexeme: "*"
            }
        ];

        var tokens: IToken[] = [
            {
                category: TokenCategory.Comma,
                position: { line: 1, char: 1 },
                lexeme: ","
            }, {
                category: TokenCategory.Comment,
                position: { line: 1, char: 1 },
                lexeme: "; thsifdsakl dsj sdkljf s"
            }, {
                category: TokenCategory.EOL,
                position: { line: 1, char: 1 },
                lexeme: "\n"
            }, {
                category: TokenCategory.Label,
                position: { line: 1, char: 1 },
                lexeme: "label123"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 1 },
                lexeme: "+"
            }, {
                category: TokenCategory.Mode,
                position: { line: 1, char: 1 },
                lexeme: "#"
            }, {
                category: TokenCategory.Modifier,
                position: { line: 1, char: 1 },
                lexeme: ".I"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 1 },
                lexeme: "7"
            }, {
                category: TokenCategory.Opcode,
                position: { line: 1, char: 1 },
                lexeme: "MOV"
            }, {
                category: TokenCategory.Unknown,
                position: { line: 1, char: 1 },
                lexeme: "."
            }
        ];

        context.tokens = tokens;

        var pass = new PreprocessEmitter();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).toBe(10);
        expect(actual.messages.length).toBe(0);

        for (var i = 0; i < tokens.length; i++) {
            expect(tokens[i]).toEqual(actual.tokens[i]);
        }
    });

    it("Substitutes labels with their predefined EQU substitute", () => {

        var label1expression: IToken[] = [
            {
                category: TokenCategory.Number,
                lexeme: "1",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Comma,
                lexeme: ",",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Number,
                lexeme: "2",
                position: { line: 1, char: 1 }
            }
        ];

        var tokens: IToken[] = [
            {
                category: TokenCategory.Opcode,
                lexeme: "ADD",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Label,
                lexeme: "label1",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 1 }
            }
        ];

        var context = new Context();
        context.equs["label1"] = label1expression.slice();
        context.tokens = tokens.slice();

        var pass = new PreprocessEmitter();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).toBe(5);

        expect(actual.tokens[0]).toEqual(tokens[0]);
        expect(actual.tokens[1]).toEqual(label1expression[0]);
        expect(actual.tokens[2]).toEqual(label1expression[1]);
        expect(actual.tokens[3]).toEqual(label1expression[2]);
        expect(actual.tokens[4]).toEqual(tokens[2]);
    });

    it("Is capable of making multiple substitutions", () => {

        var label1expression: IToken[] = [
            {
                category: TokenCategory.Number,
                lexeme: "1",
                position: { line: 1, char: 1 }
            }
        ];

        var label2expression: IToken[] = [
            {
                category: TokenCategory.Number,
                lexeme: "2",
                position: { line: 1, char: 1 }
            }
        ];

        var tokens: IToken[] = [
            {
                category: TokenCategory.Label,
                lexeme: "label2",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Label,
                lexeme: "label1",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Label,
                lexeme: "label1",
                position: { line: 1, char: 1 }
            }
        ];

        var context = new Context();
        context.equs["label1"] = label1expression.slice();
        context.equs["label2"] = label2expression.slice();
        context.tokens = tokens.slice();

        var pass = new PreprocessEmitter();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).toBe(3);

        expect(actual.tokens[0]).toEqual(label2expression[0]);
        expect(actual.tokens[1]).toEqual(label1expression[0]);
        expect(actual.tokens[2]).toEqual(label1expression[0]);
    });

    it("Updates the position of substituted tokens to match position of label that was replaced", () => {

        var label1expression: IToken[] = [
            {
                category: TokenCategory.Number,
                lexeme: "1",
                position: { line: 1, char: 4 }
            }, {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 5 }
            },
        ];

        var label2expression: IToken[] = [
            {
                category: TokenCategory.Number,
                lexeme: "2",
                position: { line: 2, char: 4 }
            }
        ];

        var tokens: IToken[] = [
            {
                category: TokenCategory.Label,
                lexeme: "label2",
                position: { line: 3, char: 4 }
            }, {
                category: TokenCategory.Label,
                lexeme: "label1",
                position: { line: 5, char: 5 }
            }, {
                category: TokenCategory.Label,
                lexeme: "label1",
                position: { line: 6, char: 4 }
            }
        ];

        var context = new Context();
        context.equs["label1"] = label1expression.slice();
        context.equs["label2"] = label2expression.slice();
        context.tokens = tokens.slice();

        var pass = new PreprocessEmitter();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).toBe(5);

        expect(actual.tokens[0].position).toEqual({ line: 3, char: 4 });

        expect(actual.tokens[1].position).toEqual({ line: 5, char: 5 });
        expect(actual.tokens[2].position).toEqual({ line: 5, char: 5 });

        expect(actual.tokens[3].position).toEqual({ line: 6, char: 4 });
        expect(actual.tokens[4].position).toEqual({ line: 6, char: 4 });
    });
});
