import { IParseResult } from "@parser/interface/IParseResult";
import { IWarriorInstance } from "@simulator/interface/IWarriorInstance";

export interface IWarriorLoader {

    load(address: number, result: IParseResult, id: number): IWarriorInstance;
}