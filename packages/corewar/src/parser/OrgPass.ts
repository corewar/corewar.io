import { IToken, TokenCategory } from '@parser/interface/IToken'
import { IContext } from '@parser/interface/IContext'
import { IParseOptions, Standard } from '@parser/interface/IParseOptions'
import { PassBase } from '@parser/PassBase'

export class OrgPass extends PassBase {
    private firstInstruction: number
    private orgAddress: number
    private orgComment: IToken
    private org: IToken

    public process(context: IContext, options: IParseOptions): IContext {
        // Replace END ### with ORG ###
        // Emit ORG as first instruction
        // Raise warning for duplicate ORGs / END ###
        // Under ICWS'86 - if no END ### found, if start label defined, emit ORG start

        this.firstInstruction = null
        this.org = null
        this.orgAddress = null
        this.orgComment = null

        const result = super.process(context, options)

        this.emitOrg()

        return result
    }

    public processLine(): void {
        const next = this.stream.peek()

        if (this.firstInstruction === null && next.category !== TokenCategory.Comment) {
            this.firstInstruction = this.stream.position
        }

        if (next.category === TokenCategory.Preprocessor) {
            if (next.lexeme === 'ORG') {
                this.processOrg()
            } else if (next.lexeme === 'END') {
                this.processEnd()
            } else {
                this.context.emit(this.stream.readToEOL())
            }
        } else {
            this.context.emit(this.stream.readToEOL())
        }
    }

    private processOrg(): void {
        const org = this.stream.expectOnly('ORG')
        this.org = org

        if (this.orgAddress !== null) {
            this.stream.warn(org, 'Redefinition of ORG encountered, this later definition will take effect')
        }

        const address = this.stream.expect(TokenCategory.Number)

        this.orgAddress = parseInt(address.lexeme, 10)

        if (this.stream.peek().category === TokenCategory.Comment) {
            this.orgComment = this.stream.read()
        }

        this.stream.expect(TokenCategory.EOL)
    }

    private processEnd(): void {
        const end = this.stream.expectOnly('END')
        let address: IToken = null

        if (this.stream.peek().category === TokenCategory.Number) {
            address = this.stream.read()
        }

        if (this.stream.peek().category === TokenCategory.Comment) {
            this.stream.read()
        }

        this.stream.expect(TokenCategory.EOL)

        if (address !== null) {
            if (this.orgAddress !== null) {
                this.stream.warn(end, 'Encountered both ORG and END address, the ORG definition will take effect')
            } else {
                this.org = end
                this.orgAddress = parseInt(address.lexeme, 10)
            }
        }
    }

    private static START_LABEL = 'start'

    private emitOrg(): void {
        if (this.orgAddress === null) {
            if (
                this.options.standard === Standard.ICWS86 &&
                Object.keys(this.context.labels).includes(OrgPass.START_LABEL)
            ) {
                this.orgAddress = this.context.labels[OrgPass.START_LABEL]
            } else {
                this.orgAddress = 0
            }

            this.org = {
                category: TokenCategory.Preprocessor,
                lexeme: 'ORG',
                position: { line: 1, char: 1 }
            }
        }

        const org = {
            category: TokenCategory.Preprocessor,
            lexeme: 'ORG',
            position: Object.assign({}, this.org.position)
        }

        const address = {
            category: TokenCategory.Number,
            lexeme: this.orgAddress.toString(),
            position: Object.assign({}, this.org.position)
        }

        const instruction: IToken[] = [org, address]

        if (this.orgComment !== null) {
            instruction.push(this.orgComment)
        }

        instruction.push({
            category: TokenCategory.EOL,
            lexeme: '\n',
            position: Object.assign({}, this.org.position)
        })

        this.context.tokens.splice(this.firstInstruction, 0, ...instruction)
    }
}
