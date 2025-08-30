import { IInstruction } from './IInstruction'
import { ICoreAccessEventArgs } from './ICore'

export interface ICoreLocation {
    instruction: IInstruction
    access: ICoreAccessEventArgs
}
