import * as chai from "chai";
var expect = chai.expect;

import { IMatchResultMapper } from "@matches/interface/IMatchResultMapper";
import { MatchResultMapper } from "@matches/MatchResultMapper";
import TestHelper from "@simulator/tests/TestHelper";

describe("MatchResultMapper", () => {

    let matchResultMapper: IMatchResultMapper;

    beforeEach(() => {

        matchResultMapper = new MatchResultMapper();
    });

    const buildMatch = (rounds) => {

        return {
            rules: {
                rounds: rounds,
                options: {}
            },
            warriors: [
                { wins: 0, warriorMatchId: 0, source: TestHelper.buildParseResult([]) },
                { wins: 0, warriorMatchId: 1, source: TestHelper.buildParseResult([]) }
            ]
        };
    };

    it("returns a match result with the correct number of rounds", () => {

        const expected = 7;

        const actual = matchResultMapper.map(buildMatch(expected));

        expect(actual.rounds).to.be.equal(expected);
    });

    it("associates each result with the corresponding warrior source", () => {

        const match = buildMatch(1);

        const expected = [
            match.warriors[0].source,
            match.warriors[1].source
        ];

        const actual = matchResultMapper.map(match);

        expect(actual.warriors.length).to.be.equal(2);
        
        expected.forEach((e, i) => expect(match.warriors[i].source).to.be.equal(e));
    });

    it("correctly calculates won, drawn and lost", () => {

        const match = buildMatch(10);

        match.warriors[0].wins = 3;
        match.warriors[1].wins = 2;

        const actual = matchResultMapper.map(match);

        expect(actual.warriors.length).to.be.equal(2);

        const a = actual.warriors[0];
        expect(a.won).to.be.equal(3);
        expect(a.drawn).to.be.equal(5);
        expect(a.lost).to.be.equal(2);

        const b = actual.warriors[1];
        expect(b.won).to.be.equal(2);
        expect(b.drawn).to.be.equal(5);
        expect(b.lost).to.be.equal(3);
    });

    it("correctly calculates points taken and given", () => {

        const match = buildMatch(10);

        match.warriors[0].wins = 3;
        match.warriors[1].wins = 2;

        const actual = matchResultMapper.map(match);

        expect(actual.warriors.length).to.be.equal(2);

        const a = actual.warriors[0];
        expect(a.taken).to.be.equal(140);
        expect(a.given).to.be.equal(110);

        const b = actual.warriors[1];
        expect(b.taken).to.be.equal(110);
        expect(b.given).to.be.equal(140);
    });

    it("handles a match with a single warrior", () => {

        const match = buildMatch(1);
        match.warriors = match.warriors.splice(1, 1);

        const actual = matchResultMapper.map(match);
    });
});