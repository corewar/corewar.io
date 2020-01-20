import { IState } from "@simulator/interface/IState";
import { ICore } from "@simulator/interface/ICore";
import { IExecutionContext } from "@simulator/interface/IExecutionContext";
import { INextExecutionContext } from "@simulator/interface/INextExecutionContext";

export interface IFetcher {

    getNextExecution(state: IState): INextExecutionContext;
    fetch(state: IState, core: ICore): IExecutionContext;
}
