import * as sinon from 'sinon'
import { expect } from 'chai'
import * as chai from 'chai'
import * as sinonChai from 'sinon-chai'
import { IHillRunner } from '@matches/interface/IHillRunner'
import { HillRunner } from '@matches/HillRunner'
import TestHelper from '@simulator/tests/unit/TestHelper'
import { IHillResultMapper } from '@matches/interface/IHillResultMapper'
import { IHillResult } from '@matches/interface/IHillResult'
import { IPublisher } from '@simulator/interface/IPublisher'
import { MessageType } from '@simulator/interface/IMessage'
import { IMatchRunner } from '@matches/interface/IMatchRunner'
import IWarrior from '@simulator/interface/IWarrior'
chai.use(sinonChai)

describe('HillRunner', () => {
    let hillRunner: IHillRunner

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
            map: sinon.stub()
        }

        hillRunner = new HillRunner(publisher, matchRunner, hillResultMapper)
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
        const warriors = [warriorA, warriorB, warriorC]

        hillRunner.run(rules, warriors)

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
        const warriors = [warriorA, warriorB, warriorC]

        hillRunner.run(rules, warriors)

        expect(warriorA.internalId).to.be.equal(expected[0])
        expect(warriorB.internalId).to.be.equal(expected[1])
        expect(warriorC.internalId).to.be.equal(expected[2])
    })

    const arraysEqual = <T>(a: T[], b: T[]): boolean => a.every((x, i) => b[i] === x)

    it('runs matches in round robin', () => {
        const warriorA = { source: TestHelper.buildParseResult([]) }
        const warriorB = { source: TestHelper.buildParseResult([]) }
        const warriorC = { source: TestHelper.buildParseResult([]) }

        const rules = {
            rounds: 1,
            options: {}
        }
        const warriors = [warriorA, warriorB, warriorC]

        hillRunner.run(rules, warriors)

        expect((matchRunner.run as sinon.SinonStub).calledOnce)
        expect(matchRunner.run).to.have.been.calledWith(rules, [warriorA, warriorB])
        expect(matchRunner.run).to.have.been.calledWith(rules, [warriorA, warriorC])
        expect(matchRunner.run).to.have.been.calledWith(rules, [warriorB, warriorC])
    })

    it('returns mapped hill results', () => {
        const expected: IHillResult = {
            warriors: []
        }

        const matches = [{}, {}, {}]
        for (let i = 0; i <= 2; i++) {
            ;(matchRunner.run as sinon.SinonStub).onCall(i).returns(matches[i])
        }

        const warrior = { source: TestHelper.buildParseResult([]) }
        const rules = {
            rounds: 2,
            options: {}
        }
        const warriors = [warrior, warrior, warrior]
        ;(hillResultMapper.map as sinon.SinonStub)
            .withArgs(
                sinon.match(() => true),
                sinon.match(arg => arraysEqual(arg, matches))
            )
            .returns(expected)

        const actual = hillRunner.run(rules, warriors)

        expect(actual).to.deep.equal(expected)
    })

    it('publishes HillEnd message at end of hill', () => {
        const warrior = { source: TestHelper.buildParseResult([]) }

        const expected = {}
        ;(hillResultMapper.map as sinon.SinonStub).returns(expected)

        const rules = {
            rounds: 1,
            options: {}
        }
        const warriors = [warrior, warrior]

        hillRunner.run(rules, warriors)

        expect(publisher.queue).to.have.been.calledWith({
            type: MessageType.HillEnd,
            payload: expected
        })
        expect(publisher.publish).to.have.been.called
    })
})
