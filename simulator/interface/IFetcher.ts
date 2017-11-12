import { IState } from "./IState";
import { IExecutionContext } from "./IExecutionContext";

export interface IFetcher {

    fetch(state: IState): IExecutionContext;
}
 