import { expect } from "chai";

import { Context } from "../Context";
import { IToken, TokenCategory } from "../interface/IToken";
import { Parser } from "../Parser";
import { PreprocessAnalyser } from "../PreprocessAnalyser";
import { MessageType } from "../interface/IMessage";

"use strict";

describe("PreprocessorAnalyser",() => {

    it("Does not modify the token stream",() => {

        var context = new Context();

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

        context.tokens = tokens.slice();

        var pass = new PreprocessAnalyser();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).to.be.equal(10);
        expect(actual.messages.length).to.be.equal(0);

        for (var i = 0; i < tokens.length; i++) {
            expect(tokens[i]).to.deep.equal(actual.tokens[i]);
        }
    });

    it("Resolves references between EQU statements",() => {

        var context = new Context();
        context.equs["label1"] = [
            {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Label,
                lexeme: "label2",
                position: { line: 1, char: 2 }
            }
        ];
        context.equs["label2"] = [
            {
                category: TokenCategory.Number,
                lexeme: "86",
                position: { line: 2, char: 1 }
            }
        ];

        var pass = new PreprocessAnalyser();
        var actual = pass.process(context, Parser.DefaultOptions);

        var label1 = actual.equs["label1"];
        var label2 = actual.equs["label2"];

        expect(label1.length).to.be.equal(2);
        expect(label1[0].lexeme).to.be.equal("MOV");
        expect(label1[1].lexeme).to.be.equal("86");

        expect(label2.length).to.be.equal(1);
        expect(label2[0].lexeme).to.be.equal("86");
    });

    it("Raises an error if a circular reference is detected",() => {

        var context = new Context();
        context.equs["label1"] = [
            {
                category: TokenCategory.Label,
                lexeme: "label2",
                position: { line: 1, char: 2 }
            }
        ];
        context.equs["label2"] = [
            {
                category: TokenCategory.Label,
                lexeme: "label3",
                position: { line: 2, char: 1 }
            }
        ];
        context.equs["label3"] = [
            {
                category: TokenCategory.Label,
                lexeme: "label1",
                position: { line: 3, char: 1 }
            }
        ];

        var pass = new PreprocessAnalyser();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(3);

        expect(actual.messages[0].text).to.be.equal("Circular reference detected in 'label1' EQU statement");
        expect(actual.messages[0].type).to.be.equal(MessageType.Error);

        expect(actual.messages[1].text).to.be.equal("Circular reference detected in 'label2' EQU statement");
        expect(actual.messages[1].type).to.be.equal(MessageType.Error);

        expect(actual.messages[2].text).to.be.equal("Circular reference detected in 'label3' EQU statement");
        expect(actual.messages[2].type).to.be.equal(MessageType.Error);
    });

    it("Ignores undeclared labels",() => {

        var context = new Context();
        context.equs["label1"] = [
            {
                category: TokenCategory.Label,
                lexeme: "label2",
                position: { line: 1, char: 1 }
            }
        ];

        var pass = new PreprocessAnalyser();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(0);
    });

    it("Does not identify a circular references when an equ refers to another via two paths",() => {

        var context = new Context();

        context.equs["a"] = [
            {
                category: TokenCategory.Number,
                lexeme: "1",
                position: { line: 1, char: 1 }
            }
        ];

        context.equs["b"] = [
            {
                category: TokenCategory.Label,
                lexeme: "a",
                position: { line: 1, char: 1 }
            }
        ];

        context.equs["c"] = [
            {
                category: TokenCategory.Label,
                lexeme: "a",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Maths,
                lexeme: "+",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Label,
                lexeme: "b",
                position: { line: 1, char: 1 }
            }
        ];

        var pass = new PreprocessAnalyser();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(0);
    });
});
