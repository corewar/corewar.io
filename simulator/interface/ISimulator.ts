import { IOptions } from "./IOptions";
import { IParseResult } from "../../parser/interface/IParseResult";
import { IState } from "./IState";

export interface ISimulator {

    initialise(options: IOptions, warriors: IParseResult[]): void;
    setMessageProvider?(provider: any): void;
    run(): Promise<IState>;
    step(): boolean;
    getState(): IState;
}