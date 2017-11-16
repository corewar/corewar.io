"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="references.ts" />
const IToken_1 = require("../Interface/IToken");
const Context_1 = require("../Context");
const Parser_1 = require("../Parser");
const ForPass_1 = require("../ForPass");
const Expression_1 = require("../Expression");
const IMessage_1 = require("../Interface/IMessage");
const TestHelper_1 = require("./TestHelper");
"use strict";
describe("ForPass", () => {
    it("Inserts for instruction into token stream the requested number of times", () => {
        var instruction = TestHelper_1.TestHelper.instruction(2, "label", "MOV", ".AB", "#", "0", ",", "$", "1", "; comment");
        var expression = new Expression_1.Expression();
        spyOn(expression, "parse").and.returnValue(3);
        var tokens = TestHelper_1.TestHelper.forStatement(1, instruction);
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new ForPass_1.ForPass(expression);
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.tokens.length).toBe(instruction.length * 3);
        for (var i = 0; i < instruction.length * 3; i++) {
            expect(actual.tokens[i].lexeme).toBe(instruction[i % instruction.length].lexeme);
        }
    });
    it("Inserts multiple instructions", () => {
        var instruction1 = TestHelper_1.TestHelper.instruction(2, "label", "MOV", ".AB", "#", "0", ",", "$", "1", "; comment");
        var instruction2 = TestHelper_1.TestHelper.instruction(3, "", "ADD", ".X", "@", "1", ",", "", "2", "");
        var expected = instruction1.concat(instruction2);
        var expression = new Expression_1.Expression();
        spyOn(expression, "parse").and.returnValue(1);
        var tokens = TestHelper_1.TestHelper.forStatement(1, expected);
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new ForPass_1.ForPass(expression);
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.tokens.length).toBe(expected.length);
        for (var i = 0; i < expected.length; i++) {
            expect(actual.tokens[i].lexeme).toBe(expected[i].lexeme);
        }
    });
    it("Raises a syntax error if the FOR loop is not terminated by a ROF preprocessor command", () => {
        var instruction = TestHelper_1.TestHelper.instruction(2, "label", "MOV", ".AB", "#", "0", ",", "$", "1", "; comment");
        var expression = new Expression_1.Expression();
        spyOn(expression, "parse").and.returnValue(3);
        var tokens = TestHelper_1.TestHelper.forStatement(1, instruction);
        tokens.pop(); // Remove EOL
        tokens.pop(); // Remove ROF
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new ForPass_1.ForPass(expression);
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(1);
        expect(actual.messages[0].text).toBe("Expected 'ROF', got end of file");
        expect(actual.messages[0].type).toBe(IMessage_1.MessageType.Error);
        expect(actual.messages[0].position).toEqual({ line: 2, char: 9 });
    });
    it("Allows a comment to follow the for and rof lines", () => {
        var tokens = [
            {
                category: IToken_1.TokenCategory.Preprocessor,
                lexeme: "FOR",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Number,
                lexeme: "1",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Comment,
                lexeme: "; this is a comment",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 1 }
            },
            {
                category: IToken_1.TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Number,
                lexeme: "0",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Comma,
                lexeme: ",",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Number,
                lexeme: "1",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 1 }
            },
            {
                category: IToken_1.TokenCategory.Preprocessor,
                lexeme: "ROF",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Comment,
                lexeme: "; this is another comment",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 1 }
            }
        ];
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new ForPass_1.ForPass(new Expression_1.Expression());
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(0);
    });
});
