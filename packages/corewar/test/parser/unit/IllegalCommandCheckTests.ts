import { expect } from 'chai'

import { TestHelper } from '@parser/tests/unit/TestHelper'
import { Context } from '@parser/Context'
import { IllegalCommandCheck } from '@parser/IllegalCommandCheck'
import { Parser } from '@parser/Parser'
import { MessageType } from '@parser/interface/IMessage'
import { Standard } from '@parser/interface/IParseOptions'

describe('IllegalCommandCheck', () => {
    it("Does not raise errors for legal addressing modes under the ICWS'88 standard", () => {
        const tokens = TestHelper.instruction(1, '', 'MOV', '.A', '#', '0', ',', '$', '0', '')
            .concat(TestHelper.instruction(2, '', 'MOV', '.A', '#', '0', ',', '@', '0', ''))
            .concat(TestHelper.instruction(3, '', 'SLT', '.A', '#', '0', ',', '<', '0', ''))
            .concat(TestHelper.instruction(4, '', 'SLT', '.A', '$', '0', ',', '$', '0', ''))
            .concat(TestHelper.instruction(5, '', 'DJN', '.A', '@', '0', ',', '#', '0', ''))
            .concat(TestHelper.instruction(6, '', 'DJN', '.A', '@', '0', ',', '$', '0', ''))
            .concat(TestHelper.instruction(7, '', 'SPL', '.A', '<', '0', ',', '#', '0', ''))
            .concat(TestHelper.instruction(8, '', 'SPL', '.A', '<', '0', ',', '$', '0', ''))
            .concat(TestHelper.instruction(9, '', 'ADD', '.A', '@', '0', ',', '@', '0', ''))
            .concat(TestHelper.instruction(10, '', 'ADD', '.A', '<', '0', ',', '<', '0', ''))
            .concat(TestHelper.instruction(11, '', 'JMP', '.A', '@', '0', ',', '<', '0', ''))
            .concat(TestHelper.instruction(12, '', 'JMP', '.A', '$', '0', ',', '#', '0', ''))
            .concat(TestHelper.instruction(13, '', 'DAT', '.A', '#', '0', ',', '#', '0', ''))
            .concat(TestHelper.instruction(14, '', 'DAT', '.A', '#', '0', ',', '<', '0', ''))
            .concat(TestHelper.instruction(15, '', 'SUB', '.A', '#', '0', ',', '$', '0', ''))
            .concat(TestHelper.instruction(16, '', 'SUB', '.A', '$', '0', ',', '@', '0', ''))
            .concat(TestHelper.instruction(17, '', 'JMZ', '.A', '@', '0', ',', '#', '0', ''))
            .concat(TestHelper.instruction(18, '', 'JMZ', '.A', '<', '0', ',', '<', '0', ''))
            .concat(TestHelper.instruction(19, '', 'CMP', '.A', '@', '0', ',', '$', '0', ''))
            .concat(TestHelper.instruction(20, '', 'CMP', '.A', '<', '0', ',', '@', '0', ''))
            .concat(TestHelper.instruction(21, '', 'JMN', '.A', '@', '0', ',', '#', '0', ''))
            .concat(TestHelper.instruction(22, '', 'JMN', '.A', '<', '0', ',', '$', '0', ''))

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new IllegalCommandCheck()
        const actual = pass.process(context, Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS88 }))

        expect(actual.messages.length).to.be.equal(0)
    })

    it("Raises an error for each illegal addressing mode under the ICWS'88 standard", () => {
        const tokens = TestHelper.instruction(1, '', 'MOV', '.A', '#', '0', ',', '#', '0', '')
            .concat(TestHelper.instruction(1, '', 'SLT', '.A', '$', '0', ',', '#', '0', ''))
            .concat(TestHelper.instruction(1, '', 'DJN', '.A', '#', '0', ',', '<', '0', ''))
            .concat(TestHelper.instruction(1, '', 'SPL', '.A', '#', '0', ',', '@', '0', ''))
            .concat(TestHelper.instruction(1, '', 'ADD', '.A', '$', '0', ',', '#', '0', ''))
            .concat(TestHelper.instruction(1, '', 'JMP', '.A', '#', '0', ',', '$', '0', ''))
            .concat(TestHelper.instruction(1, '', 'DAT', '.A', '@', '0', ',', '<', '0', ''))
            .concat(TestHelper.instruction(1, '', 'SUB', '.A', '#', '0', ',', '#', '0', ''))
            .concat(TestHelper.instruction(1, '', 'JMZ', '.A', '#', '0', ',', '<', '0', ''))
            .concat(TestHelper.instruction(1, '', 'CMP', '.A', '$', '0', ',', '#', '0', ''))
            .concat(TestHelper.instruction(1, '', 'JMN', '.A', '#', '0', ',', '@', '0', ''))

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new IllegalCommandCheck()
        const actual = pass.process(context, Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS88 }))

        expect(actual.messages.length).to.be.equal(11)

        expect(
            actual.messages.filter(
                a =>
                    a.type === MessageType.Error && a.text === 'Illegal addressing mode under selected Corewar standard'
            ).length
        ).to.be.equal(11)

        for (let i = 0; i < actual.messages.length; i++) {
            expect(actual.messages[i].position).to.deep.equal(tokens[i * 8].position)
        }
    })

    it('Ignores lines which do not begin with an opcode', () => {
        const tokens = TestHelper.instruction(1, 'Label1', 'MOV', '.A', '#', '0', ',', '$', '0', '')

        const context = new Context()
        context.tokens = tokens.slice()

        const pass = new IllegalCommandCheck()
        const actual = pass.process(context, Object.assign({}, Parser.DefaultOptions, { standard: Standard.ICWS88 }))

        expect(actual.messages.length).to.be.equal(0)
        expect(actual.tokens.length).to.be.equal(tokens.length)
    })
})
