import { IContext } from './IContext'
import { IParseOptions } from './IParseOptions'

export interface IPass {
    process(context: IContext, options: IParseOptions): IContext
}
