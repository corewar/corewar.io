import { IRules } from 'corewar'
import { IWarrior } from './warrior'

export interface IHill {
    id: string
    rules: IRules
    warriors: IWarrior[]
}
