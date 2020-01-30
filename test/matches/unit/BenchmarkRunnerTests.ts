import * as sinon from 'sinon';
import { expect } from 'chai';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import TestHelper from '@simulator/tests/unit/TestHelper';
import { IHillMatchRunner } from '@matches/interface/IHillMatchRunner';
import { IHillResultMapper } from '@matches/interface/IHillResultMapper';
import { IHillResult } from '@matches/interface/IHillResult';
import { IPublisher } from '@simulator/interface/IPublisher';
import { MessageType } from "@simulator/interface/IMessage";
import { IBenchmarkRunner } from '@matches/interface/IBenchmarkRunner';
import { BenchmarkRunner } from '@matches/BenchmarkRunner';
import { IHillWarriorResult } from '@matches/interface/IHillWarriorResult';
import { IParseResult } from '@parser/interface/IParseResult';
chai.use(sinonChai);

describe("BenchmarkRunner", () => {

    let benchmarkRunner: IBenchmarkRunner;

    let publisher: IPublisher;
    let hillMatchRunner: IHillMatchRunner;
    let hillResultMapper: IHillResultMapper;

    beforeEach(() => {

        publisher = {
            clear: sinon.stub(),
            publish: sinon.stub(),
            queue: sinon.stub(),
            republish: sinon.stub(),
            setPublishProvider: sinon.stub()
        };

        hillMatchRunner = {
            run: sinon.stub()
        };

        hillResultMapper = {
            map: sinon.stub()
        };

        benchmarkRunner = new BenchmarkRunner(publisher, hillMatchRunner, hillResultMapper);
    })

    const arraysEqual = <T>(a: T[], b: T[]): boolean =>
        a.every((x, i) => b[i] === x);

    it("runs a match for each warrior in the benchmark against the submitted warrior", () => {

        (hillResultMapper.map as sinon.SinonStub).returns({ warriors: [] });

        const warrior = { source: TestHelper.buildParseResult([]) };
        const warriorA = { source: TestHelper.buildParseResult([]) };
        const warriorB = { source: TestHelper.buildParseResult([]) };
        const warriorC = { source: TestHelper.buildParseResult([]) };

        const benchmark = {
            rules: {
                rounds: 1,
                options: {}
            },
            warriors: [warriorA, warriorB, warriorC]
        };

        benchmarkRunner.run(warrior, benchmark);

        expect((hillMatchRunner.run as sinon.SinonStub).calledOnce);
        expect(hillMatchRunner.run).to.have.been.calledWith(benchmark.rules, warrior, warriorA);
        expect(hillMatchRunner.run).to.have.been.calledWith(benchmark.rules, warrior, warriorB);
        expect(hillMatchRunner.run).to.have.been.calledWith(benchmark.rules, warrior, warriorC);
    });

    const buildMatchResult = (source: IParseResult): IHillWarriorResult => ({
        drawn: 1,
        lost: 1,
        won: 1,
        rank: 1,
        score: 1,
        source,
        matches: []
    })

    it("returns mapped hill results for submitted warrior only", () => {

        const matches = [{}, {}, {}];
        for (let i = 0; i <= 2; i++) {
            (hillMatchRunner.run as sinon.SinonStub).onCall(i).returns(matches[i])
        }

        const warrior = { source: TestHelper.buildParseResult([]) };
        const otherWarrior = { source: TestHelper.buildParseResult([]) };
        const benchmark = {
            rules: {
                rounds: 2,
                options: {}
            },
            warriors: [otherWarrior, otherWarrior, otherWarrior]
        };

        const expected = buildMatchResult(warrior.source);

        const mappedResult: IHillResult = {
            warriors: [
                expected,
                buildMatchResult(otherWarrior.source),
                buildMatchResult(otherWarrior.source),
                buildMatchResult(otherWarrior.source)
            ]
        };

        (hillResultMapper.map as sinon.SinonStub)
            .withArgs(benchmark, sinon.match(arg => arraysEqual(arg, matches)))
            .returns(mappedResult);

        const actual = benchmarkRunner.run(warrior, benchmark);

        expect(actual).to.deep.equal({ warriors: [expected] });
    });

    it("publishes HillEnd message at end of hill", () => {

        const warrior = { source: TestHelper.buildParseResult([]) };

        const expected = { warriors: [] };
        (hillResultMapper.map as sinon.SinonStub).returns(expected);

        const benchmark = {
            rules: {
                rounds: 1,
                options: {}
            },
            warriors: [warrior, warrior]
        };

        benchmarkRunner.run(warrior, benchmark);

        expect(publisher.queue).to.have.been.calledWith({
            type: MessageType.HillEnd,
            payload: expected
        });
        expect(publisher.publish).to.have.been.called;
    });
})