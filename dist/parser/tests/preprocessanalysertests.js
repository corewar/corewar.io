"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="references.ts" />
const Context_1 = require("../Context");
const IToken_1 = require("../Interface/IToken");
const Parser_1 = require("../Parser");
const PreprocessAnalyser_1 = require("../PreprocessAnalyser");
const IMessage_1 = require("../Interface/IMessage");
"use strict";
describe("PreprocessorAnalyser", () => {
    it("Does not modify the token stream", () => {
        var context = new Context_1.Context();
        var tokens = [
            {
                category: IToken_1.TokenCategory.Comma,
                position: { line: 1, char: 1 },
                lexeme: ","
            }, {
                category: IToken_1.TokenCategory.Comment,
                position: { line: 1, char: 1 },
                lexeme: "; thsifdsakl dsj sdkljf s"
            }, {
                category: IToken_1.TokenCategory.EOL,
                position: { line: 1, char: 1 },
                lexeme: "\n"
            }, {
                category: IToken_1.TokenCategory.Label,
                position: { line: 1, char: 1 },
                lexeme: "label123"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 1 },
                lexeme: "+"
            }, {
                category: IToken_1.TokenCategory.Mode,
                position: { line: 1, char: 1 },
                lexeme: "#"
            }, {
                category: IToken_1.TokenCategory.Modifier,
                position: { line: 1, char: 1 },
                lexeme: ".I"
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 1 },
                lexeme: "7"
            }, {
                category: IToken_1.TokenCategory.Opcode,
                position: { line: 1, char: 1 },
                lexeme: "MOV"
            }, {
                category: IToken_1.TokenCategory.Unknown,
                position: { line: 1, char: 1 },
                lexeme: "."
            }
        ];
        context.tokens = tokens.slice();
        var pass = new PreprocessAnalyser_1.PreprocessAnalyser();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.tokens.length).toBe(10);
        expect(actual.messages.length).toBe(0);
        for (var i = 0; i < tokens.length; i++) {
            expect(tokens[i]).toEqual(actual.tokens[i]);
        }
    });
    it("Resolves references between EQU statements", () => {
        var context = new Context_1.Context();
        context.equs["label1"] = [
            {
                category: IToken_1.TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Label,
                lexeme: "label2",
                position: { line: 1, char: 2 }
            }
        ];
        context.equs["label2"] = [
            {
                category: IToken_1.TokenCategory.Number,
                lexeme: "86",
                position: { line: 2, char: 1 }
            }
        ];
        var pass = new PreprocessAnalyser_1.PreprocessAnalyser();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        var label1 = actual.equs["label1"];
        var label2 = actual.equs["label2"];
        expect(label1.length).toBe(2);
        expect(label1[0].lexeme).toBe("MOV");
        expect(label1[1].lexeme).toBe("86");
        expect(label2.length).toBe(1);
        expect(label2[0].lexeme).toBe("86");
    });
    it("Raises an error if a circular reference is detected", () => {
        var context = new Context_1.Context();
        context.equs["label1"] = [
            {
                category: IToken_1.TokenCategory.Label,
                lexeme: "label2",
                position: { line: 1, char: 2 }
            }
        ];
        context.equs["label2"] = [
            {
                category: IToken_1.TokenCategory.Label,
                lexeme: "label3",
                position: { line: 2, char: 1 }
            }
        ];
        context.equs["label3"] = [
            {
                category: IToken_1.TokenCategory.Label,
                lexeme: "label1",
                position: { line: 3, char: 1 }
            }
        ];
        var pass = new PreprocessAnalyser_1.PreprocessAnalyser();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(3);
        expect(actual.messages[0].text).toBe("Circular reference detected in 'label1' EQU statement");
        expect(actual.messages[0].type).toBe(IMessage_1.MessageType.Error);
        expect(actual.messages[1].text).toBe("Circular reference detected in 'label2' EQU statement");
        expect(actual.messages[1].type).toBe(IMessage_1.MessageType.Error);
        expect(actual.messages[2].text).toBe("Circular reference detected in 'label3' EQU statement");
        expect(actual.messages[2].type).toBe(IMessage_1.MessageType.Error);
    });
    it("Ignores undeclared labels", () => {
        var context = new Context_1.Context();
        context.equs["label1"] = [
            {
                category: IToken_1.TokenCategory.Label,
                lexeme: "label2",
                position: { line: 1, char: 1 }
            }
        ];
        var pass = new PreprocessAnalyser_1.PreprocessAnalyser();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(0);
    });
    it("Does not identify a circular references when an equ refers to another via two paths", () => {
        var context = new Context_1.Context();
        context.equs["a"] = [
            {
                category: IToken_1.TokenCategory.Number,
                lexeme: "1",
                position: { line: 1, char: 1 }
            }
        ];
        context.equs["b"] = [
            {
                category: IToken_1.TokenCategory.Label,
                lexeme: "a",
                position: { line: 1, char: 1 }
            }
        ];
        context.equs["c"] = [
            {
                category: IToken_1.TokenCategory.Label,
                lexeme: "a",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Maths,
                lexeme: "+",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Label,
                lexeme: "b",
                position: { line: 1, char: 1 }
            }
        ];
        var pass = new PreprocessAnalyser_1.PreprocessAnalyser();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(0);
    });
});
