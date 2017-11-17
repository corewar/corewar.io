import { IParseOptions } from "./IParseOptions";
import { IParseResult } from "./IParseResult";

export interface IParser {
    parse(document: string, options?: IParseOptions): IParseResult;
}