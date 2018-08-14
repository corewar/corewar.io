import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
var expect = chai.expect;
chai.use(sinonChai);

import { IMatch } from "../interface/IMatch";
import { IParseResult } from "../../parser/interface/IParseResult";
import TestHelper from "../../simulator/tests/TestHelper";
import { IMatchRunner } from "../interface/IMatchRunner";
import { MatchRunner } from "../MatchRunner";
import { Simulator } from "../../simulator/Simulator";
import { ISimulator } from "../../simulator/interface/ISimulator";

describe("MatchRunner", () => {

    let matchRunner: IMatchRunner;
    let simulator: ISimulator;

    beforeEach(() => {

        const publisher = TestHelper.buildPublisher();

        simulator = {
            initialise: sinon.stub(),
            run: sinon.stub(),
            step: sinon.stub(),
            getState: sinon.stub()
        };
        (<sinon.stub>simulator.run).returns({});

        matchRunner = new MatchRunner(simulator, publisher);
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

        const actual = matchRunner.run(match);

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


});