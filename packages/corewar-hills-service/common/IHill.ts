import { IRules } from './IRules'

export interface IHill {
    id: string
    rules: IRules
    warriors: {
        id: string
        redcode: string
    }[]
}
