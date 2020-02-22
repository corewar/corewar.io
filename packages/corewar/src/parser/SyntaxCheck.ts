import { PassBase } from '@parser/PassBase'
import { TokenCategory } from '@parser/interface/IToken'

export class SyntaxCheck extends PassBase {
    public processLine(): void {
        const next = this.stream.peek()

        if (next.category === TokenCategory.Opcode) {
            this.parseInstruction()
        } else if (next.category === TokenCategory.Comment) {
            this.parseComment()
        } else if (next.category === TokenCategory.Preprocessor && (next.lexeme === 'END' || next.lexeme === 'ORG')) {
            this.context.emit(this.stream.readToEOL())
        } else {
            this.stream.expected('instruction or comment', next)
        }
    }

    private mustEmit(category: TokenCategory): void {
        const token = this.stream.expect(category)
        this.context.emitSingle(token)
    }

    private mayEmit(category: TokenCategory): void {
        if (this.stream.peek().category === category) {
            this.context.emitSingle(this.stream.read())
        }
    }

    private parseComment(): void {
        this.mustEmit(TokenCategory.Comment)
        this.mustEmit(TokenCategory.EOL)
    }

    private parseInstruction(): void {
        this.mustEmit(TokenCategory.Opcode)
        this.mustEmit(TokenCategory.Modifier)

        this.mustEmit(TokenCategory.Mode)
        this.mustEmit(TokenCategory.Number)
        this.mustEmit(TokenCategory.Comma)

        this.mustEmit(TokenCategory.Mode)
        this.mustEmit(TokenCategory.Number)

        this.mayEmit(TokenCategory.Comment)
        this.mustEmit(TokenCategory.EOL)
    }
}
