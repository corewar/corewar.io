import { IState } from "./IState";
import { ICore } from "./ICore";
import { IExecutionContext } from "./IExecutionContext";

export interface IFetcher {

    fetch(state: IState, core: ICore): IExecutionContext;
}
 