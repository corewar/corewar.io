import { IRepository } from '@/database/Repository'
import Hill from '@/schema/Hill'
import Warrior from '@/schema/Warrior'
import HillService, { IHillService } from '@/services/HillService'
import { IUuidFactory } from '@/services/UuidFactory'
import { IWarriorService } from '@/services/WarriorService'
import buildHill from '@test/mocks/Hill'
import buildRules from '@test/mocks/HillRules'
import buildHillWarrior from '@test/mocks/HillWarrior'
import buildParseResult from '@test/mocks/ParseResult'
import buildRepositoryMock from '@test/mocks/Repository'
import buildUidFactoryMock from '@test/mocks/UuidFactory'
import buildWarrior from '@test/mocks/Warrior'
import buildWarriorServiceMock from '@test/mocks/WarriorService'
import chai, { assert, expect } from 'chai'
import { corewar, IHillResult, IPublishProvider, IRules, IWarrior } from 'corewar'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('HillService', () => {
    let sandbox: sinon.SinonSandbox

    let target: IHillService

    let repo: IRepository
    let warriorService: IWarriorService
    let uuid: IUuidFactory

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        repo = buildRepositoryMock(sandbox)
        uuid = buildUidFactoryMock(sandbox)
        warriorService = buildWarriorServiceMock(sandbox)
        target = new HillService(repo, warriorService, uuid)
    })

    afterEach(() => {
        sandbox.restore()
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
        let runHill: sinon.SinonStub<[IRules, IWarrior[], IPublishProvider?], IHillResult>

        beforeEach(() => {
            runHill = sandbox.stub(corewar, 'runHill')

            const warriorServiceGetById = warriorService.getById as sinon.SinonStub
            warriorServiceGetById.returns({ parseResult: buildParseResult() })

            const repoGetbyId = repo.getById as sinon.SinonStub
            repoGetbyId.returns(buildHill())
        })

        afterEach(() => {
            sandbox.restore()
        })

        const warriorWithId = (id: string) => (warriors: IWarrior[]): boolean =>
            // TODO are we using .data.id or .id or what!?
            !!warriors.find((warrior: IWarrior): boolean => (warrior as any).id === id)

        it('should run hill with specified warrior', async () => {
            const expected = '2'
            const stub = warriorService.getById as sinon.SinonStub
            const challenger: Warrior = { id: expected, redcode: '', source: buildParseResult() }
            stub.withArgs(expected).returns(challenger)

            await target.challengeHill('1', expected)

            expect(runHill).to.have.been.calledWith(
                sinon.match(() => true),
                sinon.match(warriorWithId(expected))
            )
        })

        it('should use the rules for the hill with the specified id', async () => {
            const hillId = '1'

            const hill = buildHill()
            const expected = buildRules()
            hill.rules = expected

            const stub = repo.getById as sinon.SinonStub
            stub.withArgs(hillId).returns(hill)

            await target.challengeHill(hillId, '2')

            expect(runHill).to.have.been.calledWith(sinon.match((rules: IRules) => rules === expected))
        })

        it("should run hill with hill's existing warriors", async () => {
            const existing = [buildWarrior('1'), buildWarrior('2')]
            const challenger = buildWarrior('3')

            const hill = buildHill('4')
            hill.warriors = existing.map(warrior => buildHillWarrior(warrior.id))

            const getWarriorById = warriorService.getById as sinon.SinonStub
            getWarriorById.withArgs(challenger.id).returns(challenger)
            existing.forEach(warrior => getWarriorById.withArgs(warrior.id).returns(warrior))

            const getHillById = repo.getById as sinon.SinonStub
            getHillById.returns(hill)

            await target.challengeHill(hill.id, challenger.id)

            existing.forEach(warrior =>
                expect(runHill).to.have.been.calledWith(
                    sinon.match(() => true),
                    sinon.match(warriorWithId(warrior.id))
                )
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
            existing.forEach(hillWarrior =>
                getWarriorById.withArgs(hillWarrior.warriorId).returns(buildWarrior(hillWarrior.warriorId))
            )

            const getHillById = repo.getById as sinon.SinonStub
            getHillById.returns(hill)

            await target.challengeHill(hill.id, challenger.id)

            expect(runHill).to.have.been.calledWith(
                sinon.match(() => true),
                sinon.match(warriorWithId(expected.warriorId))
            )
            expect(runHill).not.to.have.been.calledWith(
                sinon.match(() => true),
                sinon.match(warriorWithId(unexpected.warriorId))
            )
        })

        it('should throw if hill does not exist', async () => {
            const hillId = '1'

            const stub = repo.getById as sinon.SinonStub
            stub.withArgs(hillId).returns(null)

            try {
                await target.challengeHill(hillId, '1')
                assert.fail('Expected promise to fail but succeeded')
            } catch (e) {
                expect(e instanceof Error ? e.message : String(e)).to.be.equal(`No hill found with id '${hillId}'`)
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
                expect(e instanceof Error ? e.message : String(e)).to.be.equal(`No warrior found with id '${challengerId}'`)
            }
        })
    })
})
