import 'reflect-metadata'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import * as warriorService from '@/services/WarriorService'
import WarriorResolver from '@/resolvers/WarriorResolver'
import buildWarriorServiceMock from '@test/mocks/WarriorService'
chai.use(sinonChai)

describe('WarriorResolver', () => {
    let target: WarriorResolver
    let service: warriorService.IWarriorService

    beforeEach(() => {
        target = new WarriorResolver()
        service = buildWarriorServiceMock()
        sinon.stub(warriorService, 'buildWarriorService').returns(service)
    })

    afterEach(() => {
        sinon.restore()
    })

    describe('query warrior', () => {
        it('should return warrior with matching id from service', async () => {
            const id = '1234'
            const expected = { id, foo: 'bar' }

            const stub = service.getById as sinon.SinonStub
            stub.withArgs(id).returns(expected)

            const actual = await target.warrior({ id })

            expect(actual).to.be.deep.equal(expected)
        })
    })

    describe('query warriors', () => {
        it('should return all warriors from service', async () => {
            const expected = [{ foo: 'bar' }]

            const stub = service.getAll as sinon.SinonStub
            stub.returns(expected)

            const actual = await target.warriors()

            expect(actual).to.be.deep.equal(expected)
        })
    })

    describe('mutation saveWarrior', () => {
        it('should save warrior with specified redcode and id', async () => {
            const expected = { warrior: { id: '1234', redcode: 'mov 0, 1' } }

            const stub = service.saveWarrior as sinon.SinonStub

            await target.saveWarrior(expected)

            expect(stub).to.have.been.calledWith(expected.warrior.redcode, expected.warrior.id)
        })

        it('should return result of service saveWarrior', async () => {
            const args = { warrior: { id: '1234', redcode: 'mov 0, 1' } }
            const result = { foo: 'bar' }
            const expected = { result, success: true }

            const stub = service.saveWarrior as sinon.SinonStub
            stub.returns(result)

            const actual = await target.saveWarrior(args)

            expect(actual).to.be.deep.equal(expected)
        })

        it('should handle errors raised by service', async () => {
            const expected = new Error('Failed to save warrior')

            const stub = service.saveWarrior as sinon.SinonStub
            stub.throws(expected)

            const actual = await target.saveWarrior({
                warrior: { id: '1234', redcode: 'mov 0, 1' }
            })

            expect(actual.message).to.be.equal(expected.message)
            expect(actual.success).to.be.false
            expect(actual.result).to.be.undefined
        })
    })

    describe('mutation deleteWarrior', () => {
        it('should delete warrior with specified id', async () => {
            const id = '1234'

            const stub = service.deleteWarrior as sinon.SinonStub

            await target.deleteWarrior({ id })

            expect(stub).to.have.been.calledWith(id)
        })

        it('should return result of service deleteWarrior', async () => {
            const args = { id: '1234' }
            const result = { id: '1234' }
            const expected = { result, success: true }

            const stub = service.deleteWarrior as sinon.SinonStub
            stub.returns(result)

            const actual = await target.deleteWarrior(args)

            expect(actual).to.be.deep.equal(expected)
        })

        it('should handle errors raised by service', async () => {
            const expected = new Error('Failed to delete warrior')

            const stub = service.deleteWarrior as sinon.SinonStub
            stub.throws(expected)

            const actual = await target.deleteWarrior({ id: '1234' })

            expect(actual.message).to.be.equal(expected.message)
            expect(actual.success).to.be.false
            expect(actual.result).to.be.undefined
        })
    })
})
