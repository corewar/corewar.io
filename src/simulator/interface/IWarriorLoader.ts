import { IParseResult } from "@parser/interface/IParseResult";
import { IWarrior } from "@simulator/interface/IWarrior";

export interface IWarriorLoader {

    load(address: number, result: IParseResult, id: number): IWarrior;
}