import { IMatchResult } from "@matches/interface/IMatchResult";
import { IMatch } from "@matches/interface/IMatch";

export interface IMatchResultMapper {

    map(match: IMatch): IMatchResult
}