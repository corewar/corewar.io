import { IState } from "./IState";

export interface IEndCondition {

    check(state: IState): boolean;
    setMessageProvider(provider: any): void;
}