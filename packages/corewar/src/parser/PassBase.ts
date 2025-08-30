import { IPass } from './interface/IPass'
import { IContext } from './interface/IContext'
import { ITokenStream } from './interface/ITokenStream'
import { IParseOptions } from './interface/IParseOptions'

import { TokenStream } from './TokenStream'

export class PassBase implements IPass {
    protected context: IContext
    protected stream: ITokenStream
    protected options: IParseOptions

    public process(context: IContext, options: IParseOptions): IContext {
        // TODO CONSTANTS - need to define core settings at compile time
        // TODO P-Space
        // TODO ;redcode tags
        // TODO stringify and FOR variables
        // TODO loader should check against run options e.g. no P-space etc.

        this.context = context
        this.stream = new TokenStream(context.tokens, context.messages)
        this.context.tokens = []
        this.options = options

        this.processLines()

        return this.context
    }

    private processLines(): void {
        while (!this.stream.eof()) {
            try {
                this.processLine()
            } catch (err) {
                this.stream.readToEOL()
            }
        }
    }

    public processLine(): void {
        throw new Error('PassBase.processLine is an Abstract Method')
    }
}
