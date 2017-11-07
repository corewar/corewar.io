define(["require", "exports", "./Interface/IToken", "./Interface/IMessage", "./TokenHelper"], function (require, exports, IToken_1, IMessage_1, TokenHelper_1) {
    var TokenStream = (function () {
        function TokenStream(tokens, messages) {
            this.position = 0;
            this.tokens = tokens;
            this.messages = messages;
        }
        TokenStream.prototype.eof = function () {
            return this.position >= this.tokens.length;
        };
        TokenStream.prototype.peek = function () {
            return this.tokens[this.position];
        };
        TokenStream.prototype.read = function () {
            return this.tokens[this.position++];
        };
        TokenStream.prototype.readToEOL = function () {
            var result = [];
            while (!this.eof()) {
                var token = this.read();
                result.push(token);
                if (token.category === IToken_1.TokenCategory.EOL) {
                    break;
                }
            }
            return result;
        };
        TokenStream.prototype.warn = function (token, message) {
            this.messages.push({
                position: token.position,
                text: message,
                type: IMessage_1.MessageType.Warning
            });
        };
        TokenStream.prototype.expectOnly = function (lexeme) {
            if (this.eof()) {
                this.error(_(this.tokens).last(), "Expected '" + lexeme + "', got end of file");
            }
            var token = this.read();
            if (token.lexeme !== lexeme) {
                this.expected("'" + lexeme + "'", token);
            }
            return token;
        };
        TokenStream.prototype.expect = function (category) {
            if (this.eof()) {
                this.error(_(this.tokens).last(), "Expected '" + TokenHelper_1.TokenHelper.categoryToString(category) + "', got end of file");
            }
            var token = this.read();
            if (token.category !== category) {
                this.expected(TokenHelper_1.TokenHelper.categoryToString(category), token);
            }
            return token;
        };
        TokenStream.prototype.expected = function (expected, got) {
            this.messages.push({
                type: IMessage_1.MessageType.Error,
                position: got.position,
                text: "Expected " + expected + ", got " + TokenHelper_1.TokenHelper.tokenToString(got)
            });
            throw "";
        };
        TokenStream.prototype.error = function (token, message) {
            this.messages.push({
                position: token.position,
                text: message,
                type: IMessage_1.MessageType.Error
            });
            throw "";
        };
        return TokenStream;
    })();
    exports.TokenStream = TokenStream;
});
//# sourceMappingURL=TokenStream.js.map