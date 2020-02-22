import { IOptions } from '@simulator/interface/IOptions'

export interface IOptionValidator {
    validate(state: IOptions, warriorCount: number): void
}
