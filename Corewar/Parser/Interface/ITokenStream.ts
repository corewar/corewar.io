import { IToken, TokenCategory } from "./IToken";

export interface ITokenStream {

    position: number;
    tokens: IToken[];

    eof(): boolean;
    peek(): IToken;
    read(): IToken;
    readToEOL(): IToken[];

    warn(token: IToken, message: string): void;
    expectOnly(lexeme: string): IToken;
    expect(category: TokenCategory): IToken;
    expected(expected: string, got: IToken): void;
    error(token: IToken, message: string): void;
}
