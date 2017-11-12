import { IParseResult } from "../../Parser/Interface/IParseResult";
import { IOptions } from "./IOptions";
import { IWarrior } from "./IWarrior";

export interface ILoader {

    load(warriors: IParseResult[], options: IOptions): IWarrior[];
}