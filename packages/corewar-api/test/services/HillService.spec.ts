import chai, { expect, assert } from 'chai'
import { IRepository } from '@/database/Repository'
import buildRepositoryMock from '@test/mocks/Repository'
import HillService, { IHillService } from '@/services/HillService'
import sinon from 'sinon'
import buildRules from '@test/mocks/HillRules'
import sinonChai from 'sinon-chai'
import Hill from '@/schema/Hill'
import { IUuidFactory } from '@/services/UuidFactory'
import buildUidFactoryMock from '@test/mocks/UuidFactory'
import { corewar, IHill, IHillResult, IHillWarrior, IParseResult } from 'corewar'
import buildParseResult from '@test/mocks/ParseResult'
import { IWarriorService } from '@/services/WarriorService'
import buildWarriorServiceMock from '@test/mocks/WarriorService'
import buildHillWarrior from '@test/mocks/HillWarrior'
import buildWarrior from '@test/mocks/Warrior'
import buildHill from '@test/mocks/Hill'
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

            expect(stub).to.have.been.calledWith(sinon.match((x: Hill) => x.rules === rules))
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
            repoGetbyId.returns(buildHill())
        })

        afterEach(() => {
            sinon.restore()
        })

        const warriorWithSource = (source: IParseResult) => (hill: IHill): boolean =>
            !!hill.warriors.find((warrior: IHillWarrior): boolean => warrior.source === source)

        const warriorWithId = (id: string) => (hill: IHill): boolean =>
            !!hill.warriors.find((warrior: IHillWarrior): boolean => warrior.warriorHillId === id)

        it('should run hill with specified warrior', async () => {
            const expectedId = '2'
            const expected = buildParseResult()
            const stub = warriorService.getById as sinon.SinonStub
            stub.withArgs(expectedId).returns({ parseResult: expected })

            await target.challengeHill('1', expectedId)

            expect(runHill).to.have.been.calledWith(sinon.match(warriorWithSource(expected)))
        })

        it('should use the rules for the hill with the specified id', async () => {
            const hillId = '1'

            const hill = buildHill()
            const expected = buildRules()
            hill.rules = expected

            const stub = repo.getById as sinon.SinonStub
            stub.withArgs(hillId).returns(hill)

            await target.challengeHill(hillId, '2')

            expect(runHill).to.have.been.calledWith(sinon.match((hill: IHill) => hill.rules === expected))
        })

        it("should run hill with hill's existing warriors", async () => {
            const existing = [buildHillWarrior('1'), buildHillWarrior('2')]
            const challenger = buildWarrior('3')

            const hill = buildHill('4')
            hill.warriors = existing

            const getWarriorById = warriorService.getById as sinon.SinonStub
            getWarriorById.withArgs(challenger.id).returns(challenger)
            existing.forEach(warrior => getWarriorById.withArgs(warrior.warriorId).returns(warrior))

            const getHillById = repo.getById as sinon.SinonStub
            getHillById.returns(hill)

            await target.challengeHill(hill.id, challenger.id)

            existing.forEach(warrior =>
                expect(runHill).to.have.been.calledWith(sinon.match(warriorWithSource(warrior.result.source)))
            )
        })

        it('should exclude warriors whose rank exceeds the hill size', async () => {
            const expected = buildHillWarrior('1')
            expected.rank = 1
            const unexpected = buildHillWarrior('2')
            unexpected.rank = 2
            const existing = [expected, unexpected]

            const challenger = buildWarrior('3')

            const hill = buildHill('4')
            hill.warriors = existing
            hill.rules.size = 1

            const getWarriorById = warriorService.getById as sinon.SinonStub
            getWarriorById.withArgs(challenger.id).returns(challenger)
            existing.forEach(warrior => getWarriorById.withArgs(warrior.warriorId).returns(warrior))

            const getHillById = repo.getById as sinon.SinonStub
            getHillById.returns(hill)

            await target.challengeHill(hill.id, challenger.id)

            expect(runHill).to.have.been.calledWith(sinon.match(warriorWithSource(expected.result.source)))
            expect(runHill).not.to.have.been.calledWith(sinon.match(warriorWithSource(unexpected.result.source)))
        })

        it('should throw if hill does not exist', async () => {
            const hillId = '1'

            const stub = repo.getById as sinon.SinonStub
            stub.withArgs(hillId).returns(null)

            try {
                await target.challengeHill(hillId, '1')
                assert.fail('Expected promise to fail but succeeded')
            } catch (e) {
                expect(e.message).to.be.equal(`No hill found with id '${hillId}'`)
            }
        })

        it('should throw if challenger does not exist', async () => {
            const challengerId = '2'

            const stub = warriorService.getById as sinon.SinonStub
            stub.withArgs(challengerId).returns(null)

            try {
                await target.challengeHill('1', challengerId)
                assert.fail('Expected promise to fail but succeeded')
            } catch (e) {
                expect(e.message).to.be.equal(`No warrior found with id '${challengerId}'`)
            }
        })

        it('should assign warrior ids to all warriors passed to corewar.runHill', async () => {
            const existing = [buildHillWarrior('1'), buildHillWarrior('2')]
            const challenger = buildWarrior('3')

            const hill = buildHill('4')
            hill.warriors = existing

            const getWarriorById = warriorService.getById as sinon.SinonStub
            getWarriorById.withArgs(challenger.id).returns(challenger)
            existing.forEach(warrior => getWarriorById.withArgs(warrior.warriorId).returns(warrior))

            const getHillById = repo.getById as sinon.SinonStub
            getHillById.returns(hill)

            await target.challengeHill(hill.id, challenger.id)

            expect(runHill).to.have.been.calledWith(sinon.match(warriorWithId('1')))
            expect(runHill).to.have.been.calledWith(sinon.match(warriorWithId('2')))
            expect(runHill).to.have.been.calledWith(sinon.match(warriorWithId('3')))
        })
    })
})
