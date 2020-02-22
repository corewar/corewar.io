import { ISerialiser } from '@parser/interface/ISerialiser'
import { IToken } from '@parser/interface/IToken'

export class JsonSerialiser implements ISerialiser {
    public serialise(tokens: IToken[]): string {
        return JSON.stringify(tokens)
    }
}
