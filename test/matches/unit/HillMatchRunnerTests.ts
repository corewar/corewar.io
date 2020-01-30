import * as sinon from 'sinon';
import { expect } from 'chai';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import { IMatchRunner } from '@matches/interface/IMatchRunner';
import TestHelper from '@simulator/tests/unit/TestHelper';
import { IMatchResult } from '@matches/interface/IMatchResult';
import { IHillMatchRunner } from '@matches/interface/IHillMatchRunner';
import { HillMatchRunner } from '@matches/HillMatchRunner';
chai.use(sinonChai);

describe("HillMatchRunner", () => {

    let hillMatchRunner: IHillMatchRunner;

    let matchRunner: IMatchRunner;

    beforeEach(() => {

        matchRunner = {
            run: sinon.stub()
        };

        hillMatchRunner = new HillMatchRunner(matchRunner);
    });

    it("Runs match with specified warriors and rules and returns result", () => {

        const rules = {
            rounds: 1,
            options: {}
        };
        const warriorA = { source: TestHelper.buildParseResult([]) };
        const warriorB = { source: TestHelper.buildParseResult([]) };

        const expected: IMatchResult = {
            rounds: rules.rounds,
            warriors: []
        };

        (matchRunner.run as sinon.SinonStub)
            .withArgs(sinon.match(match =>
                match.rules === rules &&
                match.warriors.length === 2 &&
                match.warriors.find(warrior => warrior.source === warriorA.source) &&
                match.warriors.find(warrior => warrior.source === warriorB.source)))
            .returns(expected);

        const actual = hillMatchRunner.run(rules, warriorA, warriorB);

        expect(actual).to.be.deep.equal(expected);
    })
})