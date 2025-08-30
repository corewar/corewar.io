import { IMatchResultMapper } from './interface/IMatchResultMapper'
import { IMatchResult } from './interface/IMatchResult'
import { IMatchWarriorResult } from './interface/IMatchWarriorResult'
import { IRoundResult } from '../simulator/interface/IRoundResult'
import IWarrior from '../simulator/interface/IWarrior'

export class MatchResultMapper implements IMatchResultMapper {
    private getWarriorResult(warrior: IWarrior, roundResults: IRoundResult[]): IMatchWarriorResult {
        const rounds = roundResults.length

        const won = roundResults.filter(r => r.outcome === 'WIN' && r.winnerId === warrior.internalId).length
        const lost = roundResults.filter(r => r.outcome === 'WIN' && r.winnerId !== warrior.internalId).length
        const drawn = rounds - won - lost

        const winpoints = (won / rounds) * 100 * 3
        const drawpoints = (drawn / rounds) * 100 * 1
        const losepoints = (lost / rounds) * 100 * 3

        return {
            warrior,
            won,
            drawn,
            lost,
            given: losepoints + drawpoints,
            taken: winpoints + drawpoints
        }
    }

    public map(warriors: IWarrior[], roundResults: IRoundResult[]): IMatchResult {
        return {
            rounds: roundResults.length,
            results: warriors.map(warrior => this.getWarriorResult(warrior, roundResults))
        }
    }
}
