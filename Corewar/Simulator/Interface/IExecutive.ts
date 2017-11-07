import { IExecutionContext } from "./IExecutionContext";
import { IOptions } from "./IOptions";

export interface IExecutive {

    initialise(options: IOptions): void;
    commandTable: ((context: IExecutionContext) => void)[];
}
