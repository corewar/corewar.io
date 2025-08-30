import { IToken } from './IToken'
import { IParseInstruction } from './IParseInstruction'
import { IParseResult } from './IParseResult'

export interface IContext extends IParseResult {
    equs: { [label: string]: IToken[] }
    labels: { [label: string]: number }

    emitSingle(token: IToken): void
    emit(tokens: IToken[]): void
    emitInstruction(instruction: IParseInstruction): void
}
