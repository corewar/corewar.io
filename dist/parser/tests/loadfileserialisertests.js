"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="references.ts" />
const IToken_1 = require("../Interface/IToken");
const LoadFileSerialiser_1 = require("../LoadFileSerialiser");
const TestHelper_1 = require("./TestHelper");
"use strict";
describe("LoadFileSerialiser", () => {
    it("serialises tokens to a valid load file format", () => {
        var tokens = TestHelper_1.TestHelper.instruction(1, "", "MOV", ".AB", "#", "23", ",", "$", "-45", "");
        var serialiser = new LoadFileSerialiser_1.LoadFileSerialiser();
        var actual = serialiser.serialise(tokens);
        expect(actual).toBe("MOV.AB\t#23,\t$-45\n");
    });
    it("does not serialise labels, maths or unknown tokens", () => {
        var tokens = [
            {
                category: IToken_1.TokenCategory.Label,
                lexeme: "_alabel_123",
                position: { line: 1, char: 5 }
            }, {
                category: IToken_1.TokenCategory.Opcode,
                lexeme: "ADD",
                position: { line: 1, char: 6 }
            }, {
                category: IToken_1.TokenCategory.Maths,
                lexeme: "+",
                position: { line: 1, char: 7 }
            }, {
                category: IToken_1.TokenCategory.Unknown,
                lexeme: ".",
                position: { line: 1, char: 9 }
            }
        ];
        var serialiser = new LoadFileSerialiser_1.LoadFileSerialiser();
        var actual = serialiser.serialise(tokens);
        expect(actual).toBe("ADD");
    });
    it("Serialises ORG and END preprocessor commands", () => {
        var tokens = [
            {
                category: IToken_1.TokenCategory.Preprocessor,
                lexeme: "ORG",
                position: { line: 1, char: 1 }
            }, {
                category: IToken_1.TokenCategory.Preprocessor,
                lexeme: "END",
                position: { line: 1, char: 1 }
            }
        ];
        var serialiser = new LoadFileSerialiser_1.LoadFileSerialiser();
        var actual = serialiser.serialise(tokens);
        expect(actual).toBe("ORG\tEND\t");
    });
    it("Serialises comments", () => {
        var tokens = TestHelper_1.TestHelper.instruction(1, "", "MOV", ".AB", "$", "0", ",", "$", "0", "; this is a comment");
        var serialiser = new LoadFileSerialiser_1.LoadFileSerialiser();
        var actual = serialiser.serialise(tokens);
        expect(actual).toBe("MOV.AB\t$0,\t$0\t; this is a comment\n");
    });
});
