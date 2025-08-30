import { expect } from 'chai'

import { Context } from '@parser/Context'
import { MetaDataCollector } from '@parser/MetaDataCollector'
import { Parser } from '@parser/Parser'
import { TestHelper } from '../unit/TestHelper'
import { MessageType } from '@parser/interface/IMessage'
'use strict'

describe('MetaDataCollector', () => {
    it("Defaults the warrior name to 'Nameless'", () => {
        const context = new Context()

        const pass = new MetaDataCollector()
        pass.process(context, Parser.DefaultOptions)

        expect(context.metaData.name).to.be.equal('Nameless')
    })

    it("Defaults the author name to 'Blameless'", () => {
        const context = new Context()

        const pass = new MetaDataCollector()
        pass.process(context, Parser.DefaultOptions)

        expect(context.metaData.author).to.be.equal('Blameless')
    })

    it('Can handle non-relevant comments', () => {
        const context = new Context()
        context.tokens = TestHelper.comment(1, ';')
            .concat(TestHelper.comment(2, ';    '))
            .concat(TestHelper.comment(3, ';not relevant comment'))
            .concat(TestHelper.comment(4, ';strategx'))

        const pass = new MetaDataCollector()
        pass.process(context, Parser.DefaultOptions)

        expect(context.messages.length).to.be.equal(0)
    })

    it('Reads the warrior name from the ;name comment', () => {
        const context = new Context()
        context.tokens = TestHelper.comment(1, ';name  this is the name\t ')

        const pass = new MetaDataCollector()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.metaData.name).to.be.equal('this is the name')
    })

    it('Reads the author name from the ;author comment', () => {
        const context = new Context()
        context.tokens = TestHelper.comment(1, ';author\t\tgareththegeek')

        const pass = new MetaDataCollector()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.metaData.author).to.be.equal('gareththegeek')
    })

    it('Reads the strategy from the ;strategy comment', () => {
        const context = new Context()
        context.tokens = TestHelper.comment(1, ';strategy   this is a description of the strategy  ')

        const pass = new MetaDataCollector()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.metaData.strategy).to.be.equal('  this is a description of the strategy  \n')
    })

    it('Reads multiline strategies from successive ;strategy comments', () => {
        const context = new Context()
        context.tokens = TestHelper.comment(1, ';strategy this is line 1 of the strategy')
            .concat(TestHelper.comment(2, ';strategy this is line 2 of the strategy'))
            .concat(TestHelper.comment(3, ';strategy this is line 3 of the strategy'))

        const pass = new MetaDataCollector()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.metaData.strategy).to.be.equal(
            'this is line 1 of the strategy\nthis is line 2 of the strategy\nthis is line 3 of the strategy\n'
        )
    })

    it('Raises a warning if name is defined more than once and uses latest definition', () => {
        const context = new Context()
        context.tokens = TestHelper.comment(1, ';name dwarf').concat(TestHelper.comment(2, ';name imp'))

        const pass = new MetaDataCollector()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.metaData.name).to.be.equal('imp')
        expect(actual.messages.length).to.be.equal(1)
        expect(actual.messages[0].text).to.be.equal("Redefinition of name, latest definition will be used ('imp')")
        expect(actual.messages[0].type).to.be.equal(MessageType.Warning)
        expect(actual.messages[0].position).to.deep.equal({ line: 2, char: 1 })
    })

    it('Raises a warning if author is defined more than once and uses latest definition', () => {
        const context = new Context()
        context.tokens = TestHelper.comment(1, ';author turbo_king').concat(
            TestHelper.comment(2, ';author gareththegeek')
        )

        const pass = new MetaDataCollector()
        const actual = pass.process(context, Parser.DefaultOptions)

        expect(actual.metaData.author).to.be.equal('gareththegeek')
        expect(actual.messages.length).to.be.equal(1)
        expect(actual.messages[0].text).to.be.equal(
            "Redefinition of author, latest definition will be used ('gareththegeek')"
        )
        expect(actual.messages[0].type).to.be.equal(MessageType.Warning)
        expect(actual.messages[0].position).to.deep.equal({ line: 2, char: 1 })
    })
})
