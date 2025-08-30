import { IParseOptions } from './IParseOptions'
import { IContext } from './IContext'

export interface IScanner {
    scan(document: string, options: IParseOptions): IContext
}
