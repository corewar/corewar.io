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
        source: warrior.source,
        won,
        drawn,
        lost,
        given: lost * 100 * 3 + drawn * 100 * 1,
        taken: won * 100 * 3 + drawn * 100 * 1
    })

    it("Produces hill result for each warrior", () => {

        const warriorA =  { source: TestHelper.buildParseResult([]) };
        const warriorB =  { source: TestHelper.buildParseResult([]) };
        const warriorC =  { source: TestHelper.buildParseResult([]) };

        const hill = {
            rules: {
                rounds: 1,
                options: {}
            },
            warriors: [warriorA, warriorB, warriorC]
        };

        const results: IMatchResult[] = [
            { rounds: hill.rules.rounds, warriors: [buildResult(warriorA), buildResult(warriorB)] },
            { rounds: hill.rules.rounds, warriors: [buildResult(warriorA), buildResult(warriorC)] },
            { rounds: hill.rules.rounds, warriors: [buildResult(warriorB), buildResult(warriorC)] }
        ];

        const actual = hillResultMapper.map(hill, results);

        expect(actual.warriors.length).to.be.equal(3);
        expect(actual.warriors.find(x => x.source == warriorA.source)).not.to.be.undefined;
        expect(actual.warriors.find(x => x.source == warriorB.source)).not.to.be.undefined;
        expect(actual.warriors.find(x => x.source == warriorC.source)).not.to.be.undefined;
    });

    
});