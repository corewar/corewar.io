import { IMatchResult } from "./IMatchResult";
import { IMatch } from "./IMatch";

export interface IMatchResultMapper {

    map(match: IMatch): IMatchResult
}