"use strict";
/// <reference path="references.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("../Context");
const IToken_1 = require("../Interface/IToken");
const Parser_1 = require("../Parser");
const MathsProcessor_1 = require("../MathsProcessor");
const Expression_1 = require("../Expression");
const IMessage_1 = require("../Interface/IMessage");
describe("MathsProcessor", () => {
    it("Does not modify stream with no maths or number tokens", () => {
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
                category: IToken_1.TokenCategory.Mode,
                position: { line: 1, char: 1 },
                lexeme: "#"
            }, {
                category: IToken_1.TokenCategory.Modifier,
                position: { line: 1, char: 1 },
                lexeme: ".I"
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
        var pass = new MathsProcessor_1.MathsProcessor(new Expression_1.Expression());
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.tokens.length).toBe(8);
        expect(actual.messages.length).toBe(0);
        for (var i = 0; i < tokens.length; i++) {
            expect(tokens[i]).toEqual(actual.tokens[i]);
        }
    });
    it("Parses literal positive numbers", () => {
        var context = new Context_1.Context();
        var tokens = [
            {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 1 },
                lexeme: "87"
            }, {
                category: IToken_1.TokenCategory.EOL,
                position: { line: 1, char: 2 },
                lexeme: "\n"
            }
        ];
        context.tokens = tokens.slice();
        var pass = new MathsProcessor_1.MathsProcessor(new Expression_1.Expression());
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.tokens.length).toBe(2);
        expect(actual.messages.length).toBe(0);
        expect(actual.tokens[0].category).toBe(IToken_1.TokenCategory.Number);
        expect(actual.tokens[0].lexeme).toBe("87");
        expect(actual.tokens[0].position).toEqual({ line: 1, char: 1 });
        expect(actual.tokens[1].lexeme).toBe("\n");
    });
    it("Parses literal positive numbers with a superfluous, leading +", () => {
        var context = new Context_1.Context();
        var tokens = [
            {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 1 },
                lexeme: "+"
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 2 },
                lexeme: "87"
            }, {
                category: IToken_1.TokenCategory.EOL,
                position: { line: 1, char: 3 },
                lexeme: "\n"
            }
        ];
        context.tokens = tokens.slice();
        var pass = new MathsProcessor_1.MathsProcessor(new Expression_1.Expression());
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.tokens.length).toBe(2);
        expect(actual.messages.length).toBe(0);
        expect(actual.tokens[0].category).toBe(IToken_1.TokenCategory.Number);
        expect(actual.tokens[0].lexeme).toBe("87");
        expect(actual.tokens[0].position).toEqual({ line: 1, char: 1 });
        expect(actual.tokens[1].lexeme).toBe("\n");
    });
    it("Parses literal negative numbers", () => {
        var context = new Context_1.Context();
        var tokens = [
            {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 1 },
                lexeme: "-"
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 2 },
                lexeme: "23"
            }, {
                category: IToken_1.TokenCategory.EOL,
                position: { line: 1, char: 3 },
                lexeme: "\n"
            }
        ];
        context.tokens = tokens.slice();
        var pass = new MathsProcessor_1.MathsProcessor(new Expression_1.Expression());
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.tokens.length).toBe(2);
        expect(actual.messages.length).toBe(0);
        expect(actual.tokens[0].category).toBe(IToken_1.TokenCategory.Number);
        expect(actual.tokens[0].lexeme).toBe("-23");
        expect(actual.tokens[0].position).toEqual({ line: 1, char: 1 });
        expect(actual.tokens[1].lexeme).toBe("\n");
    });
    it("Calculates the sum of three addresses", () => {
        var context = new Context_1.Context();
        var tokens = [
            {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 1 },
                lexeme: "4"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 2 },
                lexeme: "+"
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 3 },
                lexeme: "3"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 4 },
                lexeme: "+"
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 5 },
                lexeme: "2"
            }, {
                category: IToken_1.TokenCategory.EOL,
                position: { line: 1, char: 6 },
                lexeme: "\n"
            }
        ];
        context.tokens = tokens.slice();
        var pass = new MathsProcessor_1.MathsProcessor(new Expression_1.Expression());
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.tokens.length).toBe(2);
        expect(actual.messages.length).toBe(0);
        expect(actual.tokens[0].category).toBe(IToken_1.TokenCategory.Number);
        expect(actual.tokens[0].lexeme).toBe("9");
        expect(actual.tokens[0].position).toEqual({ line: 1, char: 1 });
        expect(actual.tokens[1].lexeme).toBe("\n");
    });
    it("Calculates the difference of three addresses", () => {
        var context = new Context_1.Context();
        var tokens = [
            {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 1 },
                lexeme: "4"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 2 },
                lexeme: "-"
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 3 },
                lexeme: "3"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 4 },
                lexeme: "-"
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 5 },
                lexeme: "2"
            }, {
                category: IToken_1.TokenCategory.EOL,
                position: { line: 1, char: 6 },
                lexeme: "\n"
            }
        ];
        context.tokens = tokens.slice();
        var pass = new MathsProcessor_1.MathsProcessor(new Expression_1.Expression());
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.tokens.length).toBe(2);
        expect(actual.messages.length).toBe(0);
        expect(actual.tokens[0].category).toBe(IToken_1.TokenCategory.Number);
        expect(actual.tokens[0].lexeme).toBe("-1");
        expect(actual.tokens[0].position).toEqual({ line: 1, char: 1 });
        expect(actual.tokens[1].lexeme).toBe("\n");
    });
    it("Calculates the product of three addresses", () => {
        var context = new Context_1.Context();
        var tokens = [
            {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 1 },
                lexeme: "4"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 2 },
                lexeme: "*"
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 3 },
                lexeme: "3"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 4 },
                lexeme: "*"
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 5 },
                lexeme: "2"
            }, {
                category: IToken_1.TokenCategory.EOL,
                position: { line: 1, char: 6 },
                lexeme: "\n"
            }
        ];
        context.tokens = tokens.slice();
        var pass = new MathsProcessor_1.MathsProcessor(new Expression_1.Expression());
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.tokens.length).toBe(2);
        expect(actual.messages.length).toBe(0);
        expect(actual.tokens[0].category).toBe(IToken_1.TokenCategory.Number);
        expect(actual.tokens[0].lexeme).toBe("24");
        expect(actual.tokens[0].position).toEqual({ line: 1, char: 1 });
        expect(actual.tokens[1].lexeme).toBe("\n");
    });
    it("Calculates the quotient of three addresses", () => {
        var context = new Context_1.Context();
        var tokens = [
            {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 1 },
                lexeme: "24"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 2 },
                lexeme: "/"
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 3 },
                lexeme: "2"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 4 },
                lexeme: "/"
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 5 },
                lexeme: "3"
            }, {
                category: IToken_1.TokenCategory.EOL,
                position: { line: 1, char: 6 },
                lexeme: "\n"
            }
        ];
        context.tokens = tokens.slice();
        var pass = new MathsProcessor_1.MathsProcessor(new Expression_1.Expression());
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.tokens.length).toBe(2);
        expect(actual.messages.length).toBe(0);
        expect(actual.tokens[0].category).toBe(IToken_1.TokenCategory.Number);
        expect(actual.tokens[0].lexeme).toBe("4");
        expect(actual.tokens[0].position).toEqual({ line: 1, char: 1 });
        expect(actual.tokens[1].lexeme).toBe("\n");
    });
    it("Calculates the quotient of three addresses", () => {
        var context = new Context_1.Context();
        var tokens = [
            {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 1 },
                lexeme: "26"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 2 },
                lexeme: "%"
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 3 },
                lexeme: "12"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 4 },
                lexeme: "%"
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 5 },
                lexeme: "3"
            }, {
                category: IToken_1.TokenCategory.EOL,
                position: { line: 1, char: 6 },
                lexeme: "\n"
            }
        ];
        context.tokens = tokens.slice();
        var pass = new MathsProcessor_1.MathsProcessor(new Expression_1.Expression());
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.tokens.length).toBe(2);
        expect(actual.messages.length).toBe(0);
        expect(actual.tokens[0].category).toBe(IToken_1.TokenCategory.Number);
        expect(actual.tokens[0].lexeme).toBe("2");
        expect(actual.tokens[0].position).toEqual({ line: 1, char: 1 });
        expect(actual.tokens[1].lexeme).toBe("\n");
    });
    it("Applies correct operator precedence to operators", () => {
        var context = new Context_1.Context();
        var tokens = [
            {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 1 },
                lexeme: "2"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 2 },
                lexeme: "+"
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 3 },
                lexeme: "2"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 4 },
                lexeme: "*"
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 5 },
                lexeme: "3"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 6 },
                lexeme: "-"
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 7 },
                lexeme: "10"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 8 },
                lexeme: "/"
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 9 },
                lexeme: "5"
            }, {
                category: IToken_1.TokenCategory.EOL,
                position: { line: 1, char: 11 },
                lexeme: "\n"
            }
        ];
        context.tokens = tokens.slice();
        var pass = new MathsProcessor_1.MathsProcessor(new Expression_1.Expression());
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.tokens.length).toBe(2);
        expect(actual.messages.length).toBe(0);
        expect(actual.tokens[0].category).toBe(IToken_1.TokenCategory.Number);
        expect(actual.tokens[0].lexeme).toBe("6");
        expect(actual.tokens[0].position).toEqual({ line: 1, char: 1 });
        expect(actual.tokens[1].lexeme).toBe("\n");
    });
    it("Correctly applies brackets to override operator precedence", () => {
        var context = new Context_1.Context();
        var tokens = [
            {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 1 },
                lexeme: "("
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 2 },
                lexeme: "1"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 3 },
                lexeme: "+"
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 4 },
                lexeme: "2"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 5 },
                lexeme: ")"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 6 },
                lexeme: "*"
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 7 },
                lexeme: "3"
            }, {
                category: IToken_1.TokenCategory.EOL,
                position: { line: 1, char: 8 },
                lexeme: "\n"
            }
        ];
        context.tokens = tokens.slice();
        var pass = new MathsProcessor_1.MathsProcessor(new Expression_1.Expression());
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.tokens.length).toBe(2);
        expect(actual.messages.length).toBe(0);
        expect(actual.tokens[0].category).toBe(IToken_1.TokenCategory.Number);
        expect(actual.tokens[0].lexeme).toBe("9");
        expect(actual.tokens[0].position).toEqual({ line: 1, char: 1 });
        expect(actual.tokens[1].lexeme).toBe("\n");
    });
    it("Correctly handles multiple nested brackets", () => {
        var context = new Context_1.Context();
        // ( 1+((2-3)*8)/(1+3) ) = 1 + (-1*8) / 4 = 1 + -8/4 = -1
        var tokens = [
            {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 1 },
                lexeme: "("
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 2 },
                lexeme: "1"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 3 },
                lexeme: "+"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 4 },
                lexeme: "("
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 5 },
                lexeme: "("
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 6 },
                lexeme: "2"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 7 },
                lexeme: "-"
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 8 },
                lexeme: "3"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 9 },
                lexeme: ")"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 10 },
                lexeme: "*"
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 11 },
                lexeme: "8"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 12 },
                lexeme: ")"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 13 },
                lexeme: "/"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 14 },
                lexeme: "("
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 15 },
                lexeme: "1"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 16 },
                lexeme: "+"
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 17 },
                lexeme: "3"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 18 },
                lexeme: ")"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 19 },
                lexeme: ")"
            }, {
                category: IToken_1.TokenCategory.EOL,
                position: { line: 1, char: 20 },
                lexeme: "\n"
            }
        ];
        context.tokens = tokens.slice();
        var pass = new MathsProcessor_1.MathsProcessor(new Expression_1.Expression());
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.tokens.length).toBe(2);
        expect(actual.messages.length).toBe(0);
        expect(actual.tokens[0].category).toBe(IToken_1.TokenCategory.Number);
        expect(actual.tokens[0].lexeme).toBe("-1");
        expect(actual.tokens[0].position).toEqual({ line: 1, char: 1 });
        expect(actual.tokens[1].lexeme).toBe("\n");
    });
    it("Raises a syntax error if an expression does not contain a closing bracket", () => {
        var context = new Context_1.Context();
        var tokens = [
            {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 1 },
                lexeme: "("
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 2 },
                lexeme: "1"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 3 },
                lexeme: "+"
            }, {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 4 },
                lexeme: "2"
            }, {
                category: IToken_1.TokenCategory.EOL,
                position: { line: 1, char: 8 },
                lexeme: "\n"
            }
        ];
        context.tokens = tokens.slice();
        var pass = new MathsProcessor_1.MathsProcessor(new Expression_1.Expression());
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.tokens.length).toBe(0);
        expect(actual.messages.length).toBe(1);
        expect(actual.messages[0].position).toEqual({ line: 1, char: 8 });
        expect(actual.messages[0].text).toBe("Expected ')', got end of line");
        expect(actual.messages[0].type).toBe(IMessage_1.MessageType.Error);
    });
    it("Raises a syntax error if a mathematical operator is not followed by an address", () => {
        var context = new Context_1.Context();
        var tokens = [
            {
                category: IToken_1.TokenCategory.Number,
                position: { line: 1, char: 1 },
                lexeme: "3"
            }, {
                category: IToken_1.TokenCategory.Maths,
                position: { line: 1, char: 2 },
                lexeme: "*"
            }, {
                category: IToken_1.TokenCategory.EOL,
                position: { line: 1, char: 3 },
                lexeme: "\n"
            }
        ];
        context.tokens = tokens.slice();
        var pass = new MathsProcessor_1.MathsProcessor(new Expression_1.Expression());
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.tokens.length).toBe(0);
        expect(actual.messages.length).toBe(1);
        expect(actual.messages[0].position).toEqual({ line: 1, char: 3 });
        expect(actual.messages[0].text).toBe("Expected number, got end of line");
        expect(actual.messages[0].type).toBe(IMessage_1.MessageType.Error);
    });
    it("Raises a warning for non-integer division and produces integer division result", () => {
        var tokens = [
            {
                category: IToken_1.TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Number,
                lexeme: "5",
                position: { line: 1, char: 2 }
            }, {
                category: IToken_1.TokenCategory.Maths,
                lexeme: "/",
                position: { line: 1, char: 3 }
            }, {
                category: IToken_1.TokenCategory.Number,
                lexeme: "3",
                position: { line: 1, char: 4 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 5 }
            }, {
                category: IToken_1.TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 2, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Number,
                lexeme: "-4",
                position: { line: 2, char: 2 }
            }, {
                category: IToken_1.TokenCategory.Maths,
                lexeme: "/",
                position: { line: 2, char: 3 }
            }, {
                category: IToken_1.TokenCategory.Number,
                lexeme: "3",
                position: { line: 2, char: 4 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 2, char: 5 }
            }
        ];
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new MathsProcessor_1.MathsProcessor(new Expression_1.Expression());
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(2);
        expect(actual.messages[0].text).toBe("Rounded non-integer division truncated to integer value");
        expect(actual.messages[0].position).toEqual({ line: 1, char: 3 });
        expect(actual.messages[0].type).toBe(IMessage_1.MessageType.Warning);
        expect(actual.messages[1].text).toBe("Rounded non-integer division truncated to integer value");
        expect(actual.messages[1].position).toEqual({ line: 2, char: 3 });
        expect(actual.messages[1].type).toBe(IMessage_1.MessageType.Warning);
        expect(actual.tokens.length).toBe(6);
        expect(actual.tokens[1].lexeme).toBe("1");
        expect(actual.tokens[4].lexeme).toBe("-1");
    });
    it("Raises an error if a divide by zero is encountered", () => {
        var tokens = [
            {
                category: IToken_1.TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Number,
                lexeme: "1",
                position: { line: 1, char: 2 }
            }, {
                category: IToken_1.TokenCategory.Maths,
                lexeme: "/",
                position: { line: 1, char: 3 }
            }, {
                category: IToken_1.TokenCategory.Number,
                lexeme: "0",
                position: { line: 1, char: 4 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 5 }
            }
        ];
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new MathsProcessor_1.MathsProcessor(new Expression_1.Expression());
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.messages.length).toBe(1);
        expect(actual.messages[0].text).toBe("Divide by zero is not permitted");
        expect(actual.messages[0].position).toEqual({ line: 1, char: 3 });
        expect(actual.messages[0].type).toBe(IMessage_1.MessageType.Error);
    });
    it("Rounds the quotient rather than the final result of the expression", () => {
        var tokens = [
            {
                category: IToken_1.TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Number,
                lexeme: "8000",
                position: { line: 1, char: 2 }
            }, {
                category: IToken_1.TokenCategory.Maths,
                lexeme: "/",
                position: { line: 1, char: 3 }
            }, {
                category: IToken_1.TokenCategory.Number,
                lexeme: "22",
                position: { line: 1, char: 4 }
            }, {
                category: IToken_1.TokenCategory.Maths,
                lexeme: "*",
                position: { line: 1, char: 5 }
            }, {
                category: IToken_1.TokenCategory.Number,
                lexeme: "2",
                position: { line: 1, char: 6 }
            }, {
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 7 }
            }
        ];
        var context = new Context_1.Context();
        context.tokens = tokens.slice();
        var pass = new MathsProcessor_1.MathsProcessor(new Expression_1.Expression());
        var actual = pass.process(context, Parser_1.Parser.DefaultOptions);
        expect(actual.tokens[1].lexeme).toBe("726");
    });
});
