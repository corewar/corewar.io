define(["require", "exports", "./Interface/IToken"], function (require, exports, IToken_1) {
    var TokenHelper = (function () {
        function TokenHelper() {
        }
        TokenHelper.categoryToString = function (category) {
            switch (category) {
                case IToken_1.TokenCategory.Comma:
                    return "','";
                case IToken_1.TokenCategory.Comment:
                    return "';'";
                case IToken_1.TokenCategory.EOL:
                    return "end of line";
                case IToken_1.TokenCategory.Label:
                    return "label";
                case IToken_1.TokenCategory.Mode:
                    return "mode";
                case IToken_1.TokenCategory.Modifier:
                    return "modifier";
                case IToken_1.TokenCategory.Number:
                    return "number";
                case IToken_1.TokenCategory.Opcode:
                    return "opcode";
            }
            return "";
        };
        TokenHelper.tokenToString = function (token) {
            switch (token.category) {
                case IToken_1.TokenCategory.Comment:
                    return "';'";
                case IToken_1.TokenCategory.EOL:
                    return "end of line";
                default:
                    return "'" + token.lexeme + "'";
            }
        };
        return TokenHelper;
    })();
    exports.TokenHelper = TokenHelper;
});
//# sourceMappingURL=TokenHelper.js.map