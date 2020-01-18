import { IParseResult } from "@parser/interface/IParseResult";

export interface IMatchWarrior {

    warriorMatchId?: number;
    source: IParseResult;
    wins?: number;
}