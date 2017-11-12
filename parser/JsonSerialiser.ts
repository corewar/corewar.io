import { ISerialiser } from "./interface/ISerialiser";
import { IToken } from "./interface/IToken";

export class JsonSerialiser implements ISerialiser {

    public serialise(tokens: IToken[]): string {

        return JSON.stringify(tokens);
    }
}
