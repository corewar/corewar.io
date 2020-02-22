import { IScanner } from '@parser/interface/IScanner'
import { IContext } from '@parser/interface/IContext'
import { IToken, IPosition, TokenCategory } from '@parser/interface/IToken'
import { IParseOptions, Standard } from '@parser/interface/IParseOptions'

import { Context } from '@parser/Context'

interface IScannerRegex {
    LabelRE: RegExp
    OpcodeRE: RegExp
    PreprocessorRE: RegExp
    ModifierRE: RegExp
    ModeRE: RegExp
    NumberRE: RegExp
    CommaRE: RegExp
    MathsRE: RegExp
    CommentRE: RegExp
    Whitespace: RegExp
}

export class Scanner implements IScanner {
    private context: IContext
    private position: IPosition
    private regex: IScannerRegex
    private options: IParseOptions
    private previous: IToken

    public scan(document: string, options: IParseOptions): IContext {
        document = document.replace(/[\r]/g, '')

        this.context = new Context()
        this.position = {
            line: 1,
            char: 1
        }

        const lines = document.split('\n')

        this.options = options
        this.regex = this.selectRegexes(options.standard)

        lines.forEach((line: string) => {
            this.readLine(line)
            this.position.line++
        })

        return this.context
    }

    private static ICWS94draftRegex: IScannerRegex = {
        LabelRE: /^[A-Z_][A-Z_0-9]*:?/i,
        OpcodeRE: /^(DAT|MOV|ADD|SUB|MUL|DIV|MOD|JMP|JMZ|JMN|DJN|CMP|SLT|SPL|SEQ|SNE|NOP)(?!\w)/i,
        PreprocessorRE: /^(EQU|END|ORG|FOR|ROF)(?!\w)/i,
        ModifierRE: /^\.(AB|BA|A|B|F|X|I)/i,
        ModeRE: /^(#|\$|@|<|>|{|}|\*)/,
        NumberRE: /^[0-9]+/,
        CommaRE: /^,/,
        MathsRE: /^(\+|-|\*|\/|%|\(|\))/,
        CommentRE: /^;.*/,
        Whitespace: /^[ \t]/
    }

    private static ICWS88Regex: IScannerRegex = {
        LabelRE: /^[A-Z][A-Z0-9]*:?/i,
        OpcodeRE: /^(DAT|MOV|ADD|SUB|JMP|JMZ|JMN|CMP|SLT|DJN|SPL)(?!\w)/i,
        PreprocessorRE: /^(END|EQU)(?!\w)/i,
        ModifierRE: /$a/i,
        ModeRE: /^(#|\$|@|<)/,
        NumberRE: /^[0-9]+/,
        CommaRE: /^,/,
        MathsRE: /^(\+|-|\*|\/)/,
        CommentRE: /^;.*/,
        Whitespace: /^[ \t]/
    }

    private static ICWS86Regex: IScannerRegex = {
        LabelRE: /^[A-Z][A-Z0-9]{0,7}(?![A-Z0-9]):?/i,
        OpcodeRE: /^(DAT|MOV|ADD|SUB|JMP|JMZ|JMN|CMP|DJN|SPL)(?!\w)/i,
        PreprocessorRE: /^(END)(?!\w)/i,
        ModifierRE: /$a/i,
        ModeRE: /^(#|\$|@|<)/,
        NumberRE: /^[0-9]+/,
        CommaRE: /^,/,
        MathsRE: /^(\+|-)/,
        CommentRE: /^;.*/,
        Whitespace: /^[ \t]/
    }

    private selectRegexes(standard: Standard): IScannerRegex {
        switch (standard) {
            case Standard.ICWS94draft:
                return Scanner.ICWS94draftRegex
            case Standard.ICWS88:
                return Scanner.ICWS88Regex
            case Standard.ICWS86:
                return Scanner.ICWS86Regex
            default:
                throw 'Unsupported Corewar Standard'
        }
    }

    private readLine(line: string): void {
        let accumulator = ''
        this.position.char = 1

        for (let charNumber = 0; charNumber < line.length; charNumber++) {
            const c = line[charNumber]

            if (c === '\n') {
                break
            } else if (c === ';') {
                if (accumulator !== '') {
                    this.processAccumulator(accumulator)
                    accumulator = ''
                }

                this.position.char = charNumber + 2

                this.processComment(line.substr(charNumber))
                break
            }

            const result = this.regex.Whitespace.exec(c)

            if (result === null) {
                accumulator += c
            } else {
                if (accumulator !== '') {
                    this.processAccumulator(accumulator)
                    accumulator = ''
                }

                this.position.char = charNumber + 2
            }
        }

        if (accumulator !== '') {
            this.processAccumulator(accumulator)
            accumulator = ''
        }

        this.emitEndOfLine()
    }

    private indirectAModeCheck(category: TokenCategory, match: string): boolean {
        if (this.options.standard !== Standard.ICWS94draft) {
            return true
        }

        if (match !== '*') {
            return true
        }

        // HACK ICWS'94 uses * for both multiply and a field indirect addressing mode
        // If the previous token was an opcode or comma, treat this as an addressing mode
        // otherwise treat it as a multiply

        const previousOpcodeOrComma =
            this.previous.category === TokenCategory.Opcode ||
            this.previous.category === TokenCategory.Modifier ||
            this.previous.category === TokenCategory.Comma

        if (category === TokenCategory.Mode) {
            return previousOpcodeOrComma
        } else if (category === TokenCategory.Maths) {
            return !previousOpcodeOrComma
        } else {
            return true
        }
    }

    private processAccumulator(accumulator: string): void {
        let result: RegExpExecArray
        let found = 0

        const matchToken = (category: TokenCategory, re: RegExp): boolean => {
            result = re.exec(accumulator)

            if (result !== null && result.index === 0 && this.indirectAModeCheck(category, result[0])) {
                accumulator = this.processToken(category, accumulator, result[0], found !== 0)
                this.position.char += result[0].length
                found++
                return true
            }

            return false
        }

        while (accumulator !== '') {
            if (accumulator[0] === ';') {
                return
            }

            if (matchToken(TokenCategory.Comma, this.regex.CommaRE)) {
                continue
            }

            if (matchToken(TokenCategory.Modifier, this.regex.ModifierRE)) {
                continue
            }

            if (matchToken(TokenCategory.Mode, this.regex.ModeRE)) {
                continue
            }

            if (matchToken(TokenCategory.Number, this.regex.NumberRE)) {
                continue
            }

            if (matchToken(TokenCategory.Maths, this.regex.MathsRE)) {
                continue
            }

            if (matchToken(TokenCategory.Opcode, this.regex.OpcodeRE)) {
                continue
            }

            if (matchToken(TokenCategory.Preprocessor, this.regex.PreprocessorRE)) {
                continue
            }

            if (matchToken(TokenCategory.Label, this.regex.LabelRE)) {
                continue
            }

            if (matchToken(TokenCategory.Comment, this.regex.CommentRE)) {
                continue
            }

            accumulator = this.processToken(TokenCategory.Unknown, accumulator, accumulator, found !== 0)
        }
    }

    private processComment(lexeme: string): void {
        this.emit(TokenCategory.Comment, lexeme)
    }

    private isCaseInsensitive(category: TokenCategory): boolean {
        return (
            category === TokenCategory.Opcode ||
            category === TokenCategory.Modifier ||
            category === TokenCategory.Preprocessor
        )
    }

    private processToken(category: TokenCategory, accumulator: string, lexeme: string, found: boolean): string {
        // HACK ICWS'88/86 has optional commas and delimits operands using whitespace but this parser does not tokenise whitespace.
        // This workaround will allow a plus/minus to begin an operand and disallows whitespace after a maths operator.
        // This means that the following operands are not interpretted as a single expression: MOV 0 -1 bcomes MOV 0, -1 not MOV -1
        if (this.options.standard <= Standard.ICWS88) {
            if (!found && category === TokenCategory.Maths && (lexeme === '-' || lexeme === '+')) {
                this.emit(TokenCategory.Number, '0')
            } else if (category === TokenCategory.Maths && accumulator.length === 1) {
                category = TokenCategory.Unknown
            }
        }

        if (this.isCaseInsensitive(category)) {
            lexeme = lexeme.toUpperCase()
        }

        this.emit(category, lexeme.replace(':', ''))
        return accumulator.substr(lexeme.length)
    }

    private emitEndOfLine(): void {
        this.emit(TokenCategory.EOL, '\n')
    }

    private emit(category: TokenCategory, lexeme: string): void {
        this.previous = {
            position: {
                line: this.position.line,
                char: this.position.char
            },
            lexeme: lexeme,
            category: category
        }

        this.context.tokens.push(this.previous)
    }
}
