import { IHillResultMapper } from "@matches/interface/IHillResultMapper";
import { IHill } from "@matches/interface/IHill";
import { IHillResult } from "@matches/interface/IHillResult";
import { IMatchResult } from "@matches/interface/IMatchResult";

export class HillResultMapper implements IHillResultMapper {

    map(hill: IHill, matchResults: IMatchResult[]): IHillResult {
        throw new Error("Method not implemented.");
    }
}