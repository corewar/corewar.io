"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IToken_1 = require("./interface/IToken");
const _ = require("underscore");
class LoadFileSerialiser {
    serialise(tokens) {
        var result = "";
        this.previous = IToken_1.TokenCategory.EOL;
        _.forEach(tokens, (token) => {
            result += this.serialiseToken(token);
            this.previous = token.category;
        });
        return result;
    }
    serialiseToken(token) {
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
    }
}
exports.LoadFileSerialiser = LoadFileSerialiser;
