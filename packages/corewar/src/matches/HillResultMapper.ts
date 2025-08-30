import IWarrior from '../simulator/interface/IWarrior'
import { IHillResult } from './interface/IHillResult'
import { IHillResultMapper } from './interface/IHillResultMapper'
import { IHillWarriorResult } from './interface/IHillWarriorResult'
import { IMatchResult } from './interface/IMatchResult'

export class HillResultMapper implements IHillResultMapper {
    private mapMatchResultsToWarriors(warrior: IWarrior, allResults: IMatchResult[]): IHillWarriorResult {
        const matches = allResults.filter(x => !!x.results.find(y => y.warrior.internalId === warrior.internalId))
        const results = matches.flatMap(x => x.results.filter(y => y.warrior.internalId === warrior.internalId))

        const won = results.reduce((accum, result) => accum + result.won, 0) / results.length
        const drawn = results.reduce((accum, result) => accum + result.drawn, 0) / results.length
        const lost = results.reduce((accum, result) => accum + result.lost, 0) / results.length

        return {
            warrior,
            rank: 0,
            score: won * 3 + drawn,
            won,
            drawn,
            lost,
            matches
        }
    }

    public map(warriors: IWarrior[], allResults: IMatchResult[]): IHillResult {
        const warriorResults = warriors.map(warrior => this.mapMatchResultsToWarriors(warrior, allResults))

        const sortedResults = warriorResults.sort((a, b) => b.score - a.score)

        return {
            warriors: sortedResults.map((x, idx) => ({ ...x, rank: idx + 1 }))
        }
    }
}
