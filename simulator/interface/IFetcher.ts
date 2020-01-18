import { IState } from "@simulator/interface/IState";
import { ICore } from "@simulator/interface/ICore";
import { IExecutionContext } from "@simulator/interface/IExecutionContext";

export interface IFetcher {

    getNextExecution(state: IState): any;
    fetch(state: IState, core: ICore): IExecutionContext;
}
