import { IOptions } from './IOptions'
import { IState } from './IState'
import { IRoundResult } from './IRoundResult'
import IWarrior from './IWarrior'

export interface ISimulator {
    initialise(options: IOptions, warriors: IWarrior[]): void
    run(): IRoundResult
    step(steps?: number): IRoundResult
    getState(): IState
}
