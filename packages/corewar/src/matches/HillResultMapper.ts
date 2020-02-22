import { IHillResultMapper } from "@matches/interface/IHillResultMapper";
import { IHillResult } from "@matches/interface/IHillResult";
import { IMatchResult } from "@matches/interface/IMatchResult";
import { IHillWarriorResult } from "@matches/interface/IHillWarriorResult";
import IWarrior from "@simulator/interface/IWarrior";

export class HillResultMapper implements IHillResultMapper {

    private mapMatchResultsToWarriors(warrior: IWarrior, allResults: IMatchResult[]): IHillWarriorResult {

        const matches = allResults.filter(
            x => !!x.results.find(y => y.warrior.internalId === warrior.internalId)
        );
        const results = matches.flatMap(
            x => x.results.filter(y => y.warrior.internalId === warrior.internalId)
        );

        const won = results.reduce((accum, result) => accum + result.won, 0) / results.length;
        const drawn = results.reduce((accum, result) => accum + result.drawn, 0) / results.length;
        const lost = results.reduce((accum, result) => accum + result.lost, 0) / results.length;

        return {
            warrior,
            rank: 0,
            score: won * 3 + drawn,
            won,
            drawn,
            lost,
            matches
        };
    }

    public map(warriors: IWarrior[], allResults: IMatchResult[]): IHillResult {

        const warriorResults = warriors.map(warrior => this.mapMatchResultsToWarriors(warrior, allResults));

        const sortedResults = warriorResults.sort((a, b) => b.score - a.score);
        
        return {
            warriors: sortedResults.map((x, idx) => ({ ...x, rank: idx + 1 }))
        };
    }
}