import * as sinon from 'sinon';
import { expect } from 'chai';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import { IHillRunner } from "@matches/interface/IHillRunner";
import { HillRunner } from '@matches/HillRunner';
import TestHelper from '@simulator/tests/unit/TestHelper';
import { IMatchRunner } from '@matches/interface/IMatchRunner';
import { IMatch } from '@matches/interface/IMatch';
import { IHillWarrior } from '@matches/interface/IHillWarrior';
import { IHillResultMapper } from '@matches/interface/IHillResultMapper';
import { IHillResult } from '@matches/interface/IHillResult';
import { IPublisher } from '@simulator/interface/IPublisher';
import { MessageType } from "@simulator/interface/IMessage";
chai.use(sinonChai);

describe("HillRunner", () => {

    let hillRunner: IHillRunner;

    let publisher: IPublisher;
    let matchRunner: IMatchRunner;
    let hillResultMapper: IHillResultMapper;

    beforeEach(() => {

        publisher = {
            clear: sinon.stub(),
            publish: sinon.stub(),
            queue: sinon.stub(),
            republish: sinon.stub(),
            setPublishProvider: sinon.stub()
        };

        matchRunner = {
            run: sinon.stub()
        };

        hillResultMapper = {
            map: sinon.stub()
        };

        hillRunner = new HillRunner(publisher, matchRunner, hillResultMapper);
    })

    const arraysEqual = <T>(a: T[], b: T[]): boolean =>
        a.every((x, i) => b[i] === x);

    const withWarriors = (a: IHillWarrior, b: IHillWarrior): (IMatch) => boolean =>
        (match: IMatch): boolean =>
            match.warriors.length === 2
                && match.warriors.some(warrior => warrior.source === a.source)
                && match.warriors.some(warrior => warrior.source === b.source);

    it("runs matches in round robin", () => {

        const warriorA =  { source: TestHelper.buildParseResult([]) };
        const warriorB =  { source: TestHelper.buildParseResult([]) };
        const warriorC =  { source: TestHelper.buildParseResult([]) };

        const hill = {
            rules: {
                rounds: 1,
                options: {}
            },
            warriors: [ warriorA, warriorB, warriorC ]
        };

        hillRunner.run(hill);

        expect((matchRunner.run as sinon.SinonStub).calledOnce);
        expect(matchRunner.run).to.have.been.calledWith(sinon.match(withWarriors(warriorA, warriorB)));
        expect(matchRunner.run).to.have.been.calledWith(sinon.match(withWarriors(warriorA, warriorC)));
        expect(matchRunner.run).to.have.been.calledWith(sinon.match(withWarriors(warriorB, warriorC)));
    });
    
    it("returns mapped hill results", () => {

        const expected: IHillResult = {
            warriors: []
        };

        const matches = [{}, {}, {}];
        for (let i = 0; i <= 2; i++) {
            (matchRunner.run as sinon.SinonStub).onCall(i).returns(matches[i])
        }

        const warrior =  { source: TestHelper.buildParseResult([]) };
        const hill = {
            rules: {
                rounds: 2,
                options: {}
            },
            warriors: [ warrior, warrior, warrior ]
        };

        (hillResultMapper.map as sinon.SinonStub)
            .withArgs(hill, sinon.match(arg => arraysEqual(arg, matches)))
            .returns(expected);

        const actual = hillRunner.run(hill);

        expect(actual).to.deep.equal(expected);
    });

    it("publishes HillEnd message at end of hill", () => {

        const warrior =  { source: TestHelper.buildParseResult([]) };

        const expected = {};
        (hillResultMapper.map as sinon.SinonStub).returns(expected);

        const hill = {
            rules: {
                rounds: 1,
                options: {}
            },
            warriors: [ warrior, warrior ]
        };

        hillRunner.run(hill);

        expect(publisher.queue).to.have.been.calledWith({
            type: MessageType.HillEnd,
            payload: expected
        });
        expect(publisher.publish).to.have.been.called;
    });
})