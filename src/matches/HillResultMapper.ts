import { IHillResultMapper } from "@matches/interface/IHillResultMapper";
import { IHillResult } from "@matches/interface/IHillResult";
import { IMatchResult } from "@matches/interface/IMatchResult";
import { IHill } from "@matches/interface/IHill";

export class HillResultMapper implements IHillResultMapper {

    public map(hill: IHill, __: IMatchResult[]): IHillResult {

        return {
            warriors: hill.warriors.map(warrior => ({
                source: warrior.source,
                age: 0,
                won: 1,
                drawn: 1,
                lost: 1,
                matches: []
            }))
        };
    }
}