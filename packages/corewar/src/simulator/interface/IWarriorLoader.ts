import { IWarriorInstance } from './IWarriorInstance'
import IWarrior from './IWarrior'

export interface IWarriorLoader {
    load(address: number, warrior: IWarrior, id: number): IWarriorInstance
}
