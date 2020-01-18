import { IParseOptions } from "@parser/interface/IParseOptions";
import { IContext } from "@parser/interface/IContext";

export interface IScanner {

    scan(document: string, options: IParseOptions): IContext;
} 
