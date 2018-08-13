import { IMatch } from "./IMatch";

export interface IMatchRunner {

    run(match: IMatch): IMatch;
}