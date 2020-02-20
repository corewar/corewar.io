import * as chai from "chai";
import { expect } from "chai";
import * as sinonChai from "sinon-chai";
import { IHillResultMapper } from "@matches/interface/IHillResultMapper";
import { HillResultMapper } from "@matches/HillResultMapper";
import TestHelper from "@simulator/tests/unit/TestHelper";
import { IMatchResult } from "@matches/interface/IMatchResult";
import { IMatchWarriorResult } from "@matches/interface/IMatchWarriorResult";
import { IHillWarrior } from "@matches/interface/IHillWarrior";
chai.use(sinonChai);

describe("HillResultMapper", () => {

    let hillResultMapper: IHillResultMapper;

    beforeEach(() => {
        hillResultMapper = new HillResultMapper();
    });

    const buildResult = (
        warrior: IHillWarrior,
        won = 1,
        drawn = 1,
        lost = 1): IMatchWarriorResult => ({
            warrior,
            won,
            drawn,
            lost,
            given: lost * 3 + drawn * 1,
            taken: won * 3 + drawn * 1
        })

    it("produces hill result for each warrior", () => {

        const warriorA = { source: TestHelper.buildParseResult([]) };
        const warriorB = { source: TestHelper.buildParseResult([]) };
        const warriorC = { source: TestHelper.buildParseResult([]) };

        const hill = {
            rules: {
                rounds: 1,
                options: {}
            },
            warriors: [warriorA, warriorB, warriorC]
        };

        const results: IMatchResult[] = [
            { rounds: hill.rules.rounds, results: [buildResult(warriorA), buildResult(warriorB)] },
            { rounds: hill.rules.rounds, results: [buildResult(warriorA), buildResult(warriorC)] },
            { rounds: hill.rules.rounds, results: [buildResult(warriorB), buildResult(warriorC)] }
        ];

        const actual = hillResultMapper.map(hill, results);

        expect(actual.warriors.length).to.be.equal(3);
        expect(actual.warriors.find(x => x.source == warriorA.source)).not.to.be.undefined;
        expect(actual.warriors.find(x => x.source == warriorB.source)).not.to.be.undefined;
        expect(actual.warriors.find(x => x.source == warriorC.source)).not.to.be.undefined;
    });

    it("calculates average won, drawn and lost percentage for each warrior", () => {

        const warriorA = { source: TestHelper.buildParseResult([]) };
        const warriorB = { source: TestHelper.buildParseResult([]) };
        const warriorC = { source: TestHelper.buildParseResult([]) };
        const warriorD = { source: TestHelper.buildParseResult([]) };

        const hill = {
            rules: {
                rounds: 1,
                options: {}
            },
            warriors: [warriorA, warriorB, warriorC]
        };

        const results: IMatchResult[] = [
            { rounds: hill.rules.rounds, results: [buildResult(warriorA, 60, 30, 10), buildResult(warriorB)] },
            { rounds: hill.rules.rounds, results: [buildResult(warriorA, 40, 20, 40), buildResult(warriorC)] },
            { rounds: hill.rules.rounds, results: [buildResult(warriorA, 70, 20, 10), buildResult(warriorD)] }
        ];

        const result = hillResultMapper.map(hill, results);
        const actual = result.warriors.find(x => x.source === warriorA.source);

        const won = (60 + 40 + 70) / 3;
        const lost = (10 + 40 + 10) / 3;
        const drawn = (30 + 20 + 20) / 3;
        expect(actual.won).to.be.equal(won);
        expect(actual.drawn).to.be.equal(drawn);
        expect(actual.lost).to.be.equal(lost);
    });

    it("calculates total score for each warrior based upon average win and draw percentage", () => {

        const warriorA = { source: TestHelper.buildParseResult([]) };
        const warriorB = { source: TestHelper.buildParseResult([]) };
        const warriorC = { source: TestHelper.buildParseResult([]) };
        const warriorD = { source: TestHelper.buildParseResult([]) };

        const hill = {
            rules: {
                rounds: 1,
                options: {}
            },
            warriors: [warriorA, warriorB, warriorC]
        };

        const results: IMatchResult[] = [
            { rounds: hill.rules.rounds, results: [buildResult(warriorA, 60, 30, 10), buildResult(warriorB)] },
            { rounds: hill.rules.rounds, results: [buildResult(warriorA, 40, 20, 40), buildResult(warriorC)] },
            { rounds: hill.rules.rounds, results: [buildResult(warriorA, 70, 20, 10), buildResult(warriorD)] }
        ];

        const result = hillResultMapper.map(hill, results);
        const actual = result.warriors.find(x => x.source === warriorA.source);

        const won = (60 + 40 + 70) / 3;
        const drawn = (30 + 20 + 20) / 3;
        expect(actual.score).to.be.equal(won * 3 + drawn);
    });

    it("associates individual match results with each warrior in the hill result", () => {

        const warriorA = { source: TestHelper.buildParseResult([]) };
        const warriorB = { source: TestHelper.buildParseResult([]) };
        const warriorC = { source: TestHelper.buildParseResult([]) };

        const hill = {
            rules: {
                rounds: 1,
                options: {}
            },
            warriors: [warriorA, warriorB, warriorC]
        };

        const results: IMatchResult[] = [
            { rounds: hill.rules.rounds, results: [buildResult(warriorA), buildResult(warriorB)] },
            { rounds: hill.rules.rounds, results: [buildResult(warriorA), buildResult(warriorC)] },
            { rounds: hill.rules.rounds, results: [buildResult(warriorB), buildResult(warriorC)] }
        ];

        const warriorAMatches = [results[0], results[1]];
        const warriorBMatches = [results[0], results[2]];
        const warriorCMatches = [results[1], results[2]];

        const actual = hillResultMapper.map(hill, results);

        const warriorAResult = actual.warriors.find(x => x.source == warriorA.source);
        expect(warriorAResult.matches).to.deep.equal(warriorAMatches);

        const warriorBResult = actual.warriors.find(x => x.source == warriorB.source);
        expect(warriorBResult.matches).to.deep.equal(warriorBMatches);

        const warriorCResult = actual.warriors.find(x => x.source == warriorC.source);
        expect(warriorCResult.matches).to.deep.equal(warriorCMatches);
    });

    it("ranks each warrior based upon their score", () => {

        const warriorA = { source: TestHelper.buildParseResult([]) };
        const warriorB = { source: TestHelper.buildParseResult([]) };
        const warriorC = { source: TestHelper.buildParseResult([]) };

        const hill = {
            rules: {
                rounds: 1,
                options: {}
            },
            warriors: [warriorA, warriorB, warriorC]
        };

        const results: IMatchResult[] = [
            { rounds: hill.rules.rounds, results: [buildResult(warriorA, 0, 1, 1), buildResult(warriorB, 1, 1, 0)] },
            { rounds: hill.rules.rounds, results: [buildResult(warriorA, 0, 0, 2), buildResult(warriorC, 2, 0, 0)] },
            { rounds: hill.rules.rounds, results: [buildResult(warriorB, 0, 1, 1), buildResult(warriorC, 1, 1, 0)] }
        ];

        const actual = hillResultMapper.map(hill, results);

        const warriorAResult = actual.warriors.find(x => x.source == warriorA.source);
        expect(warriorAResult.rank).to.be.equal(3);

        const warriorBResult = actual.warriors.find(x => x.source == warriorB.source);
        expect(warriorBResult.rank).to.be.equal(2);

        const warriorCResult = actual.warriors.find(x => x.source == warriorC.source);
        expect(warriorCResult.rank).to.be.equal(1);
    });
});