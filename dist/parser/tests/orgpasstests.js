"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="references.ts" />
const TestHelper_1 = require("./TestHelper");
const Context_1 = require("..//Context");
const OrgPass_1 = require("../OrgPass");
const Parser_1 = require("../Parser");
const IMessage_1 = require("../Interface/IMessage");
const IToken_1 = require("../Interface/IToken");
const IParseOptions_1 = require("../Interface/IParseOptions");
const _ = require("underscore");
"use strict";
describe("OrgPass", () => {
    it("Makes the ORG instruction the first instruction in the output", () => {
        var tokens = TestHelper_1.TestHelper
            .comment(1, ";redcode")
            .concat(TestHelper_1.TestHelper.comment(2, ";author gareththegeek"))
            .concat(TestHelper_1.TestHelper.instruction(3, "", "MOV", "", "$", "0", "", "", "", ""))
            .concat(TestHelper_1.TestHelper.org(4, "3"));
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new OrgPass_1.OrgPass();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(0);
        expect(actual.tokens.length).toBe(11);
        expect(actual.tokens[0].lexeme).toBe(";redcode");
        expect(actual.tokens[1].lexeme).toBe("\n");
        expect(actual.tokens[2].lexeme).toBe(";author gareththegeek");
        expect(actual.tokens[3].lexeme).toBe("\n");
        expect(actual.tokens[4].lexeme).toBe("ORG");
        expect(actual.tokens[5].lexeme).toBe("3");
        expect(actual.tokens[6].lexeme).toBe("\n");
        expect(actual.tokens[7].lexeme).toBe("MOV");
        expect(actual.tokens[8].lexeme).toBe("$");
        expect(actual.tokens[9].lexeme).toBe("0");
        expect(actual.tokens[10].lexeme).toBe("\n");
    });
    it("Inserts ORG 0 if no ORG statement found", () => {
        var tokens = TestHelper_1.TestHelper
            .instruction(1, "", "MOV", "", "", "1", ",", "", "2", "")
            .concat(TestHelper_1.TestHelper.instruction(2, "", "ADD", ".F", "@", "2", ",", "", "3", ""));
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new OrgPass_1.OrgPass();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(0);
        expect(actual.tokens.length).toBe(15);
        expect(actual.tokens[0].lexeme).toBe("ORG");
        expect(actual.tokens[1].lexeme).toBe("0");
        expect(actual.tokens[2].lexeme).toBe("\n");
        expect(actual.tokens[3].lexeme).toBe("MOV");
        expect(actual.tokens[4].lexeme).toBe("1");
        expect(actual.tokens[5].lexeme).toBe(",");
        expect(actual.tokens[6].lexeme).toBe("2");
        expect(actual.tokens[7].lexeme).toBe("\n");
        expect(actual.tokens[8].lexeme).toBe("ADD");
        expect(actual.tokens[9].lexeme).toBe(".F");
        expect(actual.tokens[10].lexeme).toBe("@");
        expect(actual.tokens[11].lexeme).toBe("2");
        expect(actual.tokens[12].lexeme).toBe(",");
        expect(actual.tokens[13].lexeme).toBe("3");
        expect(actual.tokens[14].lexeme).toBe("\n");
    });
    it("Uses END address for ORG statement", () => {
        var tokens = TestHelper_1.TestHelper.instruction(1, "", "MOV", "", "", "0", ",", "", "1", "")
            .concat(TestHelper_1.TestHelper.endStatement(2, "2"));
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new OrgPass_1.OrgPass();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(0);
        expect(actual.tokens.length).toBe(8);
        expect(actual.tokens[0].lexeme).toBe("ORG");
        expect(actual.tokens[1].lexeme).toBe("2");
        expect(actual.tokens[2].lexeme).toBe("\n");
        expect(actual.tokens[3].lexeme).toBe("MOV");
        expect(actual.tokens[4].lexeme).toBe("0");
        expect(actual.tokens[5].lexeme).toBe(",");
        expect(actual.tokens[6].lexeme).toBe("1");
        expect(actual.tokens[7].lexeme).toBe("\n");
    });
    it("Raises a warning if multiple ORG instructions are found and uses latest definition", () => {
        var tokens = TestHelper_1.TestHelper.org(1, "1")
            .concat(TestHelper_1.TestHelper.org(2, "2"))
            .concat(TestHelper_1.TestHelper.org(3, "3"));
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new OrgPass_1.OrgPass();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(2);
        expect(actual.messages[0].text).toBe("Redefinition of ORG encountered, this later definition will take effect");
        expect(actual.messages[0].type).toBe(IMessage_1.MessageType.Warning);
        expect(actual.messages[0].position).toEqual({ line: 2, char: 1 });
        expect(actual.messages[1].text).toBe("Redefinition of ORG encountered, this later definition will take effect");
        expect(actual.messages[1].type).toBe(IMessage_1.MessageType.Warning);
        expect(actual.messages[1].position).toEqual({ line: 3, char: 1 });
        expect(actual.tokens.length).toBe(3);
        expect(actual.tokens[0].lexeme).toBe("ORG");
        expect(actual.tokens[1].lexeme).toBe("3");
        expect(actual.tokens[2].lexeme).toBe("\n");
    });
    it("Raises a warning if both an ORG and END ### instruction are declared and uses the ORG definition", () => {
        var tokens = TestHelper_1.TestHelper.org(1, "1")
            .concat(TestHelper_1.TestHelper.endStatement(2, "2"));
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new OrgPass_1.OrgPass();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(1);
        expect(actual.messages[0].text).toBe("Encountered both ORG and END address, the ORG definition will take effect");
        expect(actual.messages[0].type).toBe(IMessage_1.MessageType.Warning);
        expect(actual.messages[0].position).toEqual({ line: 2, char: 1 });
        expect(actual.tokens.length).toBe(3);
        expect(actual.tokens[0].lexeme).toBe("ORG");
        expect(actual.tokens[1].lexeme).toBe("1");
        expect(actual.tokens[2].lexeme).toBe("\n");
    });
    it("Raises a syntax error if ORG statement does not contain an address", () => {
        var tokens = [
            {
                category: IToken_1.TokenCategory.Preprocessor,
                lexeme: "ORG",
                position: { line: 4, char: 5 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 4, char: 6 }
            },
        ];
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new OrgPass_1.OrgPass();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(1);
        expect(actual.messages[0].text).toBe("Expected number, got end of line");
        expect(actual.messages[0].type).toBe(IMessage_1.MessageType.Error);
        expect(actual.messages[0].position).toEqual({ line: 4, char: 6 });
    });
    it("Raises a syntax error if ORG statement contains additional tokens before the end of line", () => {
        var tokens = [
            {
                category: IToken_1.TokenCategory.Preprocessor,
                lexeme: "ORG",
                position: { line: 4, char: 5 }
            }, {
                category: IToken_1.TokenCategory.Number,
                lexeme: "6",
                position: { line: 4, char: 6 }
            }, {
                category: IToken_1.TokenCategory.Comment,
                lexeme: "; blah blah blah",
                position: { line: 4, char: 7 }
            }, {
                category: IToken_1.TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 4, char: 8 }
            }
        ];
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new OrgPass_1.OrgPass();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(1);
        expect(actual.messages[0].text).toBe("Expected end of line, got 'MOV'");
        expect(actual.messages[0].type).toBe(IMessage_1.MessageType.Error);
        expect(actual.messages[0].position).toEqual({ line: 4, char: 8 });
    });
    it("Raises a syntax error if END statement contains additional tokens before the end of line", () => {
        var tokens = [
            {
                category: IToken_1.TokenCategory.Preprocessor,
                lexeme: "END",
                position: { line: 4, char: 5 }
            }, {
                category: IToken_1.TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 4, char: 8 }
            }
        ];
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new OrgPass_1.OrgPass();
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(1);
        expect(actual.messages[0].text).toBe("Expected end of line, got 'MOV'");
        expect(actual.messages[0].type).toBe(IMessage_1.MessageType.Error);
        expect(actual.messages[0].position).toEqual({ line: 4, char: 8 });
    });
    it("Uses start label as default END address under ICWS'86 standard", () => {
        var tokens = TestHelper_1.TestHelper.instruction(1, "", "MOV", "", "", "0", ",", "", "1", "")
            .concat(TestHelper_1.TestHelper.instruction(2, "", "MOV", "", "", "0", ",", "", "1", ""))
            .concat(TestHelper_1.TestHelper.endStatement(3, ""));
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        context.labels["start"] = 1;
        var pass = new OrgPass_1.OrgPass();
        var actual = pass.process(context, _.defaults({ standard: IParseOptions_1.Standard.ICWS86 }, Parser_1.Parser.DefaultOptions));
        expect(actual.tokens[0].lexeme).toBe("ORG");
        expect(actual.tokens[1].lexeme).toBe("1");
    });
});
