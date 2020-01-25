import { IHillResultMapper } from "@matches/interface/IHillResultMapper";
import { IHillResult } from "@matches/interface/IHillResult";
import { IMatchResult } from "@matches/interface/IMatchResult";
import { IHill } from "@matches/interface/IHill";

export class HillResultMapper implements IHillResultMapper {

    public map(hill: IHill, allResults: IMatchResult[]): IHillResult {

        return {
            warriors: hill.warriors.map(warrior => {
                const results = allResults.flatMap(
                    x => x.warriors.filter(y => y.source === warrior.source)
                );
                return {
                    source: warrior.source,
                    age: 0,
                    won: results.reduce((accum, result) => accum + result.won, 0) * 3 / results.length,
                    drawn: results.reduce((accum, result) => accum + result.drawn, 0) * 1 / results.length,
                    lost: results.reduce((accum, result) => accum + result.lost, 0) * 3 / results.length,
                    matches: []
                };
            })
        };
    }
}