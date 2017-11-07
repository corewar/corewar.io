import { IToken } from "./IToken";

export interface ISerialiser {

    serialise(tokens: IToken[]): string;
}
