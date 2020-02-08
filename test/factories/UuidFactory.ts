import { IUuidFactory } from '@/services/UuidFactory'
import sinon from 'sinon'

export const getUuidFactory = (): IUuidFactory =>
    ({
        get: sinon.stub()
    } as IUuidFactory)

export default getUuidFactory
