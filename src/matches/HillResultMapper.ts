import { IHillResultMapper } from "@matches/interface/IHillResultMapper";
import { IHill } from "@matches/interface/IHill";
import { IHillResult } from "@matches/interface/IHillResult";

export class HillResultMapper implements IHillResultMapper {

    map(hill: IHill): IHillResult {
        throw new Error("Method not implemented.");
    }
}