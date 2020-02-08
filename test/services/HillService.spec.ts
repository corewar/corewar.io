import chai, { expect } from 'chai'
import { IRepository } from '@/database/Repository'
import getRepository from '@test/factories/Repository'
import HillService, { IHillService } from '@/services/HillService'
import sinon from 'sinon'
import buildRules from '@test/factories/Rules'
import sinonChai from 'sinon-chai'
import Hill from '@/schema/Hill'
import { IUuidFactory } from '@/services/UuidFactory'
import getUuidFactory from '@test/factories/UuidFactory'
chai.use(sinonChai)

describe('HillService', () => {
    let target: IHillService

    let repo: IRepository
    let uuid: IUuidFactory

    beforeEach(() => {
        repo = getRepository()
        uuid = getUuidFactory()
        target = new HillService(repo, uuid)
    })

    describe('getById', () => {
        it('should return requested result from repository', async () => {
            const id = '7'
            const expected = {}
            const stub = repo.getById as sinon.SinonStub
            stub.withArgs(id).returns(Promise.resolve(expected))

            const actual = await target.getById(id)

            expect(actual).to.deep.equal(expected)
        })
    })

    describe('getAll', () => {
        it('should return all results from repository', async () => {
            const expected: Hill[] = []
            const stub = repo.getAll as sinon.SinonStub
            stub.returns(expected)

            const actual = await target.getAll()

            expect(actual).to.deep.equal(expected)
        })
    })

    describe('createHill', () => {
        it('should upsert hill with repository', async () => {
            const rules = buildRules()
            const stub = repo.upsert

            await target.createHill(rules)

            expect(stub).to.have.been.calledWith(
                sinon.match((x: Hill) => x.rules === rules)
            )
        })

        it('should generate a uuid for the new hill', async () => {
            const expected = '11111111-2222-3333-4444-555555555555'
            const stub = uuid.get as sinon.SinonStub
            stub.returns(expected)

            const rules = buildRules()

            const actual = await target.createHill(rules)

            expect(actual.id).to.be.equal(expected)
        })
    })

    describe('deleteHill', () => {
        it('should delete the specified hill from the repository', async () => {
            const expected = '123'

            const stub = repo.delete as sinon.SinonStub

            await target.deleteHill(expected)

            expect(stub).to.have.been.calledWith(expected)
        })
    })
})
