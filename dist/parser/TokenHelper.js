"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IToken_1 = require("./interface/IToken");
class TokenHelper {
    static categoryToString(category) {
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
    }
    static tokenToString(token) {
        switch (token.category) {
            case IToken_1.TokenCategory.Comment:
                return "';'";
            case IToken_1.TokenCategory.EOL:
                return "end of line";
            default:
                return "'" + token.lexeme + "'";
        }
    }
}
exports.TokenHelper = TokenHelper;
