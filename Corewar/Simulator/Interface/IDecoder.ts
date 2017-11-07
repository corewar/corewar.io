import { IExecutionContext } from "./IExecutionContext";

export interface IDecoder {

    decode(context: IExecutionContext): IExecutionContext;
}