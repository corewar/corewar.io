import { IExecutionContext } from '@simulator/interface/IExecutionContext'

export interface IDecoder {
    decode(context: IExecutionContext): IExecutionContext
}
