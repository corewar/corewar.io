import { expect } from "chai";

import { IToken, TokenCategory } from "@parser/interface/IToken";
import { LoadFileSerialiser } from "@parser/LoadFileSerialiser";
import { TestHelper } from "@parser/tests/TestHelper";

describe("LoadFileSerialiser", () => {

    it("serialises tokens to a valid load file format", () => {

        var tokens: IToken[] = TestHelper.instruction(1, "", "MOV", ".AB", "#", "23", ",", "$", "-45", "");

        var serialiser = new LoadFileSerialiser();

        var actual = serialiser.serialise(tokens);

        expect(actual).to.be.equal("MOV.AB\t#23,\t$-45\n");
    });

    it("does not serialise labels, maths or unknown tokens", () => {

        var tokens: IToken[] = [
            {
                category: TokenCategory.Label,
                lexeme: "_alabel_123",
                position: { line: 1, char: 5 }
            }, {
                category: TokenCategory.Opcode,
                lexeme: "ADD",
                position: { line: 1, char: 6 }
            }, {
                category: TokenCategory.Maths,
                lexeme: "+",
                position: { line: 1, char: 7 }
            }, {
                category: TokenCategory.Unknown,
                lexeme: ".",
                position: { line: 1, char: 9 }
            }
        ];

        var serialiser = new LoadFileSerialiser();

        var actual = serialiser.serialise(tokens);

        expect(actual).to.be.equal("ADD");
    });

    it("Serialises ORG and END preprocessor commands", () => {

        var tokens: IToken[] = [
            {
                category: TokenCategory.Preprocessor,
                lexeme: "ORG",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Preprocessor,
                lexeme: "END",
                position: { line: 1, char: 1 }
            }
        ];

        var serialiser = new LoadFileSerialiser();

        var actual = serialiser.serialise(tokens);

        expect(actual).to.be.equal("ORG\tEND\t");
    });

    it("Serialises comments", () => {

        var tokens: IToken[] = TestHelper.instruction(1, "", "MOV", ".AB", "$", "0", ",", "$", "0", "; this is a comment");

        var serialiser = new LoadFileSerialiser();

        var actual = serialiser.serialise(tokens);

        expect(actual).to.be.equal("MOV.AB\t$0,\t$0\t; this is a comment\n");
    });

    it("Serialises comments preceded by newline", () => {

        // var tokens: IToken[] = TestHelper.instruction(1, "", "MOV", ".AB", "$", "0", ",", "$", "0", "; this is a comment");
        var tokens = [
            {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 0, char: 0 }
            },
            {
                category: TokenCategory.Comment,
                lexeme: "; this is a comment",
                position: { line: 0, char: 0 }
            }
        ];

        var serialiser = new LoadFileSerialiser();

        var actual = serialiser.serialise(tokens);

        expect(actual).to.be.equal("\n; this is a comment");
    });
});