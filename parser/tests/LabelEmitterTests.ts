import { expect } from "chai";

import { IToken, TokenCategory } from "../interface/IToken";
import { Context } from "../Context";
import { Parser } from "../Parser";
import { TestHelper } from "./TestHelper";
import { LabelEmitter } from "../LabelEmitter";
import { MessageType } from "../interface/IMessage";
import { Standard } from "../interface/IParseOptions";

describe("LabelEmitter",() => {

    it("Does not modify token stream that contains no labels",() => {

        var tokens: IToken[] = [
            {
                category: TokenCategory.Comment,
                lexeme: "; tklsd fsdjk lfd shjds",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 2 }
            },

            {
                category: TokenCategory.Opcode,
                lexeme: "SPL",
                position: { line: 2, char: 1 }
            }, {
                category: TokenCategory.Mode,
                lexeme: ".X",
                position: { line: 2, char: 2 }
            }, {
                category: TokenCategory.Comma,
                lexeme: ",",
                position: { line: 2, char: 3 }
            }, {
                category: TokenCategory.Maths,
                lexeme: "/",
                position: { line: 2, char: 4 }
            }, {
                category: TokenCategory.Mode,
                lexeme: "#",
                position: { line: 2, char: 5 }
            }, {
                category: TokenCategory.Number,
                lexeme: "123",
                position: { line: 2, char: 6 }
            }, {
                category: TokenCategory.Unknown,
                lexeme: "|",
                position: { line: 2, char: 7 }
            }, {
                category: TokenCategory.Preprocessor,
                lexeme: "EQU",
                position: { line: 2, char: 8 }
            }
        ];

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new LabelEmitter();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(0);
        expect(actual.tokens.length).to.be.equal(10);

        for (var i = 0; i < tokens.length; i++) {
            expect(actual.tokens[i]).to.deep.equal(tokens[i]);
        }
    });

    it("Replaces labels with their numeric position relative to the current line",() => {

        var tokens: IToken[] = TestHelper
            .comment(1, "; dafjska s ds jfdkl jklcm")
            .concat(TestHelper.instruction(2, "", "ADD", "", "", "", "", "", "", ""))
            .concat(TestHelper.instruction(3, "", "MOV", "", "$", "label2", ",", "", "label1", ""));

        var context = new Context();
        context.tokens = tokens.slice();

        context.labels["label2"] = 0;
        context.labels["label1"] = 5;

        var pass = new LabelEmitter();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(0);
        expect(actual.tokens.length).to.be.equal(10);

        expect(actual.tokens[0]).to.deep.equal(tokens[0]);
        expect(actual.tokens[1]).to.deep.equal(tokens[1]);
        expect(actual.tokens[2]).to.deep.equal(tokens[2]);
        expect(actual.tokens[3]).to.deep.equal(tokens[3]);
        expect(actual.tokens[4]).to.deep.equal(tokens[4]);
        expect(actual.tokens[5]).to.deep.equal(tokens[5]);
        expect(actual.tokens[7]).to.deep.equal(tokens[7]);
        expect(actual.tokens[9]).to.deep.equal(tokens[9]);

        expect(actual.tokens[6].category).to.be.equal(TokenCategory.Number);
        expect(actual.tokens[6].lexeme).to.be.equal("-1");
        expect(actual.tokens[6].position).to.deep.equal({ line: 3, char: 4 });

        expect(actual.tokens[8].category).to.be.equal(TokenCategory.Number);
        expect(actual.tokens[8].lexeme).to.be.equal("4");
        expect(actual.tokens[8].position).to.deep.equal({ line: 3, char: 7 });
    });

    it("Raises a syntax error if an undeclared label is encountered",() => {

        var tokens: IToken[] = [
            {
                category: TokenCategory.Opcode,
                lexeme: "JMZ",
                position: { line: 2, char: 1 }
            }, {
                category: TokenCategory.Label,
                lexeme: "label1",
                position: { line: 2, char: 3 }
            }
        ];

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new LabelEmitter();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(1);
        expect(actual.messages[0].text).to.be.equal("Unrecognised label 'label1'");
        expect(actual.messages[0].type).to.be.equal(MessageType.Error);
        expect(actual.messages[0].position).to.deep.equal({ line: 2, char: 3 });
    });

    it("Replaces labels on END and ORG statements",() => {

        var tokens: IToken[] = TestHelper
            .org(1, "label2")
            .concat(TestHelper.endStatement(2, "label1"));

        var context = new Context();
        context.tokens = tokens.slice();

        context.labels["label2"] = 3;
        context.labels["label1"] = 5;

        var pass = new LabelEmitter();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(0);
        expect(actual.tokens.length).to.be.equal(6);

        expect(actual.tokens[0].lexeme).to.be.equal("ORG");
        expect(actual.tokens[1].lexeme).to.be.equal("3");
        expect(actual.tokens[2].lexeme).to.be.equal("\n");

        expect(actual.tokens[3].lexeme).to.be.equal("END");
        expect(actual.tokens[4].lexeme).to.be.equal("5");
        expect(actual.tokens[5].lexeme).to.be.equal("\n");
    });

    it("Uses a maximum of eight characters when substituting labels in ICWS'88 standard mode",() => {

        var tokens: IToken[] = TestHelper
            .instruction(3, "", "MOV", "", "$", "longlabelwhichexceedseightcharacters", ",", "", "short1", "");

        var context = new Context();
        context.tokens = tokens.slice();

        context.labels["longlabe"] = 0;
        context.labels["short1"] = 5;

        var pass = new LabelEmitter();
        var actual = pass.process(context, Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS88 }));

        expect(actual.messages.length).to.be.equal(0);
        expect(actual.tokens.length).to.be.equal(6);

        expect(actual.tokens[2].category).to.be.equal(TokenCategory.Number);
        expect(actual.tokens[2].lexeme).to.be.equal("0");
        expect(actual.tokens[2].position).to.deep.equal({ line: 3, char: 4 });

        expect(actual.tokens[4].category).to.be.equal(TokenCategory.Number);
        expect(actual.tokens[4].lexeme).to.be.equal("5");
        expect(actual.tokens[4].position).to.deep.equal({ line: 3, char: 7 });
    });
});
