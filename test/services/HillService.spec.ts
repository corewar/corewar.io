import chai, { expect } from 'chai'
import { IRepository } from '@/database/Repository'
import buildRepositoryMock from '@test/mocks/Repository'
import HillService, { IHillService } from '@/services/HillService'
import sinon from 'sinon'
import buildRules from '@test/mocks/HillRules'
import sinonChai from 'sinon-chai'
import Hill from '@/schema/Hill'
import { IUuidFactory } from '@/services/UuidFactory'
import buildUidFactoryMock from '@test/mocks/UuidFactory'
import {
    corewar,
    IHill,
    IHillResult,
    IHillWarrior,
    IParseResult
} from 'corewar'
import buildParseResult from '@test/mocks/ParseResult'
import { IWarriorService } from '@/services/WarriorService'
import buildWarriorServiceMock from '@test/mocks/WarriorService'
chai.use(sinonChai)

describe('HillService', () => {
    let target: IHillService

    let repo: IRepository
    let warriorService: IWarriorService
    let uuid: IUuidFactory

    beforeEach(() => {
        repo = buildRepositoryMock()
        uuid = buildUidFactoryMock()
        warriorService = buildWarriorServiceMock()
        target = new HillService(repo, warriorService, uuid)
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

    describe('challengeHill', () => {
        let runHill: sinon.SinonStub<[IHill], IHillResult>

        beforeEach(() => {
            runHill = sinon.stub(corewar, 'runHill')

            const warriorServiceGetById = warriorService.getById as sinon.SinonStub
            warriorServiceGetById.returns({ parseResult: buildParseResult() })

            const repoGetbyId = repo.getById as sinon.SinonStub
            repoGetbyId.returns({ rules: buildRules() })
        })

        afterEach(() => {
            sinon.restore()
        })

        const warriorWithSource = (source: IParseResult) => (
            hill: IHill
        ): boolean =>
            !!hill.warriors.find(
                (warrior: IHillWarrior): boolean => warrior.source === source
            )

        it('should run hill with specified warrior', async () => {
            const expectedId = '2'
            const expected = buildParseResult()
            const stub = warriorService.getById as sinon.SinonStub
            stub.withArgs(expectedId).returns({ parseResult: expected })

            await target.challengeHill('1', expectedId)

            expect(runHill).to.have.been.calledWith(
                sinon.match(warriorWithSource(expected))
            )
        })

        it('should use the rules for the hill with the specified id', async () => {
            const hillId = '1'

            const expected = buildRules()

            const stub = repo.getById as sinon.SinonStub
            stub.withArgs(hillId).returns({ rules: expected })

            await target.challengeHill(hillId, '2')

            expect(runHill).to.have.been.calledWith(
                sinon.match((hill: IHill) => hill.rules === expected)
            )
        })
    })
})
