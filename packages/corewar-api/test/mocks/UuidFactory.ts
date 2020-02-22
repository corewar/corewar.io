import { IUuidFactory } from '@/services/UuidFactory'
import sinon from 'sinon'

export const buildUidFactoryMock = (): IUuidFactory =>
    ({
        get: sinon.stub()
    } as IUuidFactory)

export default buildUidFactoryMock
