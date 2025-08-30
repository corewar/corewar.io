import { IOptions } from './IOptions'
import { IWarriorInstance } from './IWarriorInstance'
import IWarrior from './IWarrior'

export interface ILoader {
    load(warriors: IWarrior[], options: IOptions): IWarriorInstance[]
}
