import 'reflect-metadata'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import ParseResolver from '@/resolvers/ParseResolver'
import { corewar } from 'corewar'
import getParseResult from '@test/factories/ParseResult'
chai.use(sinonChai)

describe('ParseResolver', () => {
    let target: ParseResolver

    beforeEach(() => {
        target = new ParseResolver()
    })

    afterEach(() => {
        sinon.restore()
    })

    describe('parse', () => {
        it('should pass specified redcode to corewar library to parse', async () => {
            const expected = 'mov 0, 1'

            const parse = sinon.stub(corewar, 'parse')

            await target.parse(expected)

            expect(parse).to.have.been.calledWith(expected)
        })

        it('should return ParseResult', async () => {
            const expected = getParseResult()

            sinon.stub(corewar, 'parse').returns(expected)

            const actual = await target.parse('mov 0, 1')

            expect(actual).to.be.deep.equal(expected)
        })
    })
})
