import { expect } from 'chai'

import { IToken, TokenCategory } from '@parser/interface/IToken'
import { IContext } from '@parser/interface/IContext'
import { Context } from '@parser/Context'
import { TestHelper } from '@parser/tests/unit/TestHelper'
import { Parser } from '@parser/Parser'
import { SyntaxCheck } from '@parser/SyntaxCheck'
import { MessageType, IMessage } from '@parser/interface/IMessage'

describe('SyntaxCheck', () => {
    let context: IContext

    let instructionTokens: IToken[]

    beforeEach(() => {
        context = new Context()
        instructionTokens = TestHelper.instruction(1, '', 'MOV', '.AB', '#', '23', ',', '$', '45', '')
    })

    it('returns syntax errors for empty lines', () => {
        const tokens: IToken[] = TestHelper.emptyLine(1)
            .concat(TestHelper.emptyLine(2))
            .concat(TestHelper.emptyLine(3))
            .concat(TestHelper.emptyLine(4))

        context.tokens = tokens.slice()

        const parser = new SyntaxCheck()
        const actual = parser.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(4)
        expect(actual.tokens.length).to.be.equal(0)

        expect(actual.messages[0].position).to.deep.equal(tokens[0].position)
        expect(actual.messages[1].position).to.deep.equal(tokens[1].position)
        expect(actual.messages[2].position).to.deep.equal(tokens[2].position)
        expect(actual.messages[3].position).to.deep.equal(tokens[3].position)

        actual.messages.forEach((message: IMessage) => {
            expect(message.type).to.be.equal(MessageType.Error)
            expect(message.text).to.be.equal('Expected instruction or comment, got end of line')
        })
    })

    it('parses comments', () => {
        const tokens: IToken[] = TestHelper.comment(1, '; this is a comment').concat(
            TestHelper.comment(2, '; this is a second comment')
        )

        context.tokens = tokens.slice()

        const parser = new SyntaxCheck()

        const actual = parser.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(0)
        expect(actual.tokens.length).to.be.equal(4)
        expect(actual.tokens[0]).to.deep.equal(tokens[0])
        expect(actual.tokens[2]).to.deep.equal(tokens[2])
    })

    it('parses instructions', () => {
        const tokens: IToken[] = instructionTokens.slice(0)

        context.tokens = tokens.slice()

        const parser = new SyntaxCheck()
        const actual = parser.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(0)

        for (let i = 0; i < context.tokens.length; i++) {
            expect(tokens[i]).to.deep.equal(actual.tokens[i])
        }
    })

    it('parses instructions followed by a comment', () => {
        let tokens: IToken[] = instructionTokens.slice(0)

        // Insert a comment before the final new line token
        tokens = tokens.splice(7, 0, {
            category: TokenCategory.Comment,
            lexeme: '; this is a comment',
            position: { line: 1, char: 16 }
        })

        context.tokens = tokens.slice()

        const parser = new SyntaxCheck()
        const actual = parser.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(0)

        for (let i = 0; i < context.tokens.length; i++) {
            expect(tokens[i]).to.deep.equal(actual.tokens[i])
        }
    })

    it('returns a syntax error if an instruction does not begin with an opcode', () => {
        const tokens: IToken[] = instructionTokens.slice(0)

        tokens[0].category = TokenCategory.Comma
        tokens[0].lexeme = ','

        context.tokens = tokens.slice()

        const parser = new SyntaxCheck()
        const actual = parser.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(1)

        expect(actual.messages[0].type).to.be.equal(MessageType.Error)
        expect(actual.messages[0].position).to.deep.equal({ line: 1, char: 1 })
        expect(actual.messages[0].text).to.be.equal("Expected instruction or comment, got ','")
    })

    it('returns a syntax error if an opcode does not have a modifier', () => {
        const tokens: IToken[] = instructionTokens.slice(0)

        tokens[1].category = TokenCategory.Mode
        tokens[1].lexeme = '@'

        context.tokens = tokens.slice()

        const parser = new SyntaxCheck()
        const actual = parser.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(1)

        expect(actual.messages[0].type).to.be.equal(MessageType.Error)
        expect(actual.messages[0].position).to.deep.equal({ line: 1, char: 2 })
        expect(actual.messages[0].text).to.be.equal("Expected modifier, got '@'")
    })

    it('returns a syntax error if an A field does not have a mode', () => {
        const tokens: IToken[] = instructionTokens.slice(0)

        tokens[2].category = TokenCategory.Number
        tokens[2].lexeme = '-4'

        context.tokens = tokens.slice()

        const parser = new SyntaxCheck()
        const actual = parser.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(1)

        expect(actual.messages[0].type).to.be.equal(MessageType.Error)
        expect(actual.messages[0].position).to.deep.equal({ line: 1, char: 3 })
        expect(actual.messages[0].text).to.be.equal("Expected mode, got '-4'")
    })

    it('returns a syntax error if an A field does not have a number', () => {
        const tokens: IToken[] = instructionTokens.slice(0)

        tokens[3].category = TokenCategory.Comma
        tokens[3].lexeme = ','

        context.tokens = tokens.slice()

        const parser = new SyntaxCheck()
        const actual = parser.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(1)

        expect(actual.messages[0].type).to.be.equal(MessageType.Error)
        expect(actual.messages[0].position).to.deep.equal({ line: 1, char: 4 })
        expect(actual.messages[0].text).to.be.equal("Expected number, got ','")
    })

    it('returns a syntax error if there is no comma between the A and B field', () => {
        const tokens: IToken[] = instructionTokens.slice(0)

        tokens[4].category = TokenCategory.Mode
        tokens[4].lexeme = '<'

        context.tokens = tokens.slice()

        const parser = new SyntaxCheck()
        const actual = parser.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(1)

        expect(actual.messages[0].type).to.be.equal(MessageType.Error)
        expect(actual.messages[0].position).to.deep.equal({ line: 1, char: 5 })
        expect(actual.messages[0].text).to.be.equal("Expected ',', got '<'")
    })

    it('returns a syntax error if a B field does not have a mode', () => {
        const tokens: IToken[] = instructionTokens.slice(0)

        tokens[5].category = TokenCategory.Comment
        tokens[5].lexeme = '; dfsfdsa'

        context.tokens = tokens.slice()

        const parser = new SyntaxCheck()
        const actual = parser.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(1)

        expect(actual.messages[0].type).to.be.equal(MessageType.Error)
        expect(actual.messages[0].position).to.deep.equal({ line: 1, char: 6 })
        expect(actual.messages[0].text).to.be.equal("Expected mode, got ';'")
    })

    it('returns a syntax error if a B field does not have a number', () => {
        const tokens: IToken[] = instructionTokens.slice(0)

        tokens[6].category = TokenCategory.Comment
        tokens[6].lexeme = '; comment'

        context.tokens = tokens.slice()

        const parser = new SyntaxCheck()
        const actual = parser.process(context, Parser.DefaultOptions)

        expect(context.messages.length).to.be.equal(1)

        expect(actual.messages[0].type).to.be.equal(MessageType.Error)
        expect(actual.messages[0].position).to.deep.equal({ line: 1, char: 7 })
        expect(actual.messages[0].text).to.be.equal("Expected number, got ';'")
    })

    it('returns a syntax error if an instruction is not followed by a new line or comment', () => {
        const tokens: IToken[] = instructionTokens.slice(0)

        tokens[7].category = TokenCategory.Opcode
        tokens[7].lexeme = 'ADD'

        context.tokens = tokens.slice()

        const parser = new SyntaxCheck()
        const actual = parser.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(1)

        expect(actual.messages[0].type).to.be.equal(MessageType.Error)
        expect(actual.messages[0].position).to.deep.equal({ line: 1, char: 9 })
        expect(actual.messages[0].text).to.be.equal("Expected end of line, got 'ADD'")
    })

    it('returns multiple syntax errors if multiple lines are incorrect', () => {
        const tokens: IToken[] = TestHelper.comment(1, ';author gareththegeek')
            .concat(TestHelper.instruction(2, '', 'MOV', '', '', '23', '', '', '', ''))
            .concat(TestHelper.instruction(3, '', 'MOV', '.X', '$', '0', ',', '#', '1', ''))
            .concat(TestHelper.emptyLine(4))

        context.tokens = tokens.slice()

        const parser = new SyntaxCheck()
        const actual = parser.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(2)

        expect(actual.messages[0].type).to.be.equal(MessageType.Error)
        expect(actual.messages[0].position).to.deep.equal({ line: 2, char: 4 })
        expect(actual.messages[0].text).to.be.equal("Expected modifier, got '23'")

        expect(actual.messages[1].type).to.be.equal(MessageType.Error)
        expect(actual.messages[1].position).to.deep.equal({ line: 4, char: 1 })
        expect(actual.messages[1].text).to.be.equal('Expected instruction or comment, got end of line')
    })

    it('Does not modify or raise errors regarding ORG instructions', () => {
        const tokens: IToken[] = TestHelper.org(1, '3')

        context.tokens = tokens.slice()

        const parser = new SyntaxCheck()
        const actual = parser.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(0)
        expect(actual.tokens.length).to.be.equal(3)

        expect(actual.tokens[0].lexeme).to.be.equal('ORG')
        expect(actual.tokens[1].lexeme).to.be.equal('3')
        expect(actual.tokens[2].lexeme).to.be.equal('\n')
    })

    it('Does not modify or raise errors regarding END instructions', () => {
        const tokens: IToken[] = TestHelper.endStatement(1, '')

        context.tokens = tokens.slice()

        const parser = new SyntaxCheck()
        const actual = parser.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(0)
        expect(actual.tokens.length).to.be.equal(2)

        expect(actual.tokens[0].lexeme).to.be.equal('END')
        expect(actual.tokens[1].lexeme).to.be.equal('\n')
    })
})
