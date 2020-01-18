import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
var expect = chai.expect;
chai.use(sinonChai);

import { IMatch } from "../interface/IMatch";
import TestHelper from "../../simulator/tests/TestHelper";
import { IMatchRunner } from "../interface/IMatchRunner";
import { MatchRunner } from "../MatchRunner";
import { ISimulator } from "../../simulator/interface/ISimulator";
import { IPublisher } from "../../simulator/interface/IPublisher";
import { MessageType } from "../../simulator/interface/IMessage";
import { IMatchResultMapper } from "../interface/IMatchResultMapper";

describe("MatchRunner", () => {

    let matchRunner: IMatchRunner;
    let simulator: ISimulator;
    let publisher: IPublisher;
    let matchResultMapper: IMatchResultMapper;

    beforeEach(() => {

        publisher = TestHelper.buildPublisher();

        matchResultMapper = {
            map: sinon.stub()
        };

        simulator = {
            initialise: sinon.stub(),
            run: sinon.stub(),
            step: sinon.stub(),
            getState: sinon.stub()
        };
        (<sinon.SinonStub>simulator.run).returns({});

        matchRunner = new MatchRunner(simulator, matchResultMapper, publisher);
    });

    it("Assigns a unique match ID to each warrior", () => {

        const expected = [0, 1, 2];

        const match: IMatch = {
            rules: {
                rounds: 1,
                options: {}
            },
            warriors: [
                { source: TestHelper.buildParseResult([]) },
                { source: TestHelper.buildParseResult([]) },
                { source: TestHelper.buildParseResult([]) }
            ]
        };

        let actual = null;
        (<sinon.SinonStub>matchResultMapper.map).callsFake(m => {

            actual = m;
            return {
                rounds: 1,
                warriors: []
            };
        });

        matchRunner.run(match);

        expect(actual).not.be.null;
        expect(actual.warriors.length).to.be.equal(expected.length);
        for (let i = 0; i < expected.length; i++) {
            expect(actual.warriors[i].warriorMatchId).to.be.equal(expected[i]);
            expect(actual.warriors[i].source.data.warriorMatchId).to.be.equal(expected[i]);
        }
    });

    it("intialises the simulator using the match's rules and warriors", () => {

        const expectedOptions = {};

        const expectedSource = TestHelper.buildParseResult([]);

        const match: IMatch = {
            rules: {
                rounds: 1,
                options: expectedOptions
            },
            warriors: [{
                source: expectedSource
            }]
        };

        matchRunner.run(match);

        expect(simulator.initialise).to.have.been.calledWith(
            expectedOptions,
            [expectedSource]);
    });

    it("records the number of wins for a warrior", () => {

        const match: IMatch = {
            rules: {
                rounds: 5,
                options: {}
            },
            warriors: [
                { source: TestHelper.buildParseResult([]) },
                { source: TestHelper.buildParseResult([]) }
            ]
        };

        const id = 0;
        const roundResults = [
            { outcome: "WIN", winnerData: { warriorMatchId: id } },
            { outcome: "WIN", winnerData: { warriorMatchId: id + 1 } },
            { outcome: "WIN", winnerData: { warriorMatchId: id } },
            { outcome: "DRAW" },
            { outcome: "NONE" }
        ];

        roundResults.forEach((r, i) => (<sinon.SinonStub>simulator.run).onCall(i).returns(r));

        let actual = null;
        (<sinon.SinonStub>matchResultMapper.map).callsFake(m => {

            actual = m;
            return {
                rounds: 1,
                warriors: []
            };
        });

        matchRunner.run(match);

        expect(actual).not.to.be.null;
        expect(actual.warriors.length).to.be.equal(2);
        expect(actual.warriors[0].wins).to.be.equal(2);
        expect(actual.warriors[1].wins).to.be.equal(1);
    });

    it("initialises and runs the simulator once per round", () => {

        const expected = 7;

        const match: IMatch = {
            rules: {
                rounds: expected,
                options: {}
            },
            warriors: [{ source: TestHelper.buildParseResult([]) }]
        };

        matchRunner.run(match);

        expect(simulator.initialise).to.have.callCount(expected);
        expect(simulator.run).to.have.callCount(expected);
    });

    it("throws and error is simulator does not return a result", () => {

        const match: IMatch = {
            rules: {
                rounds: 1,
                options: {}
            },
            warriors: []
        };

        (<sinon.SinonStub>simulator.run).returns(null);

        expect(matchRunner.run).to.throw();
    });

    it("publishes match result message at end of match", () => {

        publisher.queue = sinon.stub();
        publisher.publish = sinon.stub();

        const match: IMatch = {
            rules: {
                rounds: 3,
                options: {}
            },
            warriors: [{ source: TestHelper.buildParseResult([]) }]
        };

        (<sinon.SinonStub>simulator.run).returns({ 
            outcome: "WIN", 
            winnerData: { warriorMatchId: 0 }
        });

        const expected = {
            rounds: 1,
            warriors: []
        };
        (<sinon.SinonStub>matchResultMapper.map).returns(expected);

        const actual = matchRunner.run(match);

        expect(publisher.queue).to.have.been.calledWith({
            type: MessageType.MatchEnd,
            payload: expected
        });
        expect(publisher.publish).to.have.been.called;
    });
});