import { IOptions } from "../../simulator/interface/IOptions";
import { IParseResult } from "../../parser/interface/IParseResult";

export interface IMatch {

    rounds: number;
    options: IOptions;
    warriors: IParseResult[];
}