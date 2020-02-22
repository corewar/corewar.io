import { IWarriorInstance } from '@simulator/interface/IWarriorInstance'

export interface ITask {
    instance: IWarriorInstance
    instructionPointer: number
}
