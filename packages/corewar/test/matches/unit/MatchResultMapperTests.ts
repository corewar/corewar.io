import * as chai from "chai";
const expect = chai.expect;

import { IMatchResultMapper } from "@matches/interface/IMatchResultMapper";
import { MatchResultMapper } from "@matches/MatchResultMapper";
import TestHelper from "@simulator/tests/unit/TestHelper";
import IWarrior from "@simulator/interface/IWarrior";
import { IRoundResult } from "@simulator/interface/IRoundResult";

describe("MatchResultMapper", () => {

    let matchResultMapper: IMatchResultMapper;

    beforeEach(() => {

        matchResultMapper = new MatchResultMapper();
    });

    const buildRoundResults = (rounds): IRoundResult[] => {
        const results: IRoundResult[] = [];
        for (let i = 0; i < rounds; i++) {
            results.push({
                outcome: "DRAW",
                winnerId: 0
            });
        }
        return results;
    };

    const buildWarriors = (): IWarrior[] => [
        { source: TestHelper.buildParseResult([]) },
        { source: TestHelper.buildParseResult([]) }
    ];

    it("returns a match result with the correct number of rounds", () => {

        const expected = 7;

        const actual = matchResultMapper.map(buildWarriors(), buildRoundResults(expected));

        expect(actual.rounds).to.be.equal(expected);
    });

    it("associates each result with the corresponding warrior source", () => {

        const warriors = buildWarriors();

        const actual = matchResultMapper.map(warriors, buildRoundResults(10));

        expect(actual.results.length).to.be.equal(2);

        warriors.forEach(expected =>
            expect(actual.results.find(result => result.warrior === expected)).not.to.be.null
        );
    });

    it("correctly calculates won, drawn and lost", () => {

        const warriors = buildWarriors();
        warriors[0].internalId = 1;
        warriors[1].internalId = 2;

        const results: IRoundResult[] = [
            { outcome: "WIN", winnerId: 1 },
            { outcome: "WIN", winnerId: 1 },
            { outcome: "WIN", winnerId: 1 },
            { outcome: "WIN", winnerId: 2 },
            { outcome: "WIN", winnerId: 2 },
            { outcome: "DRAW" },
            { outcome: "DRAW" },
            { outcome: "DRAW" },
            { outcome: "DRAW" },
            { outcome: "DRAW" },
        ];

        const actual = matchResultMapper.map(warriors, results);

        expect(actual.results.length).to.be.equal(2);

        const a = actual.results[0];
        expect(a.won).to.be.equal(3);
        expect(a.drawn).to.be.equal(5);
        expect(a.lost).to.be.equal(2);

        const b = actual.results[1];
        expect(b.won).to.be.equal(2);
        expect(b.drawn).to.be.equal(5);
        expect(b.lost).to.be.equal(3);
    });

    it("correctly calculates points taken and given", () => {

        const warriors = buildWarriors();
        warriors[0].internalId = 1;
        warriors[1].internalId = 2;

        const results: IRoundResult[] = [
            { outcome: "WIN", winnerId: 1 },
            { outcome: "WIN", winnerId: 1 },
            { outcome: "WIN", winnerId: 1 },
            { outcome: "WIN", winnerId: 2 },
            { outcome: "WIN", winnerId: 2 },
            { outcome: "DRAW" },
            { outcome: "DRAW" },
            { outcome: "DRAW" },
            { outcome: "DRAW" },
            { outcome: "DRAW" },
        ];

        const actual = matchResultMapper.map(warriors, results);

        expect(actual.results.length).to.be.equal(2);

        const a = actual.results[0];
        expect(a.taken).to.be.equal(140);
        expect(a.given).to.be.equal(110);

        const b = actual.results[1];
        expect(b.taken).to.be.equal(110);
        expect(b.given).to.be.equal(140);
    });

    it("handles a match with a single warrior", () => {

        const warriors = buildWarriors().splice(1, 1);

        expect(matchResultMapper.map(warriors, [{ outcome: "DRAW" }])).not.to.throw;
    });
});