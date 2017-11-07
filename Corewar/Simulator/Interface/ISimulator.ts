import { IOptions } from "./IOptions";
import { IParseResult } from "../../Parser/Interface/IParseResult";

export interface ISimulator {

    initialise(options: IOptions, warriors: IParseResult[]): void;
    run(): void;
    step(): boolean;
} 