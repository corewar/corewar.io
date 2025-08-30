import { IToken, TokenCategory } from './interface/IToken'
import { ISerialiser } from './interface/ISerialiser'

export class LoadFileSerialiser implements ISerialiser {
    private previous: TokenCategory

    public serialise(tokens: IToken[]): string {
        let result = ''
        this.previous = TokenCategory.EOL

        tokens.forEach((token: IToken) => {
            result += this.serialiseToken(token)
            this.previous = token.category
        })

        return result
    }

    private serialiseToken(token: IToken): string {
        switch (token.category) {
            case TokenCategory.Comma:
                return ',\t'

            case TokenCategory.EOL:
                return '\n'

            case TokenCategory.Mode:
                return token.lexeme

            case TokenCategory.Modifier:
                return token.lexeme + '\t'

            case TokenCategory.Number:
                return token.lexeme

            case TokenCategory.Opcode:
                return token.lexeme

            case TokenCategory.Preprocessor:
                return token.lexeme + '\t'

            case TokenCategory.Comment:
                if (this.previous === TokenCategory.EOL) {
                    return token.lexeme
                } else {
                    return '\t' + token.lexeme
                }

            default:
                return ''
        }
    }
}
