import { IMatchResult } from '@matches/interface/IMatchResult'
import { IRoundResult } from '@simulator/interface/IRoundResult'
import IWarrior from '@simulator/interface/IWarrior'

export interface IMatchResultMapper {
    map(warriors: IWarrior[], roundResults: IRoundResult[]): IMatchResult
}
