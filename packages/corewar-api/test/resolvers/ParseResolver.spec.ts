import 'reflect-metadata'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import ParseResolver from '@/resolvers/ParseResolver'
import { corewar } from 'corewar'
import buildParseResult from '@test/mocks/ParseResult'
chai.use(sinonChai)

describe('ParseResolver', () => {
    let target: ParseResolver
    let sandbox: sinon.SinonSandbox

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        target = new ParseResolver()
    })

    afterEach(() => {
        sandbox.restore()
    })

    describe('parse', () => {
        it('should pass specified redcode to corewar library to parse', async () => {
            const expected = 'mov 0, 1'

            const parse = sandbox.stub(corewar, 'parse')

            await target.parse(expected)

            expect(parse).to.have.been.calledWith(expected)
        })

        it('should return ParseResult', async () => {
            const expected = buildParseResult()

            sandbox.stub(corewar, 'parse').returns(expected)

            const actual = await target.parse('mov 0, 1')

            expect(actual).to.be.deep.equal(expected)
        })
    })
})
