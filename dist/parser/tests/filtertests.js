"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="references.ts" />
const IToken_1 = require("../Interface/IToken");
const Context_1 = require("../Context");
const Parser_1 = require("../Parser");
const Filter_1 = require("../Filter");
const TestHelper_1 = require("./TestHelper");
"use strict";
describe("Filter", () => {
    it("Does not modify tokens if no empty lines or END found", () => {
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
        var pass = new Filter_1.Filter();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.tokens.length).toBe(10);
        expect(actual.messages.length).toBe(0);
        for (var i = 0; i < tokens.length; i++) {
            expect(tokens[i]).toEqual(actual.tokens[i]);
        }
    });
    it("Removes empty lines from the output", () => {
        var line1 = TestHelper_1.TestHelper.instruction(1, "", "MOV", "", "", "1", ",", "", "2", "");
        var line2 = TestHelper_1.TestHelper.emptyLine(2);
        var line3 = TestHelper_1.TestHelper.instruction(3, "", "ADD", ".BA", "#", "7", "", "", "", "");
        var expected = line1.concat(line3);
        var context = new Context_1.Context();
        context.tokens = line1.concat(line2).concat(line3);
        var pass = new Filter_1.Filter();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.tokens.length).toBe(expected.length);
        expect(actual.messages.length).toBe(0);
        for (var i = 0; i < expected.length; i++) {
            expect(actual.tokens[i]).toEqual(expected[i]);
        }
    });
    it("Removes everything after the END statement from the output", () => {
        var line1 = TestHelper_1.TestHelper.instruction(1, "", "MOV", "", "", "1", ",", "", "2", "");
        var line2 = TestHelper_1.TestHelper.endStatement(2, "alabel");
        var line3 = TestHelper_1.TestHelper.instruction(3, "", "ADD", ".BA", "#", "7", "", "", "", "");
        var expected = line1.concat(line2);
        var context = new Context_1.Context();
        context.tokens = line1.concat(line2).concat(line3);
        var pass = new Filter_1.Filter();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.tokens.length).toBe(expected.length);
        expect(actual.messages.length).toBe(0);
        for (var i = 0; i < expected.length; i++) {
            expect(actual.tokens[i]).toEqual(expected[i]);
        }
    });
});
