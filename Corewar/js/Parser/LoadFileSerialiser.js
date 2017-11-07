define(["require", "exports", "./Interface/IToken"], function (require, exports, IToken_1) {
    var LoadFileSerialiser = (function () {
        function LoadFileSerialiser() {
        }
        LoadFileSerialiser.prototype.serialise = function (tokens) {
            var _this = this;
            var result = "";
            this.previous = IToken_1.TokenCategory.EOL;
            _.forEach(tokens, function (token) {
                result += _this.serialiseToken(token);
                _this.previous = token.category;
            });
            return result;
        };
        LoadFileSerialiser.prototype.serialiseToken = function (token) {
            switch (token.category) {
                case IToken_1.TokenCategory.Comma:
                    return ",\t";
                case IToken_1.TokenCategory.EOL:
                    return "\n";
                case IToken_1.TokenCategory.Mode:
                    return token.lexeme;
                case IToken_1.TokenCategory.Modifier:
                    return token.lexeme + "\t";
                case IToken_1.TokenCategory.Number:
                    return token.lexeme;
                case IToken_1.TokenCategory.Opcode:
                    return token.lexeme;
                case IToken_1.TokenCategory.Preprocessor:
                    return token.lexeme + "\t";
                case IToken_1.TokenCategory.Comment:
                    if (this.previous === IToken_1.TokenCategory.EOL) {
                        return token.lexeme;
                    }
                    else {
                        return "\t" + token.lexeme;
                    }
                default:
                    return "";
            }
        };
        return LoadFileSerialiser;
    })();
    exports.LoadFileSerialiser = LoadFileSerialiser;
});
//# sourceMappingURL=LoadFileSerialiser.js.map