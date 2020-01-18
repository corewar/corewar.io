import { IParseOptions } from "@parser/interface/IParseOptions";
import { IParseResult } from "@parser/interface/IParseResult";

export interface IParser {
    parse(document: string, options?: IParseOptions): IParseResult;
}