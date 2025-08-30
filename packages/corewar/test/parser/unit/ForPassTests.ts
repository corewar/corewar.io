import { expect } from 'chai'
import * as sinon from 'sinon'

import { IToken, TokenCategory } from '@parser/interface/IToken'
import { Context } from '@parser/Context'
import { Parser } from '@parser/Parser'
import { ForPass } from '@parser/ForPass'
import { Expression } from '@parser/Expression'
import { MessageType } from '@parser/interface/IMessage'
import { TestHelper } from '../unit/TestHelper'
'use strict'

describe('ForPass', () => {
    it('Inserts for instruction into token stream the requested number of times', () => {
        const instruction = TestHelper.instruction(2, 'label', 'MOV', '.AB', '#', '0', ',', '$', '1', '; comment')

        const expression = new Expression()
        sinon.stub(expression, 'parse').returns(3)

        const tokens: IToken[] = TestHelper.forStatement(1, instruction)

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new ForPass(expression)
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens.length).to.be.equal(instruction.length * 3)

        for (let i = 0; i < instruction.length * 3; i++) {
            expect(actual.tokens[i].lexeme).to.be.equal(instruction[i % instruction.length].lexeme)
        }
    })

    it('Inserts multiple instructions', () => {
        const instruction1 = TestHelper.instruction(2, 'label', 'MOV', '.AB', '#', '0', ',', '$', '1', '; comment')
        const instruction2 = TestHelper.instruction(3, '', 'ADD', '.X', '@', '1', ',', '', '2', '')

        const expected = instruction1.concat(instruction2)

        const expression = new Expression()
        sinon.stub(expression, 'parse').returns(1)

        const tokens: IToken[] = TestHelper.forStatement(1, expected)

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new ForPass(expression)
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens.length).to.be.equal(expected.length)

        for (let i = 0; i < expected.length; i++) {
            expect(actual.tokens[i].lexeme).to.be.equal(expected[i].lexeme)
        }
    })

    it('Raises a syntax error if the FOR loop is not terminated by a ROF preprocessor command', () => {
        const instruction = TestHelper.instruction(2, 'label', 'MOV', '.AB', '#', '0', ',', '$', '1', '; comment')

        const expression = new Expression()
        sinon.stub(expression, 'parse').returns(3)

        const tokens: IToken[] = TestHelper.forStatement(1, instruction)
        tokens.pop() // Remove EOL
        tokens.pop() // Remove ROF

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new ForPass(expression)
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(1)
        expect(actual.messages[0].text).to.be.equal("Expected 'ROF', got end of file")
        expect(actual.messages[0].type).to.be.equal(MessageType.Error)
        expect(actual.messages[0].position).to.deep.equal({ line: 2, char: 9 })
    })

    it('Allows a comment to follow the for and rof lines', () => {
        const tokens = [
            {
                category: TokenCategory.Preprocessor,
                lexeme: 'FOR',
                position: { line: 1, char: 1 }
            },
            {
                category: TokenCategory.Number,
                lexeme: '1',
                position: { line: 1, char: 1 }
            },
            {
                category: TokenCategory.Comment,
                lexeme: '; this is a comment',
                position: { line: 1, char: 1 }
            },
            {
                category: TokenCategory.EOL,
                lexeme: '\n',
                position: { line: 1, char: 1 }
            },

            {
                category: TokenCategory.Opcode,
                lexeme: 'MOV',
                position: { line: 1, char: 1 }
            },
            {
                category: TokenCategory.Number,
                lexeme: '0',
                position: { line: 1, char: 1 }
            },
            {
                category: TokenCategory.Comma,
                lexeme: ',',
                position: { line: 1, char: 1 }
            },
            {
                category: TokenCategory.Number,
                lexeme: '1',
                position: { line: 1, char: 1 }
            },
            {
                category: TokenCategory.EOL,
                lexeme: '\n',
                position: { line: 1, char: 1 }
            },

            {
                category: TokenCategory.Preprocessor,
                lexeme: 'ROF',
                position: { line: 1, char: 1 }
            },
            {
                category: TokenCategory.Comment,
                lexeme: '; this is another comment',
                position: { line: 1, char: 1 }
            },
            {
                category: TokenCategory.EOL,
                lexeme: '\n',
                position: { line: 1, char: 1 }
            }
        ]

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new ForPass(new Expression())
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(0)
    })

    it('Allows labels to precede the FOR command', () => {
        const instruction = TestHelper.instruction(2, 'label', 'MOV', '.AB', '#', '0', ',', '$', '1', '; comment')

        const expression = new Expression()
        sinon.stub(expression, 'parse').returns(3)

        const tokens: IToken[] = TestHelper.forStatement(1, instruction)
        tokens.unshift({
            position: {
                line: 0,
                char: 0
            },
            lexeme: 'LABEL1',
            category: TokenCategory.Label
        })

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new ForPass(expression)
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens.length).to.be.equal(instruction.length * 3)

        for (let i = 0; i < instruction.length * 3; i++) {
            expect(actual.tokens[i].lexeme).to.be.equal(instruction[i % instruction.length].lexeme)
        }
    })

    it('Ignores labels followed by preprocessor commands other than FOR', () => {
        const tokens = [
            {
                category: TokenCategory.Label,
                lexeme: 'SomeLabel',
                position: { line: 0, char: 0 }
            },
            {
                category: TokenCategory.Preprocessor,
                lexeme: 'BUM',
                position: { line: 0, char: 1 }
            },
            {
                category: TokenCategory.EOL,
                lexeme: '\n',
                position: { line: 0, char: 3 }
            }
        ]

        const expression = new Expression()
        sinon.stub(expression, 'parse').returns(3)

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new ForPass(expression)
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens.length).to.be.equal(tokens.length)

        for (let i = 0; i < tokens.length; i++) {
            expect(actual.tokens[i].lexeme).to.be.equal(tokens[i].lexeme)
        }
    })
})
