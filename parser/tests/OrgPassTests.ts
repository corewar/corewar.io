import { expect } from "chai";

import { TestHelper } from "./TestHelper";
import { Context } from "..//Context";
import { OrgPass } from "../OrgPass";
import { Parser } from "../Parser";
import { MessageType } from "../interface/IMessage";
import { IToken, TokenCategory } from "../interface/IToken";
import { Standard } from "../interface/IParseOptions";
import { OpcodeType } from "../../simulator/interface/IInstruction";

describe("OrgPass", () => {

    it("Makes the ORG instruction the first instruction in the output", () => {

        var tokens = TestHelper
            .comment(1, ";redcode")
            .concat(TestHelper.comment(2, ";author gareththegeek"))
            .concat(TestHelper.instruction(3, "", "MOV", "", "$", "0", "", "", "", ""))
            .concat(TestHelper.org(4, "3"));

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new OrgPass();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(0);
        expect(actual.tokens.length).to.be.equal(11);

        expect(actual.tokens[0].lexeme).to.be.equal(";redcode");
        expect(actual.tokens[1].lexeme).to.be.equal("\n");

        expect(actual.tokens[2].lexeme).to.be.equal(";author gareththegeek");
        expect(actual.tokens[3].lexeme).to.be.equal("\n");

        expect(actual.tokens[4].lexeme).to.be.equal("ORG");
        expect(actual.tokens[5].lexeme).to.be.equal("3");
        expect(actual.tokens[6].lexeme).to.be.equal("\n");

        expect(actual.tokens[7].lexeme).to.be.equal("MOV");
        expect(actual.tokens[8].lexeme).to.be.equal("$");
        expect(actual.tokens[9].lexeme).to.be.equal("0");
        expect(actual.tokens[10].lexeme).to.be.equal("\n");
    });

    it("Inserts ORG 0 if no ORG statement found", () => {

        var tokens = TestHelper
            .instruction(1, "", "MOV", "", "", "1", ",", "", "2", "")
            .concat(TestHelper.instruction(2, "", "ADD", ".F", "@", "2", ",", "", "3", ""));

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new OrgPass();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(0);
        expect(actual.tokens.length).to.be.equal(15);

        expect(actual.tokens[0].lexeme).to.be.equal("ORG");
        expect(actual.tokens[1].lexeme).to.be.equal("0");
        expect(actual.tokens[2].lexeme).to.be.equal("\n");

        expect(actual.tokens[3].lexeme).to.be.equal("MOV");
        expect(actual.tokens[4].lexeme).to.be.equal("1");
        expect(actual.tokens[5].lexeme).to.be.equal(",");
        expect(actual.tokens[6].lexeme).to.be.equal("2");
        expect(actual.tokens[7].lexeme).to.be.equal("\n");

        expect(actual.tokens[8].lexeme).to.be.equal("ADD");
        expect(actual.tokens[9].lexeme).to.be.equal(".F");
        expect(actual.tokens[10].lexeme).to.be.equal("@");
        expect(actual.tokens[11].lexeme).to.be.equal("2");
        expect(actual.tokens[12].lexeme).to.be.equal(",");
        expect(actual.tokens[13].lexeme).to.be.equal("3");
        expect(actual.tokens[14].lexeme).to.be.equal("\n");
    });

    it("Uses END address for ORG statement", () => {

        var tokens = TestHelper.instruction(1, "", "MOV", "", "", "0", ",", "", "1", "")
            .concat(TestHelper.endStatement(2, "2"));

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new OrgPass();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(0);
        expect(actual.tokens.length).to.be.equal(8);

        expect(actual.tokens[0].lexeme).to.be.equal("ORG");
        expect(actual.tokens[1].lexeme).to.be.equal("2");
        expect(actual.tokens[2].lexeme).to.be.equal("\n");

        expect(actual.tokens[3].lexeme).to.be.equal("MOV");
        expect(actual.tokens[4].lexeme).to.be.equal("0");
        expect(actual.tokens[5].lexeme).to.be.equal(",");
        expect(actual.tokens[6].lexeme).to.be.equal("1");
        expect(actual.tokens[7].lexeme).to.be.equal("\n");
    });

    it("Raises a warning if multiple ORG instructions are found and uses latest definition", () => {

        var tokens = TestHelper.org(1, "1")
            .concat(TestHelper.org(2, "2"))
            .concat(TestHelper.org(3, "3"));

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new OrgPass();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(2);

        expect(actual.messages[0].text).to.be.equal("Redefinition of ORG encountered, this later definition will take effect");
        expect(actual.messages[0].type).to.be.equal(MessageType.Warning);
        expect(actual.messages[0].position).to.deep.equal({ line: 2, char: 1 });

        expect(actual.messages[1].text).to.be.equal("Redefinition of ORG encountered, this later definition will take effect");
        expect(actual.messages[1].type).to.be.equal(MessageType.Warning);
        expect(actual.messages[1].position).to.deep.equal({ line: 3, char: 1 });

        expect(actual.tokens.length).to.be.equal(3);

        expect(actual.tokens[0].lexeme).to.be.equal("ORG");
        expect(actual.tokens[1].lexeme).to.be.equal("3");
        expect(actual.tokens[2].lexeme).to.be.equal("\n");
    });

    it("Raises a warning if both an ORG and END ### instruction are declared and uses the ORG definition", () => {

        var tokens = TestHelper.org(1, "1")
            .concat(TestHelper.endStatement(2, "2"));

        var context = new Context();
        context.tokens = tokens.slice();

        var pass = new OrgPass();
        var actual = pass.process(context, Parser.DefaultOptions);

        expect(actual.messages.length).to.be.equal(1);

        expect(actual.messages[0].text).to.be.equal("Encountered both ORG and END address, the ORG definition will take effect");
        expect(actual.messages[0].type).to.be.equal(MessageType.Warning);
        expect(actual.messages[0].position).to.deep.equal({ line: 2, char: 1 });

        expect(actual.tokens.length).to.be.equal(3);

        expect(actual.tokens[0].lexeme).to.be.equal("ORG");
        expect(actual.tokens[1].lexeme).to.be.equal("1");
        expect(actual.tokens[2].lexeme).to.be.equal("\n");
    });

    it("Raises a syntax error if ORG statement does not contain an address", () => {

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

        expect(actual.messages.length).to.be.equal(1);

        expect(actual.messages[0].text).to.be.equal("Expected number, got end of line");
        expect(actual.messages[0].type).to.be.equal(MessageType.Error);
        expect(actual.messages[0].position).to.deep.equal({ line: 4, char: 6 });
    });

    it("Raises a syntax error if ORG statement contains additional tokens before the end of line", () => {

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

        expect(actual.messages.length).to.be.equal(1);

        expect(actual.messages[0].text).to.be.equal("Expected end of line, got 'MOV'");
        expect(actual.messages[0].type).to.be.equal(MessageType.Error);
        expect(actual.messages[0].position).to.deep.equal({ line: 4, char: 8 });
    });

    it("Raises a syntax error if END statement contains additional tokens before the end of line", () => {

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

        expect(actual.messages.length).to.be.equal(1);

        expect(actual.messages[0].text).to.be.equal("Expected end of line, got 'MOV'");
        expect(actual.messages[0].type).to.be.equal(MessageType.Error);
        expect(actual.messages[0].position).to.deep.equal({ line: 4, char: 8 });
    });

    it("Uses start label as default END address under ICWS'86 standard", () => {

        var tokens = TestHelper.instruction(1, "", "MOV", "", "", "0", ",", "", "1", "")
            .concat(TestHelper.instruction(2, "", "MOV", "", "", "0", ",", "", "1", ""))
            .concat(TestHelper.endStatement(3, "", "; this is a comment"));

        var context = new Context();
        context.tokens = tokens.slice();

        context.labels["start"] = 1;

        var pass = new OrgPass();
        var actual = pass.process(context, Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS86 }));

        expect(actual.tokens[0].lexeme).to.be.equal("ORG");
        expect(actual.tokens[1].lexeme).to.be.equal("1");
    });

    it("Ignores lines which do not begin with ORG or END", () => {

        var tokens = [{
            position: { line: 0, char: 0 },
            lexeme: "FOR",
            category: TokenCategory.Preprocessor
        },{
            position: { line: 0, char: 0 },
            lexeme: "5",
            category: TokenCategory.Number
        },{
            position: { line: 0, char: 0 },
            lexeme: "\n",
            category: TokenCategory.EOL
        }]

        var context = new Context();
        context.tokens = tokens.slice();

        context.labels["start"] = 1;

        var pass = new OrgPass();
        var actual = pass.process(context, Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS86 }));

        const orgInstructionLength = 3;

        expect(actual.tokens.length).to.be.equal(tokens.length + orgInstructionLength);
        for (var i = 0; i < tokens.length; i++) {
            expect(actual.tokens[i + orgInstructionLength].lexeme).to.be.equal(tokens[i].lexeme);
        }
    });
});
