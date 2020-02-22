import { IOptions } from '@simulator/interface/IOptions'
import { IState } from '@simulator/interface/IState'
import { IRoundResult } from '@simulator/interface/IRoundResult'
import IWarrior from '@simulator/interface/IWarrior'

export interface ISimulator {
    initialise(options: IOptions, warriors: IWarrior[]): void
    run(): IRoundResult
    step(steps?: number): IRoundResult
    getState(): IState
}
