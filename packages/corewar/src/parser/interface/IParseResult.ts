﻿import { IMetaData } from './IMetaData'
import { IMessage } from './IMessage'
import { IToken } from './IToken'

export interface IParseResult {
    metaData: IMetaData
    tokens: IToken[]
    messages: IMessage[]
    success: boolean
    /* eslint-disable-next-line */
    data?: any;
}
