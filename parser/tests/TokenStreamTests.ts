import { expect } from "chai";

import { IToken, TokenCategory } from "../interface/IToken";
import { TokenStream } from "./../TokenStream";
"use strict";

describe("TokenStream", () => {

    var tokens: IToken[];

    beforeEach(() => {

        tokens = [
            {
                category: TokenCategory.Opcode,
                lexeme: "ADD",
                position: { line: 1, char: 1 }
            }, {
                category: TokenCategory.Opcode,
                lexeme: "MOV",
                position: { line: 1, char: 2 }
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: { line: 1, char: 3 }
            }, {
                category: TokenCategory.Opcode,
                lexeme: "MUL",
                position: { line: 1, char: 4 }
            }, {
                category: TokenCategory.Opcode,
                lexeme: "DAT",
                position: { line: 1, char: 5 }
            }
        ];
    });

    it(".peek() returns the next token in the stream but does not advance the current position", () => {

        var stream = new TokenStream(tokens, []);
        stream.position = 3;

        expect(stream.peek().position.char).to.be.equal(4);
        expect(stream.peek().position.char).to.be.equal(4);
        expect(stream.peek().position.char).to.be.equal(4);
    });

    it(".read() returns the next token in the stream and does advance the current position", () => {

        var stream = new TokenStream(tokens, []);
        stream.position = 1;

        expect(stream.read().position.char).to.be.equal(2);
        expect(stream.read().position.char).to.be.equal(3);
        expect(stream.read().position.char).to.be.equal(4);
    });

    it(".eof() returns false if the position has not reached the end of the token array", () => {

        var stream = new TokenStream(tokens, []);
        stream.position = 1;

        expect(stream.eof()).to.be.equal(false);
    });

    it(".eof() returns true if the position has reached the end of the token array", () => {

        var stream = new TokenStream(tokens, []);
        stream.position = 5;

        expect(stream.eof()).to.be.equal(true);
    });

    it(".readToEOL() moves the position ahead to the character after the next end of line token", () => {

        var stream = new TokenStream(tokens, []);
        stream.position = 0;

        stream.readToEOL();

        expect(stream.position).to.be.equal(3);
    });

    it(".readToEOL() returns all tokens read", () => {

        var stream = new TokenStream(tokens, []);
        stream.position = 0;

        var actual = stream.readToEOL();

        expect(actual.length).to.be.equal(3);
        expect(actual[0]).to.deep.equal(tokens[0]);
        expect(actual[1]).to.deep.equal(tokens[1]);
        expect(actual[2]).to.deep.equal(tokens[2]);
    });
});