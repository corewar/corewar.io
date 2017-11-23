
export enum TokenCategory {
    Label,
    Opcode,
    Preprocessor,
    Modifier,
    Mode,
    Number,
    Comma,
    Maths,
    EOL,
    Comment,
    Unknown
}

export interface IPosition {

    line: number;
    char: number;
}

export interface IToken {

    position: IPosition;
    lexeme: string;
    category: TokenCategory;
}