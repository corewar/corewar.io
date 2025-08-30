import IWarrior from '../../simulator/interface/IWarrior'

export interface IMatchWarriorResult {
    warrior: IWarrior
    won: number
    drawn: number
    lost: number
    given: number
    taken: number
}
