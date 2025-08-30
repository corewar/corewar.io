import { IOptions } from './IOptions'

export interface IOptionValidator {
    validate(state: IOptions, warriorCount: number): void
}
