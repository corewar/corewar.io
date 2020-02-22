import { IMatchResult } from '@matches/interface/IMatchResult'
import IWarrior from '@simulator/interface/IWarrior'

export interface IHillWarriorResult {
    warrior: IWarrior
    rank: number
    score: number
    won: number
    drawn: number
    lost: number
    matches: IMatchResult[]
}
