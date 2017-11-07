/// <reference path="../references.ts" />
/* tslint:disable */

"use strict";

describe("OrgPass",() => {

    it("Makes the ORG instruction the first instruction in the output",() => {

        var tokens = TestHelper
            .comment(1, ";redcode")
            .concat(TestHelper.comment(2, ";author gareththegeek"))
            .concat(TestHelper.instruction(3, "", "MOV", "", "$", "0", "", "", "", ""))
            .concat(TestHelper.org(4, "3"));

        var context = new Context();
        context.tokens = tokens.slice();
           
        var pass = new OrgPass();
        var actual = pass.process(context, Parser.DefaultOptions);

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

    it("Inserts ORG 0 if no ORG statement found",() => {

        var tokens = TestHelper
            .instruction(1, "", "MOV", "", "", "1", ",", "", "2", "")
            .concat(TestHelper.instruction(2, "", "ADD", ".F", "@", "2", ",", "", "3", ""));

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new OrgPass();
        var actual = pass.process(context, Parser.DefaultOptions);

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

    it("Uses END address for ORG statement",() => {

        var tokens = TestHelper.instruction(1, "", "MOV", "", "", "0", ",", "", "1", "")
            .concat(TestHelper.endStatement(2, "2"));

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new OrgPass();
        var actual = pass.process(context, Parser.DefaultOptions);

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

    it("Raises a warning if multiple ORG instructions are found and uses latest definition",() => {

        var tokens = TestHelper.org(1, "1")
            .concat(TestHelper.org(2, "2"))
            .concat(TestHelper.org(3, "3"));

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new OrgPass();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).toBe(2);

        expect(actual.messages[0].text).toBe("Redefinition of ORG encountered, this later definition will take effect");
        expect(actual.messages[0].type).toBe(MessageType.Warning);
        expect(actual.messages[0].position).toEqual({ line: 2, char: 1 });

        expect(actual.messages[1].text).toBe("Redefinition of ORG encountered, this later definition will take effect");
        expect(actual.messages[1].type).toBe(MessageType.Warning);
        expect(actual.messages[1].position).toEqual({ line: 3, char: 1 });

        expect(actual.tokens.length).toBe(3);

        expect(actual.tokens[0].lexeme).toBe("ORG");
        expect(actual.tokens[1].lexeme).toBe("3");
        expect(actual.tokens[2].lexeme).toBe("\n");
    });

    it("Raises a warning if both an ORG and END ### instruction are declared and uses the ORG definition",() => {

        var tokens = TestHelper.org(1, "1")
            .concat(TestHelper.endStatement(2, "2"));

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new OrgPass();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).toBe(1);

        expect(actual.messages[0].text).toBe("Encountered both ORG and END address, the ORG definition will take effect");
        expect(actual.messages[0].type).toBe(MessageType.Warning);
        expect(actual.messages[0].position).toEqual({ line: 2, char: 1 });

        expect(actual.tokens.length).toBe(3);

        expect(actual.tokens[0].lexeme).toBe("ORG");
        expect(actual.tokens[1].lexeme).toBe("1");
        expect(actual.tokens[2].lexeme).toBe("\n");
    });

    it("Raises a syntax error if ORG statement does not contain an address",() => {

        var tokens: IToken[] = [
            {
                category: TokenCategory.Preprocessor,
                lexeme: "ORG",
                position: { line: 4, char: 5 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 4, char: 6 }
            },
        ];

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new OrgPass();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).toBe(1);

        expect(actual.messages[0].text).toBe("Expected number, got end of line");
        expect(actual.messages[0].type).toBe(MessageType.Error);
        expect(actual.messages[0].position).toEqual({ line: 4, char: 6 });
    });

    it("Raises a syntax error if ORG statement contains additional tokens before the end of line",() => {

        var tokens: IToken[] = [
            {
                category: TokenCategory.Preprocessor,
                lexeme: "ORG",
                position: { line: 4, char: 5 }
            }, {
                category: TokenCategory.Number,
                lexeme: "6",
                position: { line: 4, char: 6 }
            }, {
                category: TokenCategory.Comment,
                lexeme: "; blah blah blah",
                position: { line: 4, char: 7 }
            }, {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 4, char: 8 }
            }
        ];

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new OrgPass();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).toBe(1);

        expect(actual.messages[0].text).toBe("Expected end of line, got 'MOV'");
        expect(actual.messages[0].type).toBe(MessageType.Error);
        expect(actual.messages[0].position).toEqual({ line: 4, char: 8 });
    });

    it("Raises a syntax error if END statement contains additional tokens before the end of line",() => {

        var tokens: IToken[] = [
            {
                category: TokenCategory.Preprocessor,
                lexeme: "END",
                position: { line: 4, char: 5 }
            }, {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 4, char: 8 }
            }
        ];

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new OrgPass();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).toBe(1);

        expect(actual.messages[0].text).toBe("Expected end of line, got 'MOV'");
        expect(actual.messages[0].type).toBe(MessageType.Error);
        expect(actual.messages[0].position).toEqual({ line: 4, char: 8 });
    });

    it("Uses start label as default END address under ICWS'86 standard",() => {

        var tokens = TestHelper.instruction(1, "", "MOV", "", "", "0", ",", "", "1", "")
            .concat(TestHelper.instruction(2, "", "MOV", "", "", "0", ",", "", "1", ""))
            .concat(TestHelper.endStatement(3, ""));

        var context = new Context();
        context.tokens = tokens.slice();

        context.labels["start"] = 1;

        var pass = new OrgPass();
        var actual = pass.process(context, _.defaults({ standard: Standard.ICWS86 }, Parser.DefaultOptions));

        expect(actual.tokens[0].lexeme).toBe("ORG");
        expect(actual.tokens[1].lexeme).toBe("1");
    });
}); 
