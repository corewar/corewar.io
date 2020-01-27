import { IHillResultMapper } from "@matches/interface/IHillResultMapper";
import { IHillResult } from "@matches/interface/IHillResult";
import { IMatchResult } from "@matches/interface/IMatchResult";
import { IHill } from "@matches/interface/IHill";
import { IHillWarrior } from "@matches/interface/IHillWarrior";
import { IHillWarriorResult } from "@matches/interface/IHillWarriorResult";

export class HillResultMapper implements IHillResultMapper {

    private mapMatchResultsToWarriors(warrior: IHillWarrior, allResults: IMatchResult[]): IHillWarriorResult {

        const matches = allResults.filter(
            x => !!x.warriors.find(y => y.source === warrior.source)
        );
        const results = matches.flatMap(
            x => x.warriors.filter(y => y.source === warrior.source)
        );

        const won = results.reduce((accum, result) => accum + result.won, 0) / results.length;
        const drawn = results.reduce((accum, result) => accum + result.drawn, 0) / results.length;
        const lost = results.reduce((accum, result) => accum + result.lost, 0) / results.length;

        return {
            source: warrior.source,
            rank: 0,
            score: won * 3 + drawn,
            won,
            drawn,
            lost,
            matches
        };
    }

    public map(hill: IHill, allResults: IMatchResult[]): IHillResult {

        const warriorResults = hill.warriors.map(warrior => this.mapMatchResultsToWarriors(warrior, allResults));

        const sortedResults = warriorResults.sort((a, b) => b.score - a.score);
        
        return {
            warriors: sortedResults.map((x, idx) => ({ ...x, rank: idx + 1 }))
        };
    }
}