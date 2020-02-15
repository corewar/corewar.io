import { IParseResult } from "@parser/interface/IParseResult";
import { IOptions } from "@simulator/interface/IOptions";
import { IWarriorInstance } from "@simulator/interface/IWarriorInstance";

export interface ILoader {

    load(warriors: IParseResult[], options: IOptions): IWarriorInstance[];
}