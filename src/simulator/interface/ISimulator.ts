import { IOptions } from "@simulator/interface/IOptions";
import { IParseResult } from "@parser/interface/IParseResult";
import { IState } from "@simulator/interface/IState";
import { IRoundResult } from "@simulator/interface/IRoundResult";

export interface ISimulator {

    initialise(options: IOptions, warriors: IParseResult[]): void;
    run(): IRoundResult;
    step(steps?: number): IRoundResult;
    getState(): IState;
}