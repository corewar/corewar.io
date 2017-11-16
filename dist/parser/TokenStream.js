"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IToken_1 = require("./interface/IToken");
const IMessage_1 = require("./interface/IMessage");
const _ = require("underscore");
const TokenHelper_1 = require("./TokenHelper");
class TokenStream {
    constructor(tokens, messages) {
        this.position = 0;
        this.tokens = tokens;
        this.messages = messages;
    }
    eof() {
        return this.position >= this.tokens.length;
    }
    peek() {
        return this.tokens[this.position];
    }
    read() {
        return this.tokens[this.position++];
    }
    readToEOL() {
        var result = [];
        while (!this.eof()) {
            var token = this.read();
            result.push(token);
            if (token.category === IToken_1.TokenCategory.EOL) {
                break;
            }
        }
        return result;
    }
    warn(token, message) {
        this.messages.push({
            position: token.position,
            text: message,
            type: IMessage_1.MessageType.Warning
        });
    }
    expectOnly(lexeme) {
        if (this.eof()) {
            this.error(_(this.tokens).last(), "Expected '" + lexeme + "', got end of file");
        }
        var token = this.read();
        if (token.lexeme !== lexeme) {
            this.expected("'" + lexeme + "'", token);
        }
        return token;
    }
    expect(category) {
        if (this.eof()) {
            this.error(_(this.tokens).last(), "Expected '" + TokenHelper_1.TokenHelper.categoryToString(category) + "', got end of file");
        }
        var token = this.read();
        if (token.category !== category) {
            this.expected(TokenHelper_1.TokenHelper.categoryToString(category), token);
        }
        return token;
    }
    expected(expected, got) {
        this.messages.push({
            type: IMessage_1.MessageType.Error,
            position: got.position,
            text: "Expected " + expected + ", got " + TokenHelper_1.TokenHelper.tokenToString(got)
        });
        throw "";
    }
    error(token, message) {
        this.messages.push({
            position: token.position,
            text: message,
            type: IMessage_1.MessageType.Error
        });
        throw "";
    }
}
exports.TokenStream = TokenStream;
