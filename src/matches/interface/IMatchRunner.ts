import { IMatch } from "@matches/interface/IMatch";
import { IMatchResult } from "@matches/interface/IMatchResult";

export interface IMatchRunner {

    run(match: IMatch): IMatchResult;
}