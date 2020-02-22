import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
const expect = chai.expect
chai.use(sinonChai)

import TestHelper from '@simulator/tests/unit/TestHelper'
import { IMatchRunner } from '@matches/interface/IMatchRunner'
import { MatchRunner } from '@matches/MatchRunner'
import { ISimulator } from '@simulator/interface/ISimulator'
import { IPublisher } from '@simulator/interface/IPublisher'
import { MessageType } from '@simulator/interface/IMessage'
import { IMatchResultMapper } from '@matches/interface/IMatchResultMapper'
import { IMatchWarrior } from '@matches/interface/IMatchWarrior'

describe('MatchRunner', () => {
    let matchRunner: IMatchRunner
    let simulator: ISimulator
    let publisher: IPublisher
    let matchResultMapper: IMatchResultMapper

    beforeEach(() => {
        publisher = TestHelper.buildPublisher()

        matchResultMapper = {
            map: sinon.stub()
        }

        simulator = {
            initialise: sinon.stub(),
            run: sinon.stub(),
            step: sinon.stub(),
            getState: sinon.stub()
        }
        ;(simulator.run as sinon.SinonStub).returns({})

        matchRunner = new MatchRunner(simulator, matchResultMapper, publisher)
    })

    it('Assigns a unique ID to each warrior', () => {
        const expected = [0, 1, 2]

        const rules = {
            rounds: 1,
            options: {}
        }
        const warriors = [
            { source: TestHelper.buildParseResult([]) },
            { source: TestHelper.buildParseResult([]) },
            { source: TestHelper.buildParseResult([]) }
        ]

        let actual = null
        ;(matchResultMapper.map as sinon.SinonStub).callsFake(warriors => {
            actual = warriors
            return {
                rounds: 1,
                warriors: []
            }
        })

        matchRunner.run(rules, warriors)

        expect(actual).not.be.null
        expect(actual.length).to.be.equal(expected.length)
        for (let i = 0; i < expected.length; i++) {
            expect(actual[i].internalId).to.be.equal(expected[i])
        }
    })

    it('Does not assign a unique ID to each warrior if one is already present', () => {
        const expected = [4, 5, 6]

        const rules = {
            rounds: 1,
            options: {}
        }
        const warriors = [
            { internalId: expected[0], source: TestHelper.buildParseResult([]) },
            { internalId: expected[1], source: TestHelper.buildParseResult([]) },
            { internalId: expected[2], source: TestHelper.buildParseResult([]) }
        ]

        let actual = null
        ;(matchResultMapper.map as sinon.SinonStub).callsFake(warriors => {
            actual = warriors
            return {
                rounds: 1,
                warriors: []
            }
        })

        matchRunner.run(rules, warriors)

        expect(actual).not.be.null
        expect(actual.length).to.be.equal(expected.length)
        for (let i = 0; i < expected.length; i++) {
            expect(actual[i].internalId).to.be.equal(expected[i])
        }
    })

    it("intialises the simulator using the match's rules and warriors", () => {
        const expectedOptions = {}

        const expectedWarrior: IMatchWarrior = {
            source: TestHelper.buildParseResult([])
        }

        const rules = {
            rounds: 1,
            options: expectedOptions
        }
        const warriors = [expectedWarrior]

        matchRunner.run(rules, warriors)

        expect(simulator.initialise).to.have.been.calledWith(expectedOptions, [
            {
                source: expectedWarrior.source,
                internalId: 0
            }
        ])
    })

    it('records the number of wins for a warrior', () => {
        const rules = {
            rounds: 5,
            options: {}
        }
        const warriors = [{ source: TestHelper.buildParseResult([]) }, { source: TestHelper.buildParseResult([]) }]

        const id = 0
        const roundResults = [
            { outcome: 'WIN', winnerId: id },
            { outcome: 'WIN', winnerId: id + 1 },
            { outcome: 'WIN', winnerId: id },
            { outcome: 'DRAW' },
            { outcome: 'NONE' }
        ]

        roundResults.forEach((r, i) => (simulator.run as sinon.SinonStub).onCall(i).returns(r))

        let actualWarriors
        let actualRoundResults
        ;(matchResultMapper.map as sinon.SinonStub).callsFake((warriors, roundResults) => {
            actualWarriors = warriors
            actualRoundResults = roundResults

            return {
                rounds: 1,
                warriors: []
            }
        })

        matchRunner.run(rules, warriors)

        expect(actualWarriors).not.to.be.null
        expect(actualWarriors).to.be.deep.equal(warriors)
        expect(actualRoundResults).not.to.be.null
        expect(actualRoundResults).to.be.deep.equal(roundResults)
    })

    it('initialises and runs the simulator once per round', () => {
        const expected = 7

        const rules = {
            rounds: expected,
            options: {}
        }
        const warriors = [{ source: TestHelper.buildParseResult([]) }]

        matchRunner.run(rules, warriors)

        expect(simulator.initialise).to.have.callCount(expected)
        expect(simulator.run).to.have.callCount(expected)
    })

    it('throws and error is simulator does not return a result', () => {
        ;(simulator.run as sinon.SinonStub).returns(null)

        expect(matchRunner.run).to.throw()
    })

    it('publishes match result message at end of match', () => {
        publisher.queue = sinon.stub()
        publisher.publish = sinon.stub()

        const rules = {
            rounds: 3,
            options: {}
        }
        const warriors = [{ source: TestHelper.buildParseResult([]) }]
        ;(simulator.run as sinon.SinonStub).returns({
            outcome: 'WIN',
            winnerData: { warriorMatchId: 0 }
        })

        const expected = {
            rounds: 1,
            warriors: []
        }
        ;(matchResultMapper.map as sinon.SinonStub).returns(expected)

        matchRunner.run(rules, warriors)

        expect(publisher.queue).to.have.been.calledWith({
            type: MessageType.MatchEnd,
            payload: expected
        })
        expect(publisher.publish).to.have.been.called
    })
})
