import { IMatch } from "./IMatch";
import { IMatchResult } from "./IMatchResult";

export interface IMatchRunner {

    run(match: IMatch): IMatchResult;
}