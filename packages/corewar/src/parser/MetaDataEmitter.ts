import { IPass } from './interface/IPass'
import { IContext } from './interface/IContext'
import { IParseOptions, Standard } from './interface/IParseOptions'
import { IToken, TokenCategory } from './interface/IToken'

export class MetaDataEmitter implements IPass {
    private tokens: IToken[]

    public process(context: IContext, options: IParseOptions): IContext {
        this.tokens = []

        this.emitStandard(options.standard)

        if (context.metaData.name) {
            this.emitName(context.metaData.name)
        }

        if (context.metaData.author) {
            this.emitAuthor(context.metaData.author)
        }

        if (context.metaData.strategy) {
            this.emitStrategy(context.metaData.strategy)
        }

        context.tokens = this.tokens.concat(context.tokens)

        return context
    }

    private emitComment(comment: string): void {
        const commentTokens: IToken[] = [
            {
                category: TokenCategory.Comment,
                lexeme: comment,
                position: { char: 0, line: 0 }
            },
            {
                category: TokenCategory.EOL,
                lexeme: '\n',
                position: { char: 0, line: 0 }
            }
        ]

        this.tokens = this.tokens.concat(commentTokens)
    }

    private emitStandard(standard: Standard): void {
        switch (standard) {
            case Standard.ICWS86:
                this.emitComment(';redcode-86')
                break
            case Standard.ICWS88:
                this.emitComment(';redcode-88')
                break
            case Standard.ICWS94draft:
                this.emitComment(';redcode-94')
                break
        }
    }

    private emitName(name: string): void {
        this.emitComment(';name ' + name)
    }

    private emitAuthor(author: string): void {
        this.emitComment(';author ' + author)
    }

    private emitStrategy(strategy: string): void {
        strategy.split('\n').forEach(s => {
            if (s.trim() === '') {
                return
            }

            this.emitComment(';strategy ' + s)
        })
    }
}
