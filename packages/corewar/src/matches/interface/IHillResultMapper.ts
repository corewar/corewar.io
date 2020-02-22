import { IHillResult } from '@matches/interface/IHillResult'
import { IMatchResult } from '@matches/interface/IMatchResult'
import IWarrior from '@simulator/interface/IWarrior'

export interface IHillResultMapper {
    map(warriors: IWarrior[], matchResults: IMatchResult[]): IHillResult
}
