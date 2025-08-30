import { IHillResult } from './IHillResult'
import { IRules } from './IRules'
import IWarrior from '../../simulator/interface/IWarrior'

export interface IBenchmarkRunner {
    run(warrior: IWarrior, rules: IRules, warriors: IWarrior[]): IHillResult
}
