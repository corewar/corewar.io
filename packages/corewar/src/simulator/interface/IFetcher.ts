import { IState } from './IState'
import { ICore } from './ICore'
import { IExecutionContext } from './IExecutionContext'
import { INextExecutionContext } from './INextExecutionContext'

export interface IFetcher {
    getNextExecution(state: IState): INextExecutionContext
    fetch(state: IState, core: ICore): IExecutionContext
}
