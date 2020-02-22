export enum TokenCategory {
    Label = 'LABEL',
    Opcode = 'OPCODE',
    Preprocessor = 'PREPROCESSOR',
    Modifier = 'MODIFIER',
    Mode = 'MODE',
    Number = 'NUMBER',
    Comma = 'COMMA',
    Maths = 'MATHS',
    EOL = 'EOL',
    Comment = 'COMMENT',
    Unknown = 'UNKNOWN'
}

export interface IPosition {
    line: number
    char: number
}

export interface IToken {
    position: IPosition
    lexeme: string
    category: TokenCategory
}
