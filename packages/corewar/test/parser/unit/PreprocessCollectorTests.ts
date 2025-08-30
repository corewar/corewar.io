import { expect } from 'chai'

import { Context } from '@parser/Context'
import { IToken, TokenCategory } from '@parser/interface/IToken'
import { Parser } from '@parser/Parser'
import { PreprocessCollector } from '@parser/PreprocessCollector'
import { MessageType } from '@parser/interface/IMessage'
import { TestHelper } from '../unit/TestHelper'
import { Standard } from '@parser/interface/IParseOptions'

describe('PreprocessCollector', () => {
    it('Does not modify tokens if no EQU found', () => {
        const context = new Context()

        const tokens: IToken[] = [
            {
                category: TokenCategory.Comma,
                position: { line: 1, char: 1 },
                lexeme: ','
            },
            {
                category: TokenCategory.Comment,
                position: { line: 1, char: 1 },
                lexeme: '; thsifdsakl dsj sdkljf s'
            },
            {
                category: TokenCategory.EOL,
                position: { line: 1, char: 1 },
                lexeme: '\n'
            },
            {
                category: TokenCategory.Label,
                position: { line: 1, char: 1 },
                lexeme: 'label123'
            },
            {
                category: TokenCategory.Maths,
                position: { line: 1, char: 1 },
                lexeme: '+'
            },
            {
                category: TokenCategory.Mode,
                position: { line: 1, char: 1 },
                lexeme: '#'
            },
            {
                category: TokenCategory.Modifier,
                position: { line: 1, char: 1 },
                lexeme: '.I'
            },
            {
                category: TokenCategory.Number,
                position: { line: 1, char: 1 },
                lexeme: '7'
            },
            {
                category: TokenCategory.Opcode,
                position: { line: 1, char: 1 },
                lexeme: 'MOV'
            },
            {
                category: TokenCategory.Unknown,
                position: { line: 1, char: 1 },
                lexeme: '.'
            }
        ]

        context.tokens = tokens

        const pass = new PreprocessCollector()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens.length).to.be.equal(10)
        expect(actual.messages.length).to.be.equal(0)

        for (let i = 0; i < tokens.length; i++) {
            expect(tokens[i]).to.deep.equal(actual.tokens[i])
        }
    })

    it('Removes EQU statements from the output', () => {
        const line1 = TestHelper.instruction(1, '', 'MOV', '', '', '1', ',', '', '2', '')
        const line2 = TestHelper.equ(2, 'label1', [
            {
                category: TokenCategory.Label,
                lexeme: 'label1',
                position: { line: 2, char: 1 }
            },
            {
                category: TokenCategory.Number,
                lexeme: '7',
                position: { line: 2, char: 1 }
            }
        ])

        const line3 = TestHelper.instruction(3, '', 'ADD', '.BA', '#', '7', '', '', '', '')

        const expected = line1.concat(line3)

        const context = new Context()
        context.tokens = line1.concat(line2).concat(line3)

        const pass = new PreprocessCollector()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.tokens.length).to.be.equal(expected.length)
        expect(actual.messages.length).to.be.equal(0)

        for (let i = 0; i < expected.length; i++) {
            expect(actual.tokens[i]).to.deep.equal(expected[i])
        }
    })

    it('Records EQU label definitions in output', () => {
        const line1 = TestHelper.instruction(1, '', 'MOV', '', '', '1', ',', '', '2', '')

        const equDefinition = [
            {
                category: TokenCategory.Label,
                lexeme: 'label1',
                position: { line: 2, char: 1 }
            },
            {
                category: TokenCategory.Label,
                lexeme: 'label2',
                position: { line: 2, char: 1 }
            },
            {
                category: TokenCategory.Label,
                lexeme: 'label3',
                position: { line: 2, char: 1 }
            },
            {
                category: TokenCategory.Preprocessor,
                lexeme: 'EQU',
                position: { line: 2, char: 1 }
            }
        ]

        const equReplacement = [
            {
                category: TokenCategory.Opcode,
                lexeme: 'MOV',
                position: { line: 2, char: 1 }
            },
            {
                category: TokenCategory.Modifier,
                lexeme: '.X',
                position: { line: 2, char: 1 }
            },
            {
                category: TokenCategory.Mode,
                lexeme: '#',
                position: { line: 2, char: 1 }
            },
            {
                category: TokenCategory.Number,
                lexeme: '-1',
                position: { line: 2, char: 1 }
            },
            {
                category: TokenCategory.Comma,
                lexeme: ',',
                position: { line: 2, char: 1 }
            },
            {
                category: TokenCategory.Mode,
                lexeme: '$',
                position: { line: 2, char: 1 }
            },
            {
                category: TokenCategory.Label,
                lexeme: 'thisisalabel',
                position: { line: 2, char: 1 }
            },
            {
                category: TokenCategory.EOL,
                lexeme: '\n',
                position: { line: 2, char: 1 }
            }
        ]

        const line2 = equDefinition.concat(equReplacement)

        const line3 = TestHelper.instruction(3, '', 'ADD', '.BA', '#', '7', '', '', '', '')

        const context = new Context()
        context.tokens = line1.concat(line2).concat(line3)

        const pass = new PreprocessCollector()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.messages.length).to.be.equal(0)

        const label1Tokens = actual.equs['label1']
        const label2Tokens = actual.equs['label2']
        const label3Tokens = actual.equs['label3']

        expect(label1Tokens.length).to.be.equal(equReplacement.length - 1)
        expect(label2Tokens.length).to.be.equal(equReplacement.length - 1)
        expect(label3Tokens.length).to.be.equal(equReplacement.length - 1)

        for (let i = 0; i < equReplacement.length - 1; i++) {
            expect(label1Tokens[i]).to.deep.equal(equReplacement[i])
            expect(label2Tokens[i]).to.deep.equal(equReplacement[i])
            expect(label3Tokens[i]).to.deep.equal(equReplacement[i])
        }
    })

    it('Raises a warning if a label is redefined', () => {
        const line1 = TestHelper.equ(1, 'label1', [
            {
                category: TokenCategory.Opcode,
                lexeme: 'MOV',
                position: { line: 1, char: 3 }
            }
        ])

        const line2 = TestHelper.equ(2, 'label2', [
            {
                category: TokenCategory.Opcode,
                lexeme: 'ADD',
                position: { line: 2, char: 3 }
            }
        ])

        const line3 = TestHelper.equ(3, 'label1', [
            {
                category: TokenCategory.Opcode,
                lexeme: 'SUB',
                position: { line: 3, char: 3 }
            }
        ])

        const context = new Context()
        context.tokens = line1.concat(line2).concat(line3)

        const pass = new PreprocessCollector()
        pass.process(context, Parser.DefaultOptions)

        expect(context.messages.length).to.be.equal(1)

        expect(context.messages[0].position).to.deep.equal({ line: 3, char: 1 })
        expect(context.messages[0].text).to.be.equal("Redefinition of label 'label1', original definition will be used")
        expect(context.messages[0].type).to.be.equal(MessageType.Warning)
    })

    it('Takes the original EQU definition if a duplicate is found', () => {
        const movOpcode = {
            category: TokenCategory.Opcode,
            lexeme: 'MOV',
            position: { line: 1, char: 3 }
        }

        const addOpcode = {
            category: TokenCategory.Opcode,
            lexeme: 'ADD',
            position: { line: 1, char: 3 }
        }

        const line1 = TestHelper.equ(1, 'label1', [movOpcode])
        const line2 = TestHelper.equ(2, 'label1', [addOpcode])

        const context = new Context()
        context.tokens = line1.concat(line2)

        const pass = new PreprocessCollector()
        pass.process(context, Parser.DefaultOptions)

        const expression = context.equs['label1']

        expect(expression.length).to.be.equal(1)
        expect(expression[0]).to.deep.equal(movOpcode)
    })

    it('Does not register labels in output', () => {
        const context = new Context()

        const tokens: IToken[] = [
            {
                category: TokenCategory.Comma,
                position: { line: 1, char: 1 },
                lexeme: ','
            },
            {
                category: TokenCategory.Comment,
                position: { line: 1, char: 1 },
                lexeme: '; thsifdsakl dsj sdkljf s'
            },
            {
                category: TokenCategory.EOL,
                position: { line: 1, char: 1 },
                lexeme: '\n'
            },
            {
                category: TokenCategory.Label,
                position: { line: 1, char: 1 },
                lexeme: 'label123'
            },
            {
                category: TokenCategory.Maths,
                position: { line: 1, char: 1 },
                lexeme: '+'
            },
            {
                category: TokenCategory.Mode,
                position: { line: 1, char: 1 },
                lexeme: '#'
            },
            {
                category: TokenCategory.Modifier,
                position: { line: 1, char: 1 },
                lexeme: '.I'
            },
            {
                category: TokenCategory.Number,
                position: { line: 1, char: 1 },
                lexeme: '7'
            },
            {
                category: TokenCategory.Opcode,
                position: { line: 1, char: 1 },
                lexeme: 'MOV'
            },
            {
                category: TokenCategory.Unknown,
                position: { line: 1, char: 1 },
                lexeme: '.'
            }
        ]

        context.tokens = tokens

        const pass = new PreprocessCollector()
        pass.process(context, Parser.DefaultOptions)

        expect(context.labels).to.deep.equal({})
    })

    it('Does not include comments in EQU substitution', () => {
        const tokens = TestHelper.equ(
            1,
            'label1',
            TestHelper.instruction(1, '', 'MOV', '', '', '0', ',', '', '1', '; this is a comment')
        )

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new PreprocessCollector()
        const result = pass.process(context, Parser.DefaultOptions)

        const actual = result.equs['label1']

        expect(actual.length).to.be.equal(4)
        expect(actual[0].lexeme).to.be.equal('MOV')
        expect(actual[1].lexeme).to.be.equal('0')
        expect(actual[2].lexeme).to.be.equal(',')
        expect(actual[3].lexeme).to.be.equal('1')
    })

    it('Collects multi-line EQU statements in ICWS-94draft', () => {
        const instruction1 = TestHelper.instruction(1, '', 'MOV', '', '', '0', ',', '', '1', '')
        const instruction2 = TestHelper.instruction(2, '', 'ADD', '', '', '1', ',', '', '2', '')

        // Remove terminating newlines
        instruction1.pop()
        instruction2.pop()

        const tokens = TestHelper.equ(1, 'label2', instruction1).concat(TestHelper.equ(2, '', instruction2))

        tokens.unshift({
            category: TokenCategory.Label,
            lexeme: 'label1',
            position: { line: 1, char: 1 }
        })

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new PreprocessCollector()
        const result = pass.process(context, Parser.DefaultOptions)

        const label1 = result.equs['label1']
        const label2 = result.equs['label2']

        expect(label1.length).to.be.equal(9)
        expect(label2.length).to.be.equal(label1.length)

        for (let i = 0; i < label1.length; i++) {
            expect(label1[i].category).to.be.equal(label2[i].category)
            expect(label1[i].lexeme).to.be.equal(label2[i].lexeme)
            expect(label1[i].position).to.deep.equal(label2[i].position)
        }

        expect(label1[0].lexeme).to.be.equal('MOV')
        expect(label1[1].lexeme).to.be.equal('0')
        expect(label1[2].lexeme).to.be.equal(',')
        expect(label1[3].lexeme).to.be.equal('1')
        expect(label1[4].lexeme).to.be.equal('\n')
        expect(label1[5].lexeme).to.be.equal('ADD')
        expect(label1[6].lexeme).to.be.equal('1')
        expect(label1[7].lexeme).to.be.equal(',')
        expect(label1[8].lexeme).to.be.equal('2')
    })

    it("Doesn't collect multi-line EQU statements in ICWS-88", () => {
        const instruction1 = TestHelper.instruction(1, '', 'MOV', '', '', '0', ',', '', '1', '')
        const instruction2 = TestHelper.instruction(2, '', 'ADD', '', '', '1', ',', '', '2', '')

        // Remove terminating newlines
        instruction1.pop()
        instruction2.pop()

        const tokens = TestHelper.equ(1, 'label2', instruction1).concat(TestHelper.equ(2, '', instruction2))

        tokens.unshift({
            category: TokenCategory.Label,
            lexeme: 'label1',
            position: { line: 1, char: 1 }
        })

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new PreprocessCollector()
        const result = pass.process(context, Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS88 }))

        const label1 = result.equs['label1']
        const label2 = result.equs['label2']

        expect(label1.length).to.be.equal(4)
        expect(label2.length).to.be.equal(label1.length)

        for (let i = 0; i < label1.length; i++) {
            expect(label1[i].category).to.be.equal(label2[i].category)
            expect(label1[i].lexeme).to.be.equal(label2[i].lexeme)
            expect(label1[i].position).to.deep.equal(label2[i].position)
        }

        expect(label1[0].lexeme).to.be.equal('MOV')
        expect(label1[1].lexeme).to.be.equal('0')
        expect(label1[2].lexeme).to.be.equal(',')
        expect(label1[3].lexeme).to.be.equal('1')
    })
})
