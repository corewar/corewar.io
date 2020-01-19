import { expect } from "chai";

import { Context } from "@parser/Context";
import { IToken, TokenCategory } from "@parser/interface/IToken";
import { Parser } from "@parser/Parser";
import { MathsProcessor } from "@parser/MathsProcessor";
import { Expression } from "@parser/Expression";
import { MessageType } from "@parser/interface/IMessage";

describe("MathsProcessor",() => {

    it("Does not modify stream with no maths or number tokens",() => {

        const context = new Context();

        const tokens: IToken[] = [
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

        const pass = new MathsProcessor(new Expression());
        const actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).to.be.equal(8);
        expect(actual.messages.length).to.be.equal(0);

        for (let i = 0; i < tokens.length; i++) {
            expect(tokens[i]).to.deep.equal(actual.tokens[i]);
        }
    });

    it("Parses literal positive numbers",() => {

        const context = new Context();

        const tokens: IToken[] = [
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

        const pass = new MathsProcessor(new Expression());
        const actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).to.be.equal(2);
        expect(actual.messages.length).to.be.equal(0);

        expect(actual.tokens[0].category).to.be.equal(TokenCategory.Number);
        expect(actual.tokens[0].lexeme).to.be.equal("87");
        expect(actual.tokens[0].position).to.deep.equal({ line: 1, char: 1 });

        expect(actual.tokens[1].lexeme).to.be.equal("\n");
    });

    it("Parses literal positive numbers with a superfluous, leading +",() => {

        const context = new Context();

        const tokens: IToken[] = [
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

        const pass = new MathsProcessor(new Expression());
        const actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).to.be.equal(2);
        expect(actual.messages.length).to.be.equal(0);

        expect(actual.tokens[0].category).to.be.equal(TokenCategory.Number);
        expect(actual.tokens[0].lexeme).to.be.equal("87");
        expect(actual.tokens[0].position).to.deep.equal({ line: 1, char: 1 });

        expect(actual.tokens[1].lexeme).to.be.equal("\n");
    });

    it("Parses literal negative numbers",() => {

        const context = new Context();

        const tokens: IToken[] = [
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

        const pass = new MathsProcessor(new Expression());
        const actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).to.be.equal(2);
        expect(actual.messages.length).to.be.equal(0);

        expect(actual.tokens[0].category).to.be.equal(TokenCategory.Number);
        expect(actual.tokens[0].lexeme).to.be.equal("-23");
        expect(actual.tokens[0].position).to.deep.equal({ line: 1, char: 1 });

        expect(actual.tokens[1].lexeme).to.be.equal("\n");
    });

    it("Calculates the sum of three addresses",() => {

        const context = new Context();

        const tokens: IToken[] = [
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

        const pass = new MathsProcessor(new Expression());
        const actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).to.be.equal(2);
        expect(actual.messages.length).to.be.equal(0);

        expect(actual.tokens[0].category).to.be.equal(TokenCategory.Number);
        expect(actual.tokens[0].lexeme).to.be.equal("9");
        expect(actual.tokens[0].position).to.deep.equal({ line: 1, char: 1 });

        expect(actual.tokens[1].lexeme).to.be.equal("\n");
    });

    it("Calculates the difference of three addresses",() => {

        const context = new Context();

        const tokens: IToken[] = [
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

        const pass = new MathsProcessor(new Expression());
        const actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).to.be.equal(2);
        expect(actual.messages.length).to.be.equal(0);

        expect(actual.tokens[0].category).to.be.equal(TokenCategory.Number);
        expect(actual.tokens[0].lexeme).to.be.equal("-1");
        expect(actual.tokens[0].position).to.deep.equal({ line: 1, char: 1 });

        expect(actual.tokens[1].lexeme).to.be.equal("\n");
    });

    it("Calculates the product of three addresses",() => {

        const context = new Context();

        const tokens: IToken[] = [
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

        const pass = new MathsProcessor(new Expression());
        const actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).to.be.equal(2);
        expect(actual.messages.length).to.be.equal(0);

        expect(actual.tokens[0].category).to.be.equal(TokenCategory.Number);
        expect(actual.tokens[0].lexeme).to.be.equal("24");
        expect(actual.tokens[0].position).to.deep.equal({ line: 1, char: 1 });

        expect(actual.tokens[1].lexeme).to.be.equal("\n");
    });

    it("Calculates the quotient of three addresses",() => {

        const context = new Context();

        const tokens: IToken[] = [
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

        const pass = new MathsProcessor(new Expression());
        const actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).to.be.equal(2);
        expect(actual.messages.length).to.be.equal(0);

        expect(actual.tokens[0].category).to.be.equal(TokenCategory.Number);
        expect(actual.tokens[0].lexeme).to.be.equal("4");
        expect(actual.tokens[0].position).to.deep.equal({ line: 1, char: 1 });

        expect(actual.tokens[1].lexeme).to.be.equal("\n");
    });

    it("Calculates the quotient of three addresses",() => {

        const context = new Context();

        const tokens: IToken[] = [
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

        const pass = new MathsProcessor(new Expression());
        const actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).to.be.equal(2);
        expect(actual.messages.length).to.be.equal(0);

        expect(actual.tokens[0].category).to.be.equal(TokenCategory.Number);
        expect(actual.tokens[0].lexeme).to.be.equal("2");
        expect(actual.tokens[0].position).to.deep.equal({ line: 1, char: 1 });

        expect(actual.tokens[1].lexeme).to.be.equal("\n");
    });

    it("Applies correct operator precedence to operators",() => {

        const context = new Context();

        const tokens: IToken[] = [
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

        const pass = new MathsProcessor(new Expression());
        const actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).to.be.equal(2);
        expect(actual.messages.length).to.be.equal(0);

        expect(actual.tokens[0].category).to.be.equal(TokenCategory.Number);
        expect(actual.tokens[0].lexeme).to.be.equal("6");
        expect(actual.tokens[0].position).to.deep.equal({ line: 1, char: 1 });

        expect(actual.tokens[1].lexeme).to.be.equal("\n");
    });

    it("Correctly applies brackets to override operator precedence",() => {

        const context = new Context();

        const tokens: IToken[] = [
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

        const pass = new MathsProcessor(new Expression());
        const actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).to.be.equal(2);
        expect(actual.messages.length).to.be.equal(0);

        expect(actual.tokens[0].category).to.be.equal(TokenCategory.Number);
        expect(actual.tokens[0].lexeme).to.be.equal("9");
        expect(actual.tokens[0].position).to.deep.equal({ line: 1, char: 1 });

        expect(actual.tokens[1].lexeme).to.be.equal("\n");
    });

    it("Correctly handles multiple nested brackets",() => {

        const context = new Context();

        // ( 1+((2-3)*8)/(1+3) ) = 1 + (-1*8) / 4 = 1 + -8/4 = -1

        const tokens: IToken[] = [
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

        const pass = new MathsProcessor(new Expression());
        const actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).to.be.equal(2);
        expect(actual.messages.length).to.be.equal(0);

        expect(actual.tokens[0].category).to.be.equal(TokenCategory.Number);
        expect(actual.tokens[0].lexeme).to.be.equal("-1");
        expect(actual.tokens[0].position).to.deep.equal({ line: 1, char: 1 });

        expect(actual.tokens[1].lexeme).to.be.equal("\n");
    });

    it("Raises a syntax error if an expression does not contain a closing bracket",() => {

        const context = new Context();

        const tokens: IToken[] = [
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

        const pass = new MathsProcessor(new Expression());
        const actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).to.be.equal(0);
        expect(actual.messages.length).to.be.equal(1);

        expect(actual.messages[0].position).to.deep.equal({ line: 1, char: 8 });
        expect(actual.messages[0].text).to.be.equal("Expected ')', got end of line");
        expect(actual.messages[0].type).to.be.equal(MessageType.Error);
    });

    it("Raises a syntax error if a mathematical operator is not followed by an address",() => {

        const context = new Context();

        const tokens: IToken[] = [
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

        const pass = new MathsProcessor(new Expression());
        const actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens.length).to.be.equal(0);
        expect(actual.messages.length).to.be.equal(1);

        expect(actual.messages[0].position).to.deep.equal({ line: 1, char: 3 });
        expect(actual.messages[0].text).to.be.equal("Expected number, got end of line");
        expect(actual.messages[0].type).to.be.equal(MessageType.Error);
    });

    it("Raises a warning for non-integer division and produces integer division result",() => {

        const tokens: IToken[] = [
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

        const context = new Context();
        context.tokens = tokens.slice();

        const pass = new MathsProcessor(new Expression());
        const actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(2);

        expect(actual.messages[0].text).to.be.equal("Rounded non-integer division truncated to integer value");
        expect(actual.messages[0].position).to.deep.equal({ line: 1, char: 3 });
        expect(actual.messages[0].type).to.be.equal(MessageType.Warning);

        expect(actual.messages[1].text).to.be.equal("Rounded non-integer division truncated to integer value");
        expect(actual.messages[1].position).to.deep.equal({ line: 2, char: 3 });
        expect(actual.messages[1].type).to.be.equal(MessageType.Warning);

        expect(actual.tokens.length).to.be.equal(6);

        expect(actual.tokens[1].lexeme).to.be.equal("1");
        expect(actual.tokens[4].lexeme).to.be.equal("-1");
    });

    it("Raises an error if a divide by zero is encountered",() => {

        const tokens: IToken[] = [
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

        const context = new Context();
        context.tokens = tokens.slice();

        const pass = new MathsProcessor(new Expression());
        const actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(1);

        expect(actual.messages[0].text).to.be.equal("Divide by zero is not permitted");
        expect(actual.messages[0].position).to.deep.equal({ line: 1, char: 3 });
        expect(actual.messages[0].type).to.be.equal(MessageType.Error);
    });

    it("Rounds the quotient rather than the final result of the expression",() => {

        const tokens: IToken[] = [
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

        const context = new Context();
        context.tokens = tokens.slice();

        const pass = new MathsProcessor(new Expression());
        const actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.tokens[1].lexeme).to.be.equal("726");
    });
});