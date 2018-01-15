import { IState } from "./IState";
import { ICore } from "./ICore";
import { IExecutionContext } from "./IExecutionContext";

export interface IFetcher {

    getNextExecution(state: IState): any;
    fetch(state: IState, core: ICore): IExecutionContext;
}
