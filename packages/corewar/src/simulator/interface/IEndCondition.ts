import { IState } from './IState'
import { IRoundResult } from './IRoundResult'

export interface IEndCondition {
    check(state: IState): IRoundResult
}
