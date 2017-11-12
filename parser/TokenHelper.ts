import { IToken, TokenCategory } from "./Interface/IToken";

export class TokenHelper {

    public static categoryToString(category: TokenCategory): string {
        switch (category) {
            case TokenCategory.Comma:
                return "','";
            case TokenCategory.Comment:
                return "';'";
            case TokenCategory.EOL:
                return "end of line";
            case TokenCategory.Label:
                return "label";
            case TokenCategory.Mode:
                return "mode";
            case TokenCategory.Modifier:
                return "modifier";
            case TokenCategory.Number:
                return "number";
            case TokenCategory.Opcode:
                return "opcode";
        }
        return "";
    }

    public static tokenToString(token: IToken): string {
        switch (token.category) {
            case TokenCategory.Comment:
                return "';'";
            case TokenCategory.EOL:
                return "end of line";
            default:
                return "'" + token.lexeme + "'";
        }
    }
} 