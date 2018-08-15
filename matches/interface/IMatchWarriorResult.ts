import { IParseResult } from "../../parser/interface/IParseResult";

export interface IMatchWarriorResult {

    source: IParseResult;
    won: number;
    drawn: number;
    lost: number;
    given: number;
    taken: number;
}