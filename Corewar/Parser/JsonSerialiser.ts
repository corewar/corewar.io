import { ISerialiser } from "./Interface/ISerialiser";
import { IToken } from "./Interface/IToken";

export class JsonSerialiser implements ISerialiser {

    public serialise(tokens: IToken[]): string {

        return JSON.stringify(tokens);
    }
}
