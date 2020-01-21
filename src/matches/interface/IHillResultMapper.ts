import { IHill } from "@matches/interface/IHill";
import { IHillResult } from "@matches/interface/IHillResult";
import { IMatchResult } from "@matches/interface/IMatchResult";

export interface IHillResultMapper {

    map(hill: IHill, matchResults: IMatchResult[]): IHillResult;
}