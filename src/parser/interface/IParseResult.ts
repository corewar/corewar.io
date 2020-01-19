import { IMetaData } from "@parser/interface/IMetaData";
import { IMessage } from "@parser/interface/IMessage";
import { IToken } from "@parser/interface/IToken";

export interface IParseResult {

    metaData: IMetaData;
    tokens: IToken[];
    messages: IMessage[];
    /* eslint-disable-next-line */
    data?: any;
} 