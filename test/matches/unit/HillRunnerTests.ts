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
chai.use(sinonChai);

describe('HillRunner', () => {

    let hillRunner: IHillRunner;

    let matchRunner: IMatchRunner;

    beforeEach(() => {
        matchRunner = {
            run: sinon.stub()
        };

        hillRunner = new HillRunner(matchRunner);
    })

    const withWarriors = (a: IHillWarrior, b: IHillWarrior): (IMatch) => boolean =>
        (match: IMatch): boolean =>
            match.warriors.length === 2
                && match.warriors.some(warrior => warrior.source === a.source)
                && match.warriors.some(warrior => warrior.source === b.source)

    it('should run match in round robin', () => {

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
    })
})