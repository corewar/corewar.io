import { IParseResult } from '@parser/interface/IParseResult'

export default interface IWarrior {
    source: IParseResult
    internalId?: number
    /* eslint-disable-next-line */
    data?: any;
}
