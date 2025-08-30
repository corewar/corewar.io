import * as sinon from 'sinon'
import { expect } from 'chai'
import * as chai from 'chai'
import sinonChai from 'sinon-chai'
import TestHelper from '../../simulator/unit/TestHelper'
import { IHillResultMapper } from '@matches/interface/IHillResultMapper'
import { IHillResult } from '@matches/interface/IHillResult'
import { IPublisher } from '@simulator/interface/IPublisher'
import { MessageType } from '@simulator/interface/IMessage'
import { IBenchmarkRunner } from '@matches/interface/IBenchmarkRunner'
import { BenchmarkRunner } from '@matches/BenchmarkRunner'
import { IHillWarriorResult } from '@matches/interface/IHillWarriorResult'
import { IParseResult } from '@parser/interface/IParseResult'
import { IMatchRunner } from '@matches/interface/IMatchRunner'
import IWarrior from '@simulator/interface/IWarrior'
chai.use(sinonChai)

describe('BenchmarkRunner', () => {
    let benchmarkRunner: IBenchmarkRunner

    let publisher: IPublisher
    let matchRunner: IMatchRunner
    let hillResultMapper: IHillResultMapper

    beforeEach(() => {
        publisher = {
            clear: sinon.stub(),
            publish: sinon.stub(),
            queue: sinon.stub(),
            republish: sinon.stub(),
            setPublishProvider: sinon.stub()
        }

        matchRunner = {
            run: sinon.stub()
        }

        hillResultMapper = {
            map: sinon.stub().returns({ warriors: [] })
        }

        benchmarkRunner = new BenchmarkRunner(publisher, matchRunner, hillResultMapper)
    })

    const arraysEqual = <T>(a: T[], b: T[]): boolean => a.every((x, i) => b[i] === x)

    it('runs a match for each warrior in the benchmark against the submitted warrior', () => {
        ;(hillResultMapper.map as sinon.SinonStub).returns({ warriors: [] })

        const warrior = { source: TestHelper.buildParseResult([]) }
        const warriorA = { source: TestHelper.buildParseResult([]) }
        const warriorB = { source: TestHelper.buildParseResult([]) }
        const warriorC = { source: TestHelper.buildParseResult([]) }

        const rules = {
            rounds: 1,
            options: {}
        }
        const warriors = [warriorA, warriorB, warriorC]

        benchmarkRunner.run(warrior, rules, warriors)

        expect((matchRunner.run as sinon.SinonStub).calledOnce)
        expect(matchRunner.run).to.have.been.calledWith(rules, [warrior, warriorA])
        expect(matchRunner.run).to.have.been.calledWith(rules, [warrior, warriorB])
        expect(matchRunner.run).to.have.been.calledWith(rules, [warrior, warriorC])
    })

    const buildMatchResult = (source: IParseResult, id: number): IHillWarriorResult => ({
        drawn: 1,
        lost: 1,
        won: 1,
        rank: 1,
        score: 1,
        warrior: { internalId: id, source },
        matches: []
    })

    it('assigns a unique id to each warrior', () => {
        const expected = [0, 1, 2]

        const warriorA: IWarrior = { source: TestHelper.buildParseResult([]) }
        const warriorB: IWarrior = { source: TestHelper.buildParseResult([]) }
        const warriorC: IWarrior = { source: TestHelper.buildParseResult([]) }

        const rules = {
            rounds: 1,
            options: {}
        }
        const warriors = [warriorA, warriorB]

        benchmarkRunner.run(warriorC, rules, warriors)

        expect(warriorA.internalId).to.be.equal(expected[0])
        expect(warriorB.internalId).to.be.equal(expected[1])
        expect(warriorC.internalId).to.be.equal(expected[2])
    })

    it('does not assign a unique id to each warrior if one is already present', () => {
        const expected = [4, 5, 6]

        const warriorA: IWarrior = { internalId: 4, source: TestHelper.buildParseResult([]) }
        const warriorB: IWarrior = { internalId: 5, source: TestHelper.buildParseResult([]) }
        const warriorC: IWarrior = { internalId: 6, source: TestHelper.buildParseResult([]) }

        const rules = {
            rounds: 1,
            options: {}
        }
        const warriors = [warriorA, warriorB]

        benchmarkRunner.run(warriorC, rules, warriors)

        expect(warriorA.internalId).to.be.equal(expected[0])
        expect(warriorB.internalId).to.be.equal(expected[1])
        expect(warriorC.internalId).to.be.equal(expected[2])
    })

    it('returns mapped hill results for submitted warrior only', () => {
        const matches = [{}, {}, {}]
        for (let i = 0; i <= 2; i++) {
            ;(matchRunner.run as sinon.SinonStub).onCall(i).returns(matches[i])
        }

        const warrior = { source: TestHelper.buildParseResult([]) }
        const otherWarrior = { source: TestHelper.buildParseResult([]) }
        const rules = {
            rounds: 2,
            options: {}
        }
        const warriors = [otherWarrior, otherWarrior, otherWarrior]

        const expected = buildMatchResult(warrior.source, 3)

        const mappedResult: IHillResult = {
            warriors: [
                expected,
                buildMatchResult(otherWarrior.source, 0),
                buildMatchResult(otherWarrior.source, 1),
                buildMatchResult(otherWarrior.source, 2)
            ]
        }
        ;(hillResultMapper.map as sinon.SinonStub)
            .withArgs(
                sinon.match(() => true),
                sinon.match(arg => arraysEqual(arg, matches))
            )
            .returns(mappedResult)

        const actual = benchmarkRunner.run(warrior, rules, warriors)

        expect(actual).to.deep.equal({ warriors: [expected] })
    })

    it('publishes HillEnd message at end of hill', () => {
        const warrior = { source: TestHelper.buildParseResult([]) }

        const expected = { warriors: [] }
        ;(hillResultMapper.map as sinon.SinonStub).returns(expected)

        const rules = {
            rounds: 1,
            options: {}
        }
        const warriors = [warrior, warrior]

        benchmarkRunner.run(warrior, rules, warriors)

        expect(publisher.queue).to.have.been.calledWith({
            type: MessageType.HillEnd,
            payload: expected
        })
        expect(publisher.publish).to.have.been.called
    })
})
