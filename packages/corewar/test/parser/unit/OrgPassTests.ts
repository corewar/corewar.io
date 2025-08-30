import { expect } from 'chai'

import { TestHelper } from '../unit/TestHelper'
import { Context } from '@parser/Context'
import { OrgPass } from '@parser/OrgPass'
import { Parser } from '@parser/Parser'
import { MessageType } from '@parser/interface/IMessage'
import { IToken, TokenCategory } from '@parser/interface/IToken'
import { Standard } from '@parser/interface/IParseOptions'

describe('OrgPass', () => {
    it('Makes the ORG instruction the first instruction in the output', () => {
        const tokens = TestHelper.comment(1, ';redcode')
            .concat(TestHelper.comment(2, ';author gareththegeek'))
            .concat(TestHelper.instruction(3, '', 'MOV', '', '$', '0', '', '', '', ''))
            .concat(TestHelper.org(4, '3'))

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new OrgPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(0)
        expect(actual.tokens.length).to.be.equal(11)

        expect(actual.tokens[0].lexeme).to.be.equal(';redcode')
        expect(actual.tokens[1].lexeme).to.be.equal('\n')

        expect(actual.tokens[2].lexeme).to.be.equal(';author gareththegeek')
        expect(actual.tokens[3].lexeme).to.be.equal('\n')

        expect(actual.tokens[4].lexeme).to.be.equal('ORG')
        expect(actual.tokens[5].lexeme).to.be.equal('3')
        expect(actual.tokens[6].lexeme).to.be.equal('\n')

        expect(actual.tokens[7].lexeme).to.be.equal('MOV')
        expect(actual.tokens[8].lexeme).to.be.equal('$')
        expect(actual.tokens[9].lexeme).to.be.equal('0')
        expect(actual.tokens[10].lexeme).to.be.equal('\n')
    })

    it('Inserts ORG 0 if no ORG statement found', () => {
        const tokens = TestHelper.instruction(1, '', 'MOV', '', '', '1', ',', '', '2', '').concat(
            TestHelper.instruction(2, '', 'ADD', '.F', '@', '2', ',', '', '3', '')
        )

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new OrgPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(0)
        expect(actual.tokens.length).to.be.equal(15)

        expect(actual.tokens[0].lexeme).to.be.equal('ORG')
        expect(actual.tokens[1].lexeme).to.be.equal('0')
        expect(actual.tokens[2].lexeme).to.be.equal('\n')

        expect(actual.tokens[3].lexeme).to.be.equal('MOV')
        expect(actual.tokens[4].lexeme).to.be.equal('1')
        expect(actual.tokens[5].lexeme).to.be.equal(',')
        expect(actual.tokens[6].lexeme).to.be.equal('2')
        expect(actual.tokens[7].lexeme).to.be.equal('\n')

        expect(actual.tokens[8].lexeme).to.be.equal('ADD')
        expect(actual.tokens[9].lexeme).to.be.equal('.F')
        expect(actual.tokens[10].lexeme).to.be.equal('@')
        expect(actual.tokens[11].lexeme).to.be.equal('2')
        expect(actual.tokens[12].lexeme).to.be.equal(',')
        expect(actual.tokens[13].lexeme).to.be.equal('3')
        expect(actual.tokens[14].lexeme).to.be.equal('\n')
    })

    it('Uses END address for ORG statement', () => {
        const tokens = TestHelper.instruction(1, '', 'MOV', '', '', '0', ',', '', '1', '').concat(
            TestHelper.endStatement(2, '2')
        )

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new OrgPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(0)
        expect(actual.tokens.length).to.be.equal(8)

        expect(actual.tokens[0].lexeme).to.be.equal('ORG')
        expect(actual.tokens[1].lexeme).to.be.equal('2')
        expect(actual.tokens[2].lexeme).to.be.equal('\n')

        expect(actual.tokens[3].lexeme).to.be.equal('MOV')
        expect(actual.tokens[4].lexeme).to.be.equal('0')
        expect(actual.tokens[5].lexeme).to.be.equal(',')
        expect(actual.tokens[6].lexeme).to.be.equal('1')
        expect(actual.tokens[7].lexeme).to.be.equal('\n')
    })

    it('Raises a warning if multiple ORG instructions are found and uses latest definition', () => {
        const tokens = TestHelper.org(1, '1')
            .concat(TestHelper.org(2, '2'))
            .concat(TestHelper.org(3, '3'))

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new OrgPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(2)

        expect(actual.messages[0].text).to.be.equal(
            'Redefinition of ORG encountered, this later definition will take effect'
        )
        expect(actual.messages[0].type).to.be.equal(MessageType.Warning)
        expect(actual.messages[0].position).to.deep.equal({ line: 2, char: 1 })

        expect(actual.messages[1].text).to.be.equal(
            'Redefinition of ORG encountered, this later definition will take effect'
        )
        expect(actual.messages[1].type).to.be.equal(MessageType.Warning)
        expect(actual.messages[1].position).to.deep.equal({ line: 3, char: 1 })

        expect(actual.tokens.length).to.be.equal(3)

        expect(actual.tokens[0].lexeme).to.be.equal('ORG')
        expect(actual.tokens[1].lexeme).to.be.equal('3')
        expect(actual.tokens[2].lexeme).to.be.equal('\n')
    })

    it('Raises a warning if both an ORG and END ### instruction are declared and uses the ORG definition', () => {
        const tokens = TestHelper.org(1, '1').concat(TestHelper.endStatement(2, '2'))

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new OrgPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(1)

        expect(actual.messages[0].text).to.be.equal(
            'Encountered both ORG and END address, the ORG definition will take effect'
        )
        expect(actual.messages[0].type).to.be.equal(MessageType.Warning)
        expect(actual.messages[0].position).to.deep.equal({ line: 2, char: 1 })

        expect(actual.tokens.length).to.be.equal(3)

        expect(actual.tokens[0].lexeme).to.be.equal('ORG')
        expect(actual.tokens[1].lexeme).to.be.equal('1')
        expect(actual.tokens[2].lexeme).to.be.equal('\n')
    })

    it('Raises a syntax error if ORG statement does not contain an address', () => {
        const tokens: IToken[] = [
            {
                category: TokenCategory.Preprocessor,
                lexeme: 'ORG',
                position: { line: 4, char: 5 }
            },
            {
                category: TokenCategory.EOL,
                lexeme: '\n',
                position: { line: 4, char: 6 }
            }
        ]

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new OrgPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(1)

        expect(actual.messages[0].text).to.be.equal('Expected number, got end of line')
        expect(actual.messages[0].type).to.be.equal(MessageType.Error)
        expect(actual.messages[0].position).to.deep.equal({ line: 4, char: 6 })
    })

    it('Raises a syntax error if ORG statement contains additional tokens before the end of line', () => {
        const tokens: IToken[] = [
            {
                category: TokenCategory.Preprocessor,
                lexeme: 'ORG',
                position: { line: 4, char: 5 }
            },
            {
                category: TokenCategory.Number,
                lexeme: '6',
                position: { line: 4, char: 6 }
            },
            {
                category: TokenCategory.Comment,
                lexeme: '; blah blah blah',
                position: { line: 4, char: 7 }
            },
            {
                category: TokenCategory.Opcode,
                lexeme: 'MOV',
                position: { line: 4, char: 8 }
            }
        ]

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new OrgPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(1)

        expect(actual.messages[0].text).to.be.equal("Expected end of line, got 'MOV'")
        expect(actual.messages[0].type).to.be.equal(MessageType.Error)
        expect(actual.messages[0].position).to.deep.equal({ line: 4, char: 8 })
    })

    it('Raises a syntax error if END statement contains additional tokens before the end of line', () => {
        const tokens: IToken[] = [
            {
                category: TokenCategory.Preprocessor,
                lexeme: 'END',
                position: { line: 4, char: 5 }
            },
            {
                category: TokenCategory.Opcode,
                lexeme: 'MOV',
                position: { line: 4, char: 8 }
            }
        ]

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new OrgPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(1)

        expect(actual.messages[0].text).to.be.equal("Expected end of line, got 'MOV'")
        expect(actual.messages[0].type).to.be.equal(MessageType.Error)
        expect(actual.messages[0].position).to.deep.equal({ line: 4, char: 8 })
    })

    it("Uses start label as default END address under ICWS'86 standard", () => {
        const tokens = TestHelper.instruction(1, '', 'MOV', '', '', '0', ',', '', '1', '')
            .concat(TestHelper.instruction(2, '', 'MOV', '', '', '0', ',', '', '1', ''))
            .concat(TestHelper.endStatement(3, '', '; this is a comment'))

        const context = new Context()
        context.tokens = tokens.slice()

        context.labels['start'] = 1

        const pass = new OrgPass()
        const actual = pass.process(context, Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS86 }))

        expect(actual.tokens[0].lexeme).to.be.equal('ORG')
        expect(actual.tokens[1].lexeme).to.be.equal('1')
    })

    it('Ignores lines which do not begin with ORG or END', () => {
        const tokens = [
            {
                position: { line: 0, char: 0 },
                lexeme: 'FOR',
                category: TokenCategory.Preprocessor
            },
            {
                position: { line: 0, char: 0 },
                lexeme: '5',
                category: TokenCategory.Number
            },
            {
                position: { line: 0, char: 0 },
                lexeme: '\n',
                category: TokenCategory.EOL
            }
        ]

        const context = new Context()
        context.tokens = tokens.slice()

        context.labels['start'] = 1

        const pass = new OrgPass()
        const actual = pass.process(context, Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS86 }))

        const orgInstructionLength = 3

        expect(actual.tokens.length).to.be.equal(tokens.length + orgInstructionLength)
        for (let i = 0; i < tokens.length; i++) {
            expect(actual.tokens[i + orgInstructionLength].lexeme).to.be.equal(tokens[i].lexeme)
        }
    })
})
