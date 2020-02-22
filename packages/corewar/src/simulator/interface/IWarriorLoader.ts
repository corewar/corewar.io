import { IWarriorInstance } from '@simulator/interface/IWarriorInstance'
import IWarrior from '@simulator/interface/IWarrior'

export interface IWarriorLoader {
    load(address: number, warrior: IWarrior, id: number): IWarriorInstance
}
