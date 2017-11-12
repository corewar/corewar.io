import { IParseResult } from "../../parser/interface/IParseResult";
import { IWarrior } from "./IWarrior";

export interface IWarriorLoader {

    load(address: number, result: IParseResult): IWarrior;
}