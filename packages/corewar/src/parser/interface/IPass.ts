import { IContext } from "@parser/interface/IContext";
import { IParseOptions } from "@parser/interface/IParseOptions";

export interface IPass {

    process(context: IContext, options: IParseOptions): IContext;
}
