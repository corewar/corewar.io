import { IToken } from "@parser/interface/IToken";
import { IParseInstruction } from "@parser/interface/IParseInstruction";
import { IParseResult } from "@parser/interface/IParseResult";

export interface IContext extends IParseResult {

        equs: { [label: string]: IToken[] };
        labels: { [label: string]: number };

        emitSingle(token: IToken): void;
        emit(tokens: IToken[]): void;
        emitInstruction(instruction: IParseInstruction): void;
}