import { IParser } from "./parser/interface/IParser";
import { IParseOptions } from "./parser/interface/IParseOptions";
import { IParseResult } from "./parser/interface/IParseResult";
import { IToken } from "./parser/interface/IToken";

declare namespace corewar {

  export interface Api {

    new();

    parse(document: string, options?: IParseOptions): IParseResult;

    serialise(tokens: IToken[]) : string;

  }

}