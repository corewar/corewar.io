﻿import { expect } from 'chai'

import { IToken, TokenCategory } from '@parser/interface/IToken'
import { DefaultPass } from '@parser/DefaultPass'
import { Parser } from '@parser/Parser'
import { Context } from '@parser/Context'
import { TestHelper } from '../unit/TestHelper'
import { Standard } from '@parser/interface/IParseOptions'

describe('DefaultPass', () => {
    it('Does not modify comments and fully qualified instructions', () => {
        const tokens: IToken[] = [
            {
                category: TokenCategory.Opcode,
                lexeme: 'MOV',
                position: { line: 1, char: 1 }
            },
            {
                category: TokenCategory.Modifier,
                lexeme: '.AB',
                position: { line: 1, char: 2 }
            },
            {
                category: TokenCategory.Mode,
                lexeme: '#',
                position: { line: 1, char: 3 }
            },
            {
                category: TokenCategory.Number,
                lexeme: '8',
                position: { line: 1, char: 4 }
            },
            {
                category: TokenCategory.Comma,
                lexeme: ',',
                position: { line: 1, char: 5 }
            },
            {
                category: TokenCategory.Mode,
                lexeme: '@',
                position: { line: 1, char: 6 }
            },
            {
                category: TokenCategory.Number,
                lexeme: '34',
                position: { line: 1, char: 7 }
            },
            {
                category: TokenCategory.Comment,
                lexeme: '; sdaflkj dsj kflaj fisfsd a',
                position: { line: 1, char: 8 }
            },
            {
                category: TokenCategory.EOL,
                lexeme: '\n',
                position: { line: 1, char: 8 }
            },

            {
                category: TokenCategory.Comment,
                lexeme: '; dalfja ds fdkl k  a',
                position: { line: 2, char: 1 }
            },
            {
                category: TokenCategory.EOL,
                lexeme: '\n',
                position: { line: 2, char: 2 }
            }
        ]

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(0)
        expect(actual.tokens.length).to.be.equal(11)

        for (let i = 0; i < actual.tokens.length; i++) {
            expect(actual.tokens[i].category).to.be.equal(tokens[i].category)
            expect(actual.tokens[i].lexeme).to.be.equal(tokens[i].lexeme)
            expect(actual.tokens[i].position).to.deep.equal(tokens[i].position)
        }
    })

    it('Defaults missing A and B operand modes to $', () => {
        const tokens: IToken[] = TestHelper.instruction(
            1,
            '',
            'MOV',
            '.AB',
            '',
            '8',
            ',',
            '',
            '34',
            '; sdaflkj dsj kflaj fisfsd a'
        )

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(0)
        expect(actual.tokens.length).to.be.equal(9)

        expect(actual.tokens[2].category).to.be.equal(TokenCategory.Mode)
        expect(actual.tokens[2].lexeme).to.be.equal('$')
        expect(actual.tokens[2].position).to.deep.equal({ line: 1, char: 4 })

        expect(actual.tokens[5].category).to.be.equal(TokenCategory.Mode)
        expect(actual.tokens[5].lexeme).to.be.equal('$')
        expect(actual.tokens[5].position).to.deep.equal({ line: 1, char: 7 })
    })

    it('Defaults missing A and B operand modes for DAT instructions to $', () => {
        const tokens: IToken[] = TestHelper.instruction(
            1,
            '',
            'MOV',
            '.AB',
            '',
            '8',
            ',',
            '',
            '34',
            '; sdaflkj dsj kflaj fisfsd a'
        )

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(0)
        expect(actual.tokens.length).to.be.equal(9)

        expect(actual.tokens[2].category).to.be.equal(TokenCategory.Mode)
        expect(actual.tokens[2].lexeme).to.be.equal('$')
        expect(actual.tokens[2].position).to.deep.equal({ line: 1, char: 4 })

        expect(actual.tokens[5].category).to.be.equal(TokenCategory.Mode)
        expect(actual.tokens[5].lexeme).to.be.equal('$')
        expect(actual.tokens[5].position).to.deep.equal({ line: 1, char: 7 })
    })

    it("Defaults the mode to # for DAT instructions under ICWS'88 standard", () => {
        const tokens: IToken[] = TestHelper.instruction(
            1,
            '',
            'DAT',
            '.AB',
            '',
            '8',
            ',',
            '',
            '34',
            '; sdaflkj dsj kflaj fisfsd a'
        )

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new DefaultPass()
        const actual = pass.process(context, Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS88 }))

        expect(actual.messages.length).to.be.equal(0)
        expect(actual.tokens.length).to.be.equal(9)

        expect(actual.tokens[2].category).to.be.equal(TokenCategory.Mode)
        expect(actual.tokens[2].lexeme).to.be.equal('#')
        expect(actual.tokens[2].position).to.deep.equal({ line: 1, char: 4 })

        expect(actual.tokens[5].category).to.be.equal(TokenCategory.Mode)
        expect(actual.tokens[5].lexeme).to.be.equal('#')
        expect(actual.tokens[5].position).to.deep.equal({ line: 1, char: 7 })
    })

    it("Defaults the mode to # for DAT instructions under ICWS'86 standard", () => {
        const tokens: IToken[] = TestHelper.instruction(
            1,
            '',
            'DAT',
            '.AB',
            '',
            '8',
            ',',
            '',
            '34',
            '; sdaflkj dsj kflaj fisfsd a'
        )

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new DefaultPass()
        const actual = pass.process(context, Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS86 }))

        expect(actual.messages.length).to.be.equal(0)
        expect(actual.tokens.length).to.be.equal(9)

        expect(actual.tokens[2].category).to.be.equal(TokenCategory.Mode)
        expect(actual.tokens[2].lexeme).to.be.equal('#')
        expect(actual.tokens[2].position).to.deep.equal({ line: 1, char: 4 })

        expect(actual.tokens[5].category).to.be.equal(TokenCategory.Mode)
        expect(actual.tokens[5].lexeme).to.be.equal('#')
        expect(actual.tokens[5].position).to.deep.equal({ line: 1, char: 7 })
    })

    it('Defaults missing B operand to $0 for non DAT instruction', () => {
        const tokens: IToken[] = TestHelper.instruction(
            1,
            '',
            'MOV',
            '.AB',
            '#',
            '8',
            '',
            '',
            '',
            '; sdaflkj dsj kflaj fisfsd a'
        )

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(0)
        expect(actual.tokens.length).to.be.equal(9)

        expect(actual.tokens[5].category).to.be.equal(TokenCategory.Mode)
        expect(actual.tokens[5].lexeme).to.be.equal('$')
        expect(actual.tokens[5].position).to.deep.equal({ line: 1, char: 8 })

        expect(actual.tokens[6].category).to.be.equal(TokenCategory.Number)
        expect(actual.tokens[6].lexeme).to.be.equal('0')
        expect(actual.tokens[6].position).to.deep.equal({ line: 1, char: 8 })
    })

    it('Defaults missing A operand to #0 for DAT instructions', () => {
        const tokens: IToken[] = TestHelper.instruction(
            1,
            '',
            'DAT',
            '.AB',
            '#',
            '8',
            '',
            '',
            '',
            '; sdaflkj dsj kflaj fisfsd a'
        )

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(0)
        expect(actual.tokens.length).to.be.equal(9)

        expect(actual.tokens[2].category).to.be.equal(TokenCategory.Mode)
        expect(actual.tokens[2].lexeme).to.be.equal('#')
        expect(actual.tokens[2].position).to.deep.equal({ line: 1, char: 3 })

        expect(actual.tokens[3].category).to.be.equal(TokenCategory.Number)
        expect(actual.tokens[3].lexeme).to.be.equal('0')
        expect(actual.tokens[3].position).to.deep.equal({ line: 1, char: 4 })

        expect(actual.tokens[4].category).to.be.equal(TokenCategory.Comma)
        expect(actual.tokens[4].lexeme).to.be.equal(',')

        expect(actual.tokens[5].category).to.be.equal(TokenCategory.Mode)
        expect(actual.tokens[5].lexeme).to.be.equal('#')
        expect(actual.tokens[5].position).to.deep.equal({ line: 1, char: 3 })

        expect(actual.tokens[6].category).to.be.equal(TokenCategory.Number)
        expect(actual.tokens[6].lexeme).to.be.equal('8')
        expect(actual.tokens[6].position).to.deep.equal({ line: 1, char: 4 })
    })

    it('Does not insert missing commas', () => {
        const tokens: IToken[] = TestHelper.instruction(
            1,
            '',
            'MOV',
            '.AB',
            '#',
            '8',
            '',
            '@',
            '34',
            '; sdaflkj dsj kflaj fisfsd a'
        )

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(0)
        expect(actual.tokens.length).to.be.equal(8)

        expect(actual.tokens.filter(a => a.category === TokenCategory.Comma).length).to.be.equal(0)
    })

    it("Inserts missing commas under ICWS'88 standard", () => {
        const tokens: IToken[] = TestHelper.instruction(
            1,
            '',
            'MOV',
            '.AB',
            '#',
            '8',
            '',
            '@',
            '34',
            '; sdaflkj dsj kflaj fisfsd a'
        )

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new DefaultPass()
        const actual = pass.process(context, Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS88 }))

        expect(actual.messages.length).to.be.equal(0)
        expect(actual.tokens.length).to.be.equal(9)

        expect(actual.tokens[4].category).to.be.equal(TokenCategory.Comma)
        expect(actual.tokens[4].lexeme).to.be.equal(',')
        expect(actual.tokens[4].position).to.deep.equal({ line: 1, char: 6 })
    })

    it("Inserts missing commas under ICWS'86 standard", () => {
        const tokens: IToken[] = TestHelper.instruction(
            1,
            '',
            'MOV',
            '.AB',
            '#',
            '8',
            '',
            '@',
            '34',
            '; sdaflkj dsj kflaj fisfsd a'
        )

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new DefaultPass()
        const actual = pass.process(context, Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS86 }))

        expect(actual.messages.length).to.be.equal(0)
        expect(actual.tokens.length).to.be.equal(9)

        expect(actual.tokens[4].category).to.be.equal(TokenCategory.Comma)
        expect(actual.tokens[4].lexeme).to.be.equal(',')
        expect(actual.tokens[4].position).to.deep.equal({ line: 1, char: 6 })
    })

    it('Defaults the modifier to F for DAT instructions', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'DAT', '', '#', '0', ',', '#', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.F')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to AB for MOV instructions with an A mode of #', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'MOV', '', '#', '0', ',', '$', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.AB')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to AB for CMP instructions with an A mode of #', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'CMP', '', '#', '0', ',', '$', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.AB')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to AB for SEQ instructions with an A mode of #', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'SEQ', '', '#', '0', ',', '$', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.AB')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to AB for SNE instructions with an A mode of #', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'SNE', '', '#', '0', ',', '$', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.AB')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to B for MOV instructions with a B mode of #', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'MOV', '', '$', '0', ',', '#', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.B')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to B for CMP instructions with a B mode of #', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'CMP', '', '$', '0', ',', '#', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.B')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to B for SEQ instructions with a B mode of #', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'SEQ', '', '$', '0', ',', '#', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.B')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to B for SNE instructions with a B mode of #', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'SNE', '', '$', '0', ',', '#', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.B')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to I for MOV instructions with no # mode operands', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'MOV', '', '$', '0', ',', '@', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.I')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to I for CMP instructions with no # mode operands', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'CMP', '', '$', '0', ',', '@', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.I')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to I for SEQ instructions with no # mode operands', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'SEQ', '', '$', '0', ',', '@', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.I')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to I for SNE instructions with no # mode operands', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'SNE', '', '$', '0', ',', '@', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.I')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to AB for ADD instructions with an A mode of #', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'ADD', '', '#', '0', ',', '@', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.AB')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to AB for SUB instructions with an A mode of #', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'SUB', '', '#', '0', ',', '@', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.AB')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to AB for MUL instructions with an A mode of #', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'MUL', '', '#', '0', ',', '@', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.AB')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to AB for DIV instructions with an A mode of #', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'DIV', '', '#', '0', ',', '@', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.AB')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to AB for MOD instructions with an A mode of #', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'MOD', '', '#', '0', ',', '@', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.AB')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to B for ADD instructions with a B mode of #', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'ADD', '', '$', '0', ',', '#', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.B')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to B for SUB instructions with a B mode of #', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'SUB', '', '$', '0', ',', '#', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.B')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to B for MUL instructions with a B mode of #', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'MUL', '', '$', '0', ',', '#', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.B')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to B for DIV instructions with a B mode of #', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'DIV', '', '$', '0', ',', '#', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.B')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to B for MOD instructions with a B mode of #', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'MOD', '', '$', '0', ',', '#', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.B')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to F for ADD instructions with no # mode operands', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'ADD', '', '$', '0', ',', '>', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.F')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to F for SUB instructions with no # mode operands', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'SUB', '', '$', '0', ',', '>', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.F')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to F for MUL instructions with no # mode operands', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'MUL', '', '$', '0', ',', '>', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.F')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to F for DIV instructions with no # mode operands', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'DIV', '', '$', '0', ',', '>', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.F')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to F for MOD instructions with no # mode operands', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'MOD', '', '$', '0', ',', '>', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.F')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it("Defaults the modifier to B for ADD instructions with no # mode operands under ICWS'86 standard", () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'ADD', '', '$', '0', ',', '>', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS86 }))

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.B')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it("Defaults the modifier to B for SUB instructions with no # mode operands under ICWS'86 standard", () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'SUB', '', '$', '0', ',', '>', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS86 }))

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.B')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it("Defaults the modifier to B for MUL instructions with no # mode operands under ICWS'86 standard", () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'MUL', '', '$', '0', ',', '>', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS86 }))

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.B')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it("Defaults the modifier to B for DIV instructions with no # mode operands under ICWS'86 standard", () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'DIV', '', '$', '0', ',', '>', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS86 }))

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.B')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it("Defaults the modifier to B for MOD instructions with no # mode operands under ICWS'86 standard", () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'MOD', '', '$', '0', ',', '>', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS86 }))

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.B')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    }) //////////////

    it('Defaults the modifier to AB for SLT instructions with an A mode of #', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'SLT', '', '#', '0', ',', '>', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.AB')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to B for SLT instructions with a B mode of #', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'SLT', '', '<', '0', ',', '#', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.B')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to AB for SLT instructions where both operands use the # mode', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'SLT', '', '#', '0', ',', '#', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.AB')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to B for JMP instructions', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'JMP', '', '#', '0', ',', '#', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.B')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to B for JMZ instructions', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'JMZ', '', '#', '0', ',', '#', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.B')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to B for JMN instructions', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'JMN', '', '#', '0', ',', '#', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.B')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to B for DJN instructions', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'DJN', '', '#', '0', ',', '#', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.B')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to B for SPL instructions', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'SPL', '', '#', '0', ',', '#', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.B')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Defaults the modifier to B for NOP instructions', () => {
        const context = new Context()
        context.tokens = TestHelper.instruction(1, '', 'NOP', '', '#', '0', ',', '#', '0', '')

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.B')
        expect(actual.tokens[1].position).to.deep.equal({ line: 1, char: 1 })
    })

    it('Should emit only opcode, modifier and a addressing mode if a operand address is missing', () => {
        const tokens: IToken[] = TestHelper.instruction(
            1,
            '',
            'MOV',
            '',
            '$',
            '',
            ',',
            '',
            '34',
            '; sdaflkj dsj kflaj fisfsd a'
        )

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new DefaultPass()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(0)
        expect(actual.tokens.length).to.be.equal(5)

        expect(actual.tokens[0].category).to.be.equal(TokenCategory.Opcode)
        expect(actual.tokens[0].lexeme).to.be.equal('MOV')

        expect(actual.tokens[1].category).to.be.equal(TokenCategory.Modifier)
        expect(actual.tokens[1].lexeme).to.be.equal('.I')

        expect(actual.tokens[2].category).to.be.equal(TokenCategory.Mode)
        expect(actual.tokens[2].lexeme).to.be.equal('$')
    })
})
