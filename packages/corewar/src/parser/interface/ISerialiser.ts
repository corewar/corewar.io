import { IToken } from '@parser/interface/IToken'

export interface ISerialiser {
    serialise(tokens: IToken[]): string
}
