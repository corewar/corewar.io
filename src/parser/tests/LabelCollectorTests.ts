import { expect } from "chai";

import { IToken, TokenCategory } from "@parser/interface/IToken";
import { Context } from "@parser/Context";
import { Parser } from "@parser/Parser";
import { LabelCollector } from "@parser/LabelCollector";
import { MessageType } from "@parser/interface/IMessage";
import { TestHelper } from "@parser/tests/TestHelper";
import { Standard } from "@parser/interface/IParseOptions";

describe("LabelCollector", () => {

    it("Does not modify tokens if no lines begin with a label", () => {

        var tokens: IToken[] = [
            {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Label,
                lexeme: "label123",
                position: { line: 1, char: 2 }
            }, {
                category: TokenCategory.Mode,
                lexeme: "#",
                position: { line: 1, char: 2 }
            }, {
                category: TokenCategory.Modifier,
                lexeme: ".AB",
                position: { line: 1, char: 3 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 4 }
            },

            {
                category: TokenCategory.Comment,
                lexeme: "; sdfg dfkls kfds fsd jksd",
                position: { line: 2, char: 1 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 4 }
            },

            {
                category: TokenCategory.Maths,
                lexeme: "/",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Mode,
                lexeme: "@",
                position: { line: 1, char: 2 }
            }, {
                category: TokenCategory.Comma,
                lexeme: ",",
                position: { line: 1, char: 3 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 4 }
            }
        ];

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new LabelCollector();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(0);
        expect(actual.tokens.length).to.be.equal(11);

        for (var i = 0; i < tokens.length; i++) {

            expect(actual.tokens[i]).to.deep.equal(tokens[i]);
        }
    });

    it("Removes label declarations from the token stream", () => {

        var tokens: IToken[] = [
            {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Label,
                lexeme: "label123",
                position: { line: 1, char: 2 }
            }, {
                category: TokenCategory.Mode,
                lexeme: "#",
                position: { line: 1, char: 2 }
            }, {
                category: TokenCategory.Modifier,
                lexeme: ".AB",
                position: { line: 1, char: 3 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 4 }
            },

            {
                category: TokenCategory.Comment,
                lexeme: "; sdfg dfkls kfds fsd jksd",
                position: { line: 2, char: 1 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 4 }
            },

            {
                category: TokenCategory.Label,
                lexeme: "thisisalabel",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 2 }
            }, {
                category: TokenCategory.Comma,
                lexeme: ",",
                position: { line: 1, char: 3 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 4 }
            }
        ];

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new LabelCollector();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(0);
        expect(actual.tokens.length).to.be.equal(10);

        expect(actual.tokens[0]).to.deep.equal(tokens[0]);
        expect(actual.tokens[1]).to.deep.equal(tokens[1]);
        expect(actual.tokens[2]).to.deep.equal(tokens[2]);
        expect(actual.tokens[3]).to.deep.equal(tokens[3]);
        expect(actual.tokens[4]).to.deep.equal(tokens[4]);
        expect(actual.tokens[5]).to.deep.equal(tokens[5]);
        expect(actual.tokens[6]).to.deep.equal(tokens[6]);
        expect(actual.tokens[7]).to.deep.equal(tokens[8]);
        expect(actual.tokens[8]).to.deep.equal(tokens[9]);
        expect(actual.tokens[9]).to.deep.equal(tokens[10]);
    });

    it("Records labels in context with the corresponding instruction number", () => {

        var tokens: IToken[] = [
            {
                category: TokenCategory.Label,
                lexeme: "label1",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 1 }
            },

            {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Number,
                lexeme: "123",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 1 }
            },

            {
                category: TokenCategory.Label,
                lexeme: "label2",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Label,
                lexeme: "label3",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 1 }
            }
        ];

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new LabelCollector();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(0);
        expect(actual.labels["label1"]).to.be.equal(0);
        expect(actual.labels["label2"]).to.be.equal(2);
        expect(actual.labels["label3"]).to.be.equal(2);
    });

    it("Does not include lines which do not begin with an opcode or label in the instruction number", () => {

        var tokens: IToken[] = [
            {
                category: TokenCategory.Comment,
                lexeme: "; fdskdsksdf sdfjklds f",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 1 }
            },

            {
                category: TokenCategory.Opcode,
                lexeme: "ADD",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 1 }
            },

            {
                category: TokenCategory.Label,
                lexeme: "Label1",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 1 }
            },

            {
                category: TokenCategory.Number,
                lexeme: "3",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 1 }
            },

            {
                category: TokenCategory.Label,
                lexeme: "label2",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Opcode,
                lexeme: "MUL",
                position: { line: 1, char: 1 }
            }
        ];

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new LabelCollector();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(0);
        expect(actual.labels["Label1"]).to.be.equal(1);
        expect(actual.labels["label2"]).to.be.equal(2);
    });

    it("Raises a warning if a label is declared more than once and uses first definition", () => {

        var tokens: IToken[] = [
            {
                category: TokenCategory.Label,
                lexeme: "label1",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 2 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 3 }
            },

            {
                category: TokenCategory.Label,
                lexeme: "label1",
                position: { line: 2, char: 1 }
            }, {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 2, char: 2 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 2, char: 3 }
            }
        ];

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new LabelCollector();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(1);
        expect(actual.messages[0].text).to.be.equal("Redefinition of label 'label1', original definition will be used");
        expect(actual.messages[0].type).to.be.equal(MessageType.Warning);
        expect(actual.messages[0].position).to.deep.equal({ line: 2, char: 1 });
        expect(actual.labels["label1"]).to.be.equal(0);
    });

    it("Raises a warning if a label is declared with the same name as an EQU label and uses the EQU label",() => {

        var tokens: IToken[] = [
            {
                category: TokenCategory.Label,
                lexeme: "label2",
                position: { line: 4, char: 5 }
            }, {
                category: TokenCategory.Opcode,
                lexeme: "DJN",
                position: { line: 4, char: 7 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 4, char: 9 }
            }
        ];

        var context = new Context();
        context.tokens = tokens.slice();
        context.equs["label2"] = [];

        var pass = new LabelCollector();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(1);
        expect(actual.messages[0].text).to.be.equal("Redefinition of label 'label2', original definition will be used");
        expect(actual.messages[0].type).to.be.equal(MessageType.Warning);
        expect(actual.messages[0].position).to.deep.equal({ line: 4, char: 5 });
        expect("label2" in actual.labels).to.be.equal(false);
    });

    it("Raises an error if an opcode does not directly follow a label definition", () => {

        var tokens: IToken[] = [
            {
                category: TokenCategory.Label,
                lexeme: "label1",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Number,
                lexeme: "123",
                position: { line: 1, char: 2 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 2 }
            },

            {
                category: TokenCategory.Label,
                lexeme: "label2",
                position: { line: 2, char: 1 }
            }, {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 2, char: 2 }
            }
        ];

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new LabelCollector();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(1);
        expect(actual.messages[0].text).to.be.equal("Expected opcode, got '123'");
        expect(actual.messages[0].type).to.be.equal(MessageType.Error);
        expect(actual.messages[0].position).to.deep.equal({ line: 1, char: 2 });

        expect(actual.labels["label2"]).to.be.equal(1);
    });

    it("only records the first eight characters of a label in ICWS'88 standards mode",() => {

        var tokens: IToken[] = [
            {
                category: TokenCategory.Label,
                lexeme: "longlabelwhichexceedseightchars",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Label,
                lexeme: "short1",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 1 }
            }
        ];

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new LabelCollector();
        var actual = pass.process(context, Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS88 }));

        expect(actual.messages.length).to.be.equal(0);
        expect(actual.labels["longlabe"]).to.be.equal(0);
        expect(actual.labels["short1"]).to.be.equal(0);
        expect(actual.labels["longlabelwhichexceedseightchars"]).to.be.undefined;
    });

    it("recognises labels on end statements",() => {

        var tokens = TestHelper.instruction(1, "", "MOV", "", "", "0", ",", "", "1", "")
            .concat([{
                category: TokenCategory.Label,
                lexeme: "label1",
                position: { line: 2, char: 1 }
            }]).concat(TestHelper.endStatement(2, ""));

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new LabelCollector();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(0);

        expect(actual.tokens.length).to.be.equal(7);

        expect(actual.labels["label1"]).to.be.equal(1);
    });

    it("Correctly associates labels on a line by themselves with the following line", () => {

        var tokens: IToken[] = [
            {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 2, char: 1 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 2 }
            }, {
                category: TokenCategory.Label,
                lexeme: "label1",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 2 }
            }, {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 2, char: 1 }
            }
        ];

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new LabelCollector();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(0);
        expect(actual.labels["label1"]).to.be.equal(1);
    });
});
