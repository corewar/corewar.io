import { IParseResult } from "../../Parser/Interface/IParseResult";
import { IWarrior } from "./IWarrior";

export interface IWarriorLoader {

    load(address: number, result: IParseResult): IWarrior;
} 