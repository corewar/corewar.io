import { IParseResult } from "@parser/interface/IParseResult";
import { IOptions } from "@simulator/interface/IOptions";
import { IWarrior } from "@simulator/interface/IWarrior";

export interface ILoader {

    load(warriors: IParseResult[], options: IOptions): IWarrior[];
}