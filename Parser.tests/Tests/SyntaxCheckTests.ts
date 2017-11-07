/// <reference path="../references.ts" />

"use strict";

describe("SyntaxCheck", () => {

    var context: IContext;

    var instructionTokens: IToken[];

    beforeEach(() => {

        context = new Context();
        instructionTokens = TestHelper.instruction(1, "", "MOV", ".AB", "#", "23", ",", "$", "45", "");
    });

    it("returns syntax errors for empty lines", () => {

        var tokens: IToken[] = TestHelper.emptyLine(1)
            .concat(TestHelper.emptyLine(2))
            .concat(TestHelper.emptyLine(3))
            .concat(TestHelper.emptyLine(4));

        context.tokens = tokens.slice();

        var parser = new SyntaxCheck();
        var actual = parser.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).toBe(4);
        expect(actual.tokens.length).toBe(0);

        expect(actual.messages[0].position).toEqual(tokens[0].position);
        expect(actual.messages[1].position).toEqual(tokens[1].position);
        expect(actual.messages[2].position).toEqual(tokens[2].position);
        expect(actual.messages[3].position).toEqual(tokens[3].position);

        _.forEach(actual.messages, (message: IMessage) => {
            expect(message.type).toBe(MessageType.Error);
            expect(message.text).toBe("Expected instruction or comment, got end of line");
        });
    });

    it("parses comments", () => {

        var tokens: IToken[] = TestHelper.comment(1, "; this is a comment")
            .concat(TestHelper.comment(2, "; this is a second comment"));

        context.tokens = tokens.slice();

        var parser = new SyntaxCheck();

        var actual = parser.process(context, Parser.DefaultOptions);
        
        expect(actual.messages.length).toBe(0);
        expect(actual.tokens.length).toBe(4);
        expect(actual.tokens[0]).toEqual(tokens[0]);
        expect(actual.tokens[2]).toEqual(tokens[2]);
    });

    it("parses instructions", () => {

        var tokens: IToken[] = instructionTokens.slice(0);

        context.tokens = tokens.slice();

        var parser = new SyntaxCheck();
        var actual = parser.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).toBe(0);

        for (var i = 0; i < context.tokens.length; i++) {
            expect(tokens[i]).toEqual(actual.tokens[i]);
        }
    });

    it("parses instructions followed by a comment", () => {

        var tokens: IToken[] = instructionTokens.slice(0);

        // Insert a comment before the final new line token
        tokens = tokens.splice(7, 0, {
            category: TokenCategory.Comment,
            lexeme: "; this is a comment",
            position: { line: 1, char: 16 }
        });

        context.tokens = tokens.slice();

        var parser = new SyntaxCheck();
        var actual = parser.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).toBe(0);

        for (var i = 0; i < context.tokens.length; i++) {
            expect(tokens[i]).toEqual(actual.tokens[i]);
        }
    });

    it("returns a syntax error if an instruction does not begin with an opcode", () => {

        var tokens: IToken[] = instructionTokens.slice(0);

        tokens[0].category = TokenCategory.Comma;
        tokens[0].lexeme = ",";

        context.tokens = tokens.slice();

        var parser = new SyntaxCheck();
        var actual = parser.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).toBe(1);

        expect(actual.messages[0].type).toBe(MessageType.Error);
        expect(actual.messages[0].position).toEqual({ line: 1, char: 1 });
        expect(actual.messages[0].text).toBe("Expected instruction or comment, got ','");
    });

    it("returns a syntax error if an opcode does not have a modifier", () => {

        var tokens: IToken[] = instructionTokens.slice(0);

        tokens[1].category = TokenCategory.Mode;
        tokens[1].lexeme = "@";

        context.tokens = tokens.slice();

        var parser = new SyntaxCheck();
        var actual = parser.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).toBe(1);

        expect(actual.messages[0].type).toBe(MessageType.Error);
        expect(actual.messages[0].position).toEqual({ line: 1, char: 2 });
        expect(actual.messages[0].text).toBe("Expected modifier, got '@'");
    });

    it("returns a syntax error if an A field does not have a mode", () => {

        var tokens: IToken[] = instructionTokens.slice(0);

        tokens[2].category = TokenCategory.Number;
        tokens[2].lexeme = "-4";

        context.tokens = tokens.slice();

        var parser = new SyntaxCheck();
        var actual = parser.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).toBe(1);

        expect(actual.messages[0].type).toBe(MessageType.Error);
        expect(actual.messages[0].position).toEqual({ line: 1, char: 3 });
        expect(actual.messages[0].text).toBe("Expected mode, got '-4'");
    });

    it("returns a syntax error if an A field does not have a number", () => {

        var tokens: IToken[] = instructionTokens.slice(0);

        tokens[3].category = TokenCategory.Comma;
        tokens[3].lexeme = ",";

        context.tokens = tokens.slice();

        var parser = new SyntaxCheck();
        var actual = parser.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).toBe(1);

        expect(actual.messages[0].type).toBe(MessageType.Error);
        expect(actual.messages[0].position).toEqual({ line: 1, char: 4 });
        expect(actual.messages[0].text).toBe("Expected number, got ','");
    });

    it("returns a syntax error if there is no comma between the A and B field", () => {

        var tokens: IToken[] = instructionTokens.slice(0);

        tokens[4].category = TokenCategory.Mode;
        tokens[4].lexeme = "<";

        context.tokens = tokens.slice();

        var parser = new SyntaxCheck();
        var actual = parser.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).toBe(1);

        expect(actual.messages[0].type).toBe(MessageType.Error);
        expect(actual.messages[0].position).toEqual({ line: 1, char: 5 });
        expect(actual.messages[0].text).toBe("Expected ',', got '<'");
    });

    it("returns a syntax error if a B field does not have a mode", () => {

        var tokens: IToken[] = instructionTokens.slice(0);

        tokens[5].category = TokenCategory.Comment;
        tokens[5].lexeme = "; dfsfdsa";

        context.tokens = tokens.slice();

        var parser = new SyntaxCheck();
        var actual = parser.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).toBe(1);

        expect(actual.messages[0].type).toBe(MessageType.Error);
        expect(actual.messages[0].position).toEqual({ line: 1, char: 6 });
        expect(actual.messages[0].text).toBe("Expected mode, got ';'");
    });

    it("returns a syntax error if a B field does not have a number", () => {

        var tokens: IToken[] = instructionTokens.slice(0);

        tokens[6].category = TokenCategory.Comment;
        tokens[6].lexeme = "; comment";

        context.tokens = tokens.slice();

        var parser = new SyntaxCheck();
        var actual = parser.process(context, Parser.DefaultOptions);

        expect(context.messages.length).toBe(1);

        expect(actual.messages[0].type).toBe(MessageType.Error);
        expect(actual.messages[0].position).toEqual({ line: 1, char: 7 });
        expect(actual.messages[0].text).toBe("Expected number, got ';'");
    });

    it("returns a syntax error if an instruction is not followed by a new line or comment", () => {

        var tokens: IToken[] = instructionTokens.slice(0);

        tokens[7].category = TokenCategory.Opcode;
        tokens[7].lexeme = "ADD";

        context.tokens = tokens.slice();

        var parser = new SyntaxCheck();
        var actual = parser.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).toBe(1);

        expect(actual.messages[0].type).toBe(MessageType.Error);
        expect(actual.messages[0].position).toEqual({ line: 1, char: 9 });
        expect(actual.messages[0].text).toBe("Expected end of line, got 'ADD'");
    });

    it("returns multiple syntax errors if multiple lines are incorrect", () => {

        var tokens: IToken[] = TestHelper.comment(1, ";author gareththegeek")
            .concat(TestHelper.instruction(2, "", "MOV", "", "", "23", "", "", "", ""))
            .concat(TestHelper.instruction(3, "", "MOV", ".X", "$", "0", ",", "#", "1", ""))
            .concat(TestHelper.emptyLine(4));

        context.tokens = tokens.slice();

        var parser = new SyntaxCheck();
        var actual = parser.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).toBe(2);

        expect(actual.messages[0].type).toBe(MessageType.Error);
        expect(actual.messages[0].position).toEqual({ line: 2, char: 4 });
        expect(actual.messages[0].text).toBe("Expected modifier, got '23'");

        expect(actual.messages[1].type).toBe(MessageType.Error);
        expect(actual.messages[1].position).toEqual({ line: 4, char: 1 });
        expect(actual.messages[1].text).toBe("Expected instruction or comment, got end of line");
    });

    it("Does not modify or raise errors regarding ORG instructions",() => {

        var tokens: IToken[] = TestHelper.org(1, "3");

        context.tokens = tokens.slice();

        var parser = new SyntaxCheck();
        var actual = parser.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).toBe(0);
        expect(actual.tokens.length).toBe(3);

        expect(actual.tokens[0].lexeme).toBe("ORG");
        expect(actual.tokens[1].lexeme).toBe("3");
        expect(actual.tokens[2].lexeme).toBe("\n");
    });

    it("Does not modify or raise errors regarding END instructions",() => {

        var tokens: IToken[] = TestHelper.endStatement(1, "");

        context.tokens = tokens.slice();

        var parser = new SyntaxCheck();
        var actual = parser.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).toBe(0);
        expect(actual.tokens.length).toBe(2);

        expect(actual.tokens[0].lexeme).toBe("END");
        expect(actual.tokens[1].lexeme).toBe("\n");
    });
});