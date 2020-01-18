import { IExecutionContext } from "@simulator/interface/IExecutionContext";
import { IOptions } from "@simulator/interface/IOptions";

export interface IExecutive {

    initialise(options: IOptions): void;
    commandTable: ((context: IExecutionContext) => void)[];
}
