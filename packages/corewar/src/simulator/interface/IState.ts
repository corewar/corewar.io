import { IOptions } from './IOptions'
import { IWarriorInstance } from './IWarriorInstance'

export interface IState {
    options: IOptions
    cycle: number
    warriorIndex: number
    instances: IWarriorInstance[]
}
