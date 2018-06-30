import { IOptions } from "./IOptions";
import { IParseResult } from "../../parser/interface/IParseResult";
import { IState } from "./IState";
import { IRoundResult } from "./IRoundResult";

export interface ISimulator {

    initialise(options: IOptions, warriors: IParseResult[]): void;
    run(): IRoundResult;
    step(steps?: number): IRoundResult;
    getState(): IState;
}