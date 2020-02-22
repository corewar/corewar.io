import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import buildRepositoryMock from '@test/mocks/Repository'
import buildUidFactoryMock from '@test/mocks/UuidFactory'
import { IRepository } from '@/database/Repository'
import { IUuidFactory } from '@/services/UuidFactory'
import WarriorService, { IWarriorService } from '@/services/WarriorService'
import Warrior from '@/schema/Warrior'
import { corewar, IParseResult } from 'corewar'
import buildParseResult from '@test/mocks/ParseResult'
chai.use(sinonChai)

describe('WarriorService', () => {
    let target: IWarriorService

    let repo: IRepository
    let uuid: IUuidFactory

    beforeEach(() => {
        repo = buildRepositoryMock()
        uuid = buildUidFactoryMock()
        target = new WarriorService(repo, uuid)
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
            const expected: Warrior[] = []
            const stub = repo.getAll as sinon.SinonStub
            stub.returns(expected)

            const actual = await target.getAll()

            expect(actual).to.deep.equal(expected)
        })
    })

    describe('saveWarrior', () => {
        let parse: sinon.SinonStub<[string], IParseResult>

        beforeEach(() => {
            parse = sinon.stub(corewar, 'parse').returns(buildParseResult())
        })

        afterEach(() => {
            sinon.restore()
        })

        it('should upsert warrior with repository', async () => {
            const redcode = 'mov 0, 1'
            const id = '12345'
            const stub = repo.upsert

            await target.saveWarrior(redcode, id)

            expect(stub).to.have.been.calledWith(sinon.match((x: Warrior) => x.redcode === redcode && x.id === id))
        })

        it('should generate a uuid if no id specified', async () => {
            const expected = '11111111-2222-3333-4444-555555555555'
            const stub = uuid.get as sinon.SinonStub
            stub.returns(expected)

            const actual = await target.saveWarrior('')

            expect(actual.id).to.be.equal(expected)
        })

        it('should not assign an id or persist if redcode cannot be parsed', async () => {
            const parseResult = buildParseResult()
            parseResult.success = false
            parse.returns(parseResult)

            const stub = sinon.stub()
            repo.upsert = stub

            const actual = await target.saveWarrior('')

            expect(actual.id).to.be.undefined
            expect(actual.parseResult).to.be.deep.equal(parseResult)
            expect(stub).not.to.have.been.called
        })

        describe('deleteWarrior', () => {
            it('should delete the specified warrior from the repository', async () => {
                const expected = '123'

                const stub = repo.delete as sinon.SinonStub

                await target.deleteWarrior(expected)

                expect(stub).to.have.been.calledWith(expected)
            })
        })
    })
})
