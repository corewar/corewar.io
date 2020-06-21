import 'reflect-metadata'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import * as hillService from '@/services/HillService'
import HillResolver from '@/resolvers/HillResolver'
import buildHillServiceMock from '@test/mocks/HillService'
import buildRules from '@test/mocks/HillRules'
chai.use(sinonChai)

describe('HillResolver', () => {
    let sandbox: sinon.SinonSandbox

    let target: HillResolver
    let service: hillService.IHillService

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        target = new HillResolver()
        service = buildHillServiceMock(sandbox)
        sandbox.stub(hillService, 'buildHillService').returns(service)
    })

    afterEach(() => {
        sandbox.restore()
    })

    describe('query hill', () => {
        it('should return hill with matching id from service', async () => {
            const id = '1234'
            const expected = { id, foo: 'bar' }

            const stub = service.getById as sinon.SinonStub
            stub.withArgs(id).returns(expected)

            const actual = await target.hill({ id })

            expect(actual).to.be.deep.equal(expected)
        })
    })

    describe('query hills', () => {
        it('should return all hills from service', async () => {
            const expected = [{ foo: 'bar' }]

            const stub = service.getAll as sinon.SinonStub
            stub.returns(expected)

            const actual = await target.hills()

            expect(actual).to.be.deep.equal(expected)
        })
    })

    describe('mutation saveHill', () => {
        it('should save hill with specified rules', async () => {
            const expected = { rules: buildRules() }

            const stub = service.createHill as sinon.SinonStub

            await target.createHill(expected)

            expect(stub).to.have.been.calledWith(expected.rules)
        })

        it('should return result of service createHill', async () => {
            const args = { rules: buildRules() }
            const result = { foo: 'bar' }
            const expected = { result, success: true }

            const stub = service.createHill as sinon.SinonStub
            stub.returns(result)

            const actual = await target.createHill(args)

            expect(actual).to.be.deep.equal(expected)
        })

        it('should handle errors raised by service', async () => {
            const expected = new Error('Failed to save hill')

            const stub = service.createHill as sinon.SinonStub
            stub.throws(expected)

            const actual = await target.createHill({
                rules: buildRules()
            })

            expect(actual.message).to.be.equal(expected.message)
            expect(actual.success).to.be.false
            expect(actual.result).to.be.undefined
        })
    })

    describe('mutation deleteHill', () => {
        it('should delete hill with specified id', async () => {
            const id = '1234'

            const stub = service.deleteHill as sinon.SinonStub

            await target.deleteHill({ id })

            expect(stub).to.have.been.calledWith(id)
        })

        it('should return result of service deleteHill', async () => {
            const args = { id: '1234' }
            const result = '1234'
            const expected = { result, success: true }

            const stub = service.deleteHill as sinon.SinonStub
            stub.returns(result)

            const actual = await target.deleteHill(args)

            expect(actual).to.be.deep.equal(expected)
        })

        it('should handle errors raised by service', async () => {
            const expected = new Error('Failed to delete hill')

            const stub = service.deleteHill as sinon.SinonStub
            stub.throws(expected)

            const actual = await target.deleteHill({ id: '1234' })

            expect(actual.message).to.be.equal(expected.message)
            expect(actual.success).to.be.false
            expect(actual.result).to.be.undefined
        })
    })

    describe('mutation challengeHill', () => {
        it('should challenge specified hill with the specified warrior', async () => {
            const hillId = '1234'
            const warriorId = '5678'

            const stub = service.challengeHill as sinon.SinonStub

            await target.challengeHill({ hillId, warriorId })

            expect(stub).to.have.been.calledWith(hillId, warriorId)
        })

        it('should return result of service challengeHill', async () => {
            const args = { hillId: '1234', warriorId: '5678' }
            const result = '1234'
            const expected = { result, success: true }

            const stub = service.challengeHill as sinon.SinonStub
            stub.returns(result)

            const actual = await target.challengeHill(args)

            expect(actual).to.be.deep.equal(expected)
        })

        it('should handle errors raised by service', async () => {
            const expected = new Error('Failed to challenge hill')

            const stub = service.challengeHill as sinon.SinonStub
            stub.throws(expected)

            const actual = await target.challengeHill({
                hillId: '1234',
                warriorId: '5678'
            })

            expect(actual.message).to.be.equal(expected.message)
            expect(actual.success).to.be.false
            expect(actual.result).to.be.undefined
        })
    })
})
