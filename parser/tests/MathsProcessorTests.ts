

import { Context } from "../Context";
import { IToken, TokenCategory } from "../interface/IToken";
import { Parser } from "../Parser";
import { MathsProcessor } from "../MathsProcessor";
import { Expression } from "../Expression";
import { MessageType } from "../interface/IMessage";

describe("MathsProcessor",() => {

    it("Does not modify stream with no maths or number tokens",() => {

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
                category: TokenCategory.Mode,
                position: { line: 1, char: 1 },
                lexeme: "#"
            }, {
                category: TokenCategory.Modifier,
                position: { line: 1, char: 1 },
                lexeme: ".I"
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

        var pass = new MathsProcessor(new Expression());
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).toBe(8);
        expect(actual.messages.length).toBe(0);

        for (var i = 0; i < tokens.length; i++) {
            expect(tokens[i]).toEqual(actual.tokens[i]);
        }
    });

    it("Parses literal positive numbers",() => {

        var context = new Context();

        var tokens: IToken[] = [
            {
                category: TokenCategory.Number,
                position: { line: 1, char: 1 },
                lexeme: "87"
            }, {
                category: TokenCategory.EOL,
                position: { line: 1, char: 2 },
                lexeme: "\n"
            }
        ];

        context.tokens = tokens.slice();

        var pass = new MathsProcessor(new Expression());
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).toBe(2);
        expect(actual.messages.length).toBe(0);

        expect(actual.tokens[0].category).toBe(TokenCategory.Number);
        expect(actual.tokens[0].lexeme).toBe("87");
        expect(actual.tokens[0].position).toEqual({ line: 1, char: 1 });

        expect(actual.tokens[1].lexeme).toBe("\n");
    });

    it("Parses literal positive numbers with a superfluous, leading +",() => {

        var context = new Context();

        var tokens: IToken[] = [
            {
                category: TokenCategory.Maths,
                position: { line: 1, char: 1 },
                lexeme: "+"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 2 },
                lexeme: "87"
            }, {
                category: TokenCategory.EOL,
                position: { line: 1, char: 3 },
                lexeme: "\n"
            }
        ];

        context.tokens = tokens.slice();

        var pass = new MathsProcessor(new Expression());
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).toBe(2);
        expect(actual.messages.length).toBe(0);

        expect(actual.tokens[0].category).toBe(TokenCategory.Number);
        expect(actual.tokens[0].lexeme).toBe("87");
        expect(actual.tokens[0].position).toEqual({ line: 1, char: 1 });

        expect(actual.tokens[1].lexeme).toBe("\n");
    });

    it("Parses literal negative numbers",() => {

        var context = new Context();

        var tokens: IToken[] = [
            {
                category: TokenCategory.Maths,
                position: { line: 1, char: 1 },
                lexeme: "-"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 2 },
                lexeme: "23"
            }, {
                category: TokenCategory.EOL,
                position: { line: 1, char: 3 },
                lexeme: "\n"
            }
        ];

        context.tokens = tokens.slice();

        var pass = new MathsProcessor(new Expression());
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).toBe(2);
        expect(actual.messages.length).toBe(0);

        expect(actual.tokens[0].category).toBe(TokenCategory.Number);
        expect(actual.tokens[0].lexeme).toBe("-23");
        expect(actual.tokens[0].position).toEqual({ line: 1, char: 1 });

        expect(actual.tokens[1].lexeme).toBe("\n");
    });

    it("Calculates the sum of three addresses",() => {

        var context = new Context();

        var tokens: IToken[] = [
            {
                category: TokenCategory.Number,
                position: { line: 1, char: 1 },
                lexeme: "4"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 2 },
                lexeme: "+"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 3 },
                lexeme: "3"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 4 },
                lexeme: "+"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 5 },
                lexeme: "2"
            }, {
                category: TokenCategory.EOL,
                position: { line: 1, char: 6 },
                lexeme: "\n"
            }
        ];

        context.tokens = tokens.slice();

        var pass = new MathsProcessor(new Expression());
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).toBe(2);
        expect(actual.messages.length).toBe(0);

        expect(actual.tokens[0].category).toBe(TokenCategory.Number);
        expect(actual.tokens[0].lexeme).toBe("9");
        expect(actual.tokens[0].position).toEqual({ line: 1, char: 1 });

        expect(actual.tokens[1].lexeme).toBe("\n");
    });

    it("Calculates the difference of three addresses",() => {

        var context = new Context();

        var tokens: IToken[] = [
            {
                category: TokenCategory.Number,
                position: { line: 1, char: 1 },
                lexeme: "4"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 2 },
                lexeme: "-"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 3 },
                lexeme: "3"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 4 },
                lexeme: "-"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 5 },
                lexeme: "2"
            }, {
                category: TokenCategory.EOL,
                position: { line: 1, char: 6 },
                lexeme: "\n"
            }
        ];

        context.tokens = tokens.slice();

        var pass = new MathsProcessor(new Expression());
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).toBe(2);
        expect(actual.messages.length).toBe(0);

        expect(actual.tokens[0].category).toBe(TokenCategory.Number);
        expect(actual.tokens[0].lexeme).toBe("-1");
        expect(actual.tokens[0].position).toEqual({ line: 1, char: 1 });

        expect(actual.tokens[1].lexeme).toBe("\n");
    });

    it("Calculates the product of three addresses",() => {

        var context = new Context();

        var tokens: IToken[] = [
            {
                category: TokenCategory.Number,
                position: { line: 1, char: 1 },
                lexeme: "4"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 2 },
                lexeme: "*"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 3 },
                lexeme: "3"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 4 },
                lexeme: "*"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 5 },
                lexeme: "2"
            }, {
                category: TokenCategory.EOL,
                position: { line: 1, char: 6 },
                lexeme: "\n"
            }
        ];

        context.tokens = tokens.slice();

        var pass = new MathsProcessor(new Expression());
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).toBe(2);
        expect(actual.messages.length).toBe(0);

        expect(actual.tokens[0].category).toBe(TokenCategory.Number);
        expect(actual.tokens[0].lexeme).toBe("24");
        expect(actual.tokens[0].position).toEqual({ line: 1, char: 1 });

        expect(actual.tokens[1].lexeme).toBe("\n");
    });

    it("Calculates the quotient of three addresses",() => {

        var context = new Context();

        var tokens: IToken[] = [
            {
                category: TokenCategory.Number,
                position: { line: 1, char: 1 },
                lexeme: "24"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 2 },
                lexeme: "/"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 3 },
                lexeme: "2"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 4 },
                lexeme: "/"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 5 },
                lexeme: "3"
            }, {
                category: TokenCategory.EOL,
                position: { line: 1, char: 6 },
                lexeme: "\n"
            }
        ];

        context.tokens = tokens.slice();

        var pass = new MathsProcessor(new Expression());
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).toBe(2);
        expect(actual.messages.length).toBe(0);

        expect(actual.tokens[0].category).toBe(TokenCategory.Number);
        expect(actual.tokens[0].lexeme).toBe("4");
        expect(actual.tokens[0].position).toEqual({ line: 1, char: 1 });

        expect(actual.tokens[1].lexeme).toBe("\n");
    });

    it("Calculates the quotient of three addresses",() => {

        var context = new Context();

        var tokens: IToken[] = [
            {
                category: TokenCategory.Number,
                position: { line: 1, char: 1 },
                lexeme: "26"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 2 },
                lexeme: "%"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 3 },
                lexeme: "12"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 4 },
                lexeme: "%"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 5 },
                lexeme: "3"
            }, {
                category: TokenCategory.EOL,
                position: { line: 1, char: 6 },
                lexeme: "\n"
            }
        ];

        context.tokens = tokens.slice();

        var pass = new MathsProcessor(new Expression());
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).toBe(2);
        expect(actual.messages.length).toBe(0);

        expect(actual.tokens[0].category).toBe(TokenCategory.Number);
        expect(actual.tokens[0].lexeme).toBe("2");
        expect(actual.tokens[0].position).toEqual({ line: 1, char: 1 });

        expect(actual.tokens[1].lexeme).toBe("\n");
    });

    it("Applies correct operator precedence to operators",() => {

        var context = new Context();

        var tokens: IToken[] = [
            {
                category: TokenCategory.Number,
                position: { line: 1, char: 1 },
                lexeme: "2"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 2 },
                lexeme: "+"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 3 },
                lexeme: "2"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 4 },
                lexeme: "*"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 5 },
                lexeme: "3"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 6 },
                lexeme: "-"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 7 },
                lexeme: "10"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 8 },
                lexeme: "/"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 9 },
                lexeme: "5"
            }, {
                category: TokenCategory.EOL,
                position: { line: 1, char: 11 },
                lexeme: "\n"
            }
        ];

        context.tokens = tokens.slice();

        var pass = new MathsProcessor(new Expression());
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).toBe(2);
        expect(actual.messages.length).toBe(0);

        expect(actual.tokens[0].category).toBe(TokenCategory.Number);
        expect(actual.tokens[0].lexeme).toBe("6");
        expect(actual.tokens[0].position).toEqual({ line: 1, char: 1 });

        expect(actual.tokens[1].lexeme).toBe("\n");
    });

    it("Correctly applies brackets to override operator precedence",() => {

        var context = new Context();

        var tokens: IToken[] = [
            {
                category: TokenCategory.Maths,
                position: { line: 1, char: 1 },
                lexeme: "("
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 2 },
                lexeme: "1"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 3 },
                lexeme: "+"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 4 },
                lexeme: "2"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 5 },
                lexeme: ")"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 6 },
                lexeme: "*"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 7 },
                lexeme: "3"
            }, {
                category: TokenCategory.EOL,
                position: { line: 1, char: 8 },
                lexeme: "\n"
            }
        ];

        context.tokens = tokens.slice();

        var pass = new MathsProcessor(new Expression());
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).toBe(2);
        expect(actual.messages.length).toBe(0);

        expect(actual.tokens[0].category).toBe(TokenCategory.Number);
        expect(actual.tokens[0].lexeme).toBe("9");
        expect(actual.tokens[0].position).toEqual({ line: 1, char: 1 });

        expect(actual.tokens[1].lexeme).toBe("\n");
    });

    it("Correctly handles multiple nested brackets",() => {

        var context = new Context();

        // ( 1+((2-3)*8)/(1+3) ) = 1 + (-1*8) / 4 = 1 + -8/4 = -1

        var tokens: IToken[] = [
            {
                category: TokenCategory.Maths,
                position: { line: 1, char: 1 },
                lexeme: "("
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 2 },
                lexeme: "1"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 3 },
                lexeme: "+"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 4 },
                lexeme: "("
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 5 },
                lexeme: "("
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 6 },
                lexeme: "2"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 7 },
                lexeme: "-"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 8 },
                lexeme: "3"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 9 },
                lexeme: ")"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 10 },
                lexeme: "*"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 11 },
                lexeme: "8"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 12 },
                lexeme: ")"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 13 },
                lexeme: "/"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 14 },
                lexeme: "("
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 15 },
                lexeme: "1"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 16 },
                lexeme: "+"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 17 },
                lexeme: "3"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 18 },
                lexeme: ")"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 19 },
                lexeme: ")"
            },{
                category: TokenCategory.EOL,
                position: { line: 1, char: 20 },
                lexeme: "\n"
            }
        ];

        context.tokens = tokens.slice();

        var pass = new MathsProcessor(new Expression());
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).toBe(2);
        expect(actual.messages.length).toBe(0);

        expect(actual.tokens[0].category).toBe(TokenCategory.Number);
        expect(actual.tokens[0].lexeme).toBe("-1");
        expect(actual.tokens[0].position).toEqual({ line: 1, char: 1 });

        expect(actual.tokens[1].lexeme).toBe("\n");
    });

    it("Raises a syntax error if an expression does not contain a closing bracket",() => {

        var context = new Context();

        var tokens: IToken[] = [
            {
                category: TokenCategory.Maths,
                position: { line: 1, char: 1 },
                lexeme: "("
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 2 },
                lexeme: "1"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 3 },
                lexeme: "+"
            }, {
                category: TokenCategory.Number,
                position: { line: 1, char: 4 },
                lexeme: "2"
            }, {
                category: TokenCategory.EOL,
                position: { line: 1, char: 8 },
                lexeme: "\n"
            }
        ];

        context.tokens = tokens.slice();

        var pass = new MathsProcessor(new Expression());
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).toBe(0);
        expect(actual.messages.length).toBe(1);

        expect(actual.messages[0].position).toEqual({ line: 1, char: 8 });
        expect(actual.messages[0].text).toBe("Expected ')', got end of line");
        expect(actual.messages[0].type).toBe(MessageType.Error);
    });

    it("Raises a syntax error if a mathematical operator is not followed by an address",() => {

        var context = new Context();

        var tokens: IToken[] = [
            {
                category: TokenCategory.Number,
                position: { line: 1, char: 1 },
                lexeme: "3"
            }, {
                category: TokenCategory.Maths,
                position: { line: 1, char: 2 },
                lexeme: "*"
            }, {
                category: TokenCategory.EOL,
                position: { line: 1, char: 3 },
                lexeme: "\n"
            }
        ];

        context.tokens = tokens.slice();

        var pass = new MathsProcessor(new Expression());
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).toBe(0);
        expect(actual.messages.length).toBe(1);

        expect(actual.messages[0].position).toEqual({ line: 1, char: 3 });
        expect(actual.messages[0].text).toBe("Expected number, got end of line");
        expect(actual.messages[0].type).toBe(MessageType.Error);
    });

    it("Raises a warning for non-integer division and produces integer division result",() => {

        var tokens: IToken[] = [
            {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Number,
                lexeme: "5",
                position: { line: 1, char: 2 }
            }, {
                category: TokenCategory.Maths,
                lexeme: "/",
                position: { line: 1, char: 3 }
            }, {
                category: TokenCategory.Number,
                lexeme: "3",
                position: { line: 1, char: 4 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 5 }
            }, {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 2, char: 1 }
            }, {
                category: TokenCategory.Number,
                lexeme: "-4",
                position: { line: 2, char: 2 }
            }, {
                category: TokenCategory.Maths,
                lexeme: "/",
                position: { line: 2, char: 3 }
            }, {
                category: TokenCategory.Number,
                lexeme: "3",
                position: { line: 2, char: 4 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 2, char: 5 }
            }
        ];

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new MathsProcessor(new Expression());
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).toBe(2);

        expect(actual.messages[0].text).toBe("Rounded non-integer division truncated to integer value");
        expect(actual.messages[0].position).toEqual({ line: 1, char: 3 });
        expect(actual.messages[0].type).toBe(MessageType.Warning);

        expect(actual.messages[1].text).toBe("Rounded non-integer division truncated to integer value");
        expect(actual.messages[1].position).toEqual({ line: 2, char: 3 });
        expect(actual.messages[1].type).toBe(MessageType.Warning);

        expect(actual.tokens.length).toBe(6);

        expect(actual.tokens[1].lexeme).toBe("1");
        expect(actual.tokens[4].lexeme).toBe("-1");
    });

    it("Raises an error if a divide by zero is encountered",() => {

        var tokens: IToken[] = [
            {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Number,
                lexeme: "1",
                position: { line: 1, char: 2 }
            }, {
                category: TokenCategory.Maths,
                lexeme: "/",
                position: { line: 1, char: 3 }
            }, {
                category: TokenCategory.Number,
                lexeme: "0",
                position: { line: 1, char: 4 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 5 }
            }
        ];

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new MathsProcessor(new Expression());
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).toBe(1);

        expect(actual.messages[0].text).toBe("Divide by zero is not permitted");
        expect(actual.messages[0].position).toEqual({ line: 1, char: 3 });
        expect(actual.messages[0].type).toBe(MessageType.Error);
    });

    it("Rounds the quotient rather than the final result of the expression",() => {

        var tokens: IToken[] = [
            {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Number,
                lexeme: "8000",
                position: { line: 1, char: 2 }
            }, {
                category: TokenCategory.Maths,
                lexeme: "/",
                position: { line: 1, char: 3 }
            }, {
                category: TokenCategory.Number,
                lexeme: "22",
                position: { line: 1, char: 4 }
            }, {
                category: TokenCategory.Maths,
                lexeme: "*",
                position: { line: 1, char: 5 }
            }, {
                category: TokenCategory.Number,
                lexeme: "2",
                position: { line: 1, char: 6 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 7 }
            }
        ];

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new MathsProcessor(new Expression());
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens[1].lexeme).toBe("726");
    });
});