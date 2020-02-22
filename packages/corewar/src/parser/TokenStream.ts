import { IToken, TokenCategory } from "@parser/interface/IToken";
import { IMessage, MessageType } from "@parser/interface/IMessage";
import { ITokenStream } from "@parser/interface/ITokenStream";
import { TokenHelper } from "@parser/TokenHelper";

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
        const result: IToken[] = [];

        while (!this.eof()) {
            const token = this.read();
            result.push(token);
            if (token.category === TokenCategory.EOL) {
                break;
            }
        }

        return result;
    }

    public warn(token: IToken, message: string): void {

        this.messages.push({
            position: token.position,
            text: message,
            type: MessageType.Warning
        });
    }

    public expectOnly(lexeme: string): IToken {

        if (this.eof()) {
            this.error(this.tokens[this.tokens.length - 1], "Expected '" + lexeme + "', got end of file");
        }

        const token = this.read();

        if (token.lexeme !== lexeme) {
            this.expected("'" + lexeme + "'", token);
        }

        return token;
    }

    public expect(category: TokenCategory): IToken {

        if (this.eof()) {
            this.error(
                this.tokens[this.tokens.length - 1],
                "Expected '" + TokenHelper.categoryToString(category) + "', got end of file");
        }

        const token = this.read();

        if (token.category !== category) {
            this.expected(TokenHelper.categoryToString(category), token);
        }

        return token;
    }

    public expected(expected: string, got: IToken): void {

        this.messages.push({
            type: MessageType.Error,
            position: got.position,
            text: "Expected " + expected + ", got " + TokenHelper.tokenToString(got)
        });
        throw "";
    }

    public error(token: IToken, message: string): void {

        this.messages.push({
            position: token.position,
            text: message,
            type: MessageType.Error
        });
        throw "";
    }
}