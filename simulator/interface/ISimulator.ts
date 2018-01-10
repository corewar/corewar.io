import { IOptions } from "./IOptions";
import { IParseResult } from "../../parser/interface/IParseResult";
import { IState } from "./IState";

export interface ISimulator {

    initialise(options: IOptions, warriors: IParseResult[]): void;
    run(): void;
    step(steps?: number): boolean;
    getState(): IState;
}