import { IOptions } from "./IOptions";
import { IParseResult } from "../../parser/interface/IParseResult";

export interface ISimulator {

    initialise(options: IOptions, warriors: IParseResult[]): void;
    run(): void;
    step(): boolean;
}