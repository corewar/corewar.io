import { IState } from '@simulator/interface/IState'
import { IRoundResult } from '@simulator/interface/IRoundResult'

export interface IEndCondition {
    check(state: IState): IRoundResult
}
