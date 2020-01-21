import { IHill } from "@matches/interface/IHill";
import { IHillResult } from "@matches/interface/IHillResult";

export interface IHillResultMapper {

    map(hill: IHill): IHillResult;
}