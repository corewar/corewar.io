import { IParser } from "./parser/interface/IParser";
import { IParseOptions } from "./parser/interface/IParseOptions";
import { IParseResult } from "./parser/interface/IParseResult";
import { IToken } from "./parser/interface/IToken";
import { IOptions } from "./simulator/interface/IOptions";
import { IState } from "./simulator/interface/IState";

declare namespace corewar {

  export interface Api {

    new();

    initialiseSimulator(opts: IOptions, parseResults: IParseResult[], messageProvider: any) : IState;

    parse(document: string, options?: IParseOptions): IParseResult;

    serialise(tokens: IToken[]) : string;

    run() : void;

  }

}
