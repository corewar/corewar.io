import { IHillResult } from "@matches/interface/IHillResult";
import { IMatchResult } from "@matches/interface/IMatchResult";
import { IHill } from "@matches/interface/IHill";

export interface IHillResultMapper {

    map(hill: IHill, matchResults: IMatchResult[]): IHillResult;
}