import { IHillResult } from './IHillResult'
import { IMatchResult } from './IMatchResult'
import IWarrior from '../../simulator/interface/IWarrior'

export interface IHillResultMapper {
    map(warriors: IWarrior[], matchResults: IMatchResult[]): IHillResult
}
