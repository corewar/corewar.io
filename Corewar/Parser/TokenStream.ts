import { IToken, TokenCategory } from "./Interface/IToken";
import { IMessage, MessageType } from "./Interface/IMessage";
import { ITokenStream } from "./Interface/ITokenStream";

import { TokenHelper } from "./TokenHelper";

export class TokenStream implements ITokenStream {

    public position: number;
    public tokens: IToken[];
    private messages: IMessage[];
    
    constructor(tokens: IToken[], messages: IMessage[]) {
        this.position = 0;
        this.tokens = tokens;
        this.messages = messages;
    }

    public eof(): boolean {
        return this.position >= this.tokens.length;
    }

    public peek(): IToken {
        return this.tokens[this.position];
    }

    public read(): IToken {
        return this.tokens[this.position++];
    }

    public readToEOL(): IToken[]{
        var result: IToken[] = [];

        while (!this.eof()) {
            var token = this.read();
            result.push(token);
            if (token.category === TokenCategory.EOL) {
                break;
            }
        }

        return result;
    }
    
    public warn(token: IToken, message: string) {

        this.messages.push({
            position: token.position,
            text: message,
            type: MessageType.Warning
        });
    }

    public expectOnly(lexeme: string): IToken {

        if (this.eof()) {
            this.error(_(this.tokens).last(), "Expected '" + lexeme + "', got end of file");
        }

        var token = this.read();

        if (token.lexeme !== lexeme) {
            this.expected("'" + lexeme + "'", token);
        }

        return token;
    }

    public expect(category: TokenCategory): IToken {

        if (this.eof()) {
            this.error(
                _(this.tokens).last(),
                "Expected '" + TokenHelper.categoryToString(category) + "', got end of file");
        }

        var token = this.read();

        if (token.category !== category) {
            this.expected(TokenHelper.categoryToString(category), token);
        }

        return token;
    }

    public expected(expected: string, got: IToken) {

        this.messages.push({
            type: MessageType.Error,
            position: got.position,
            text: "Expected " + expected + ", got " + TokenHelper.tokenToString(got)
        });
        throw "";
    }

    public error(token: IToken, message: string) {

        this.messages.push({
            position: token.position,
            text: message,
            type: MessageType.Error
        });
        throw "";
    }
}