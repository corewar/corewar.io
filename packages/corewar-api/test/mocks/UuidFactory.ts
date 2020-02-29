import { IUuidFactory } from '@/services/UuidFactory'
import sinon from 'sinon'

export const buildUidFactoryMock = (sandbox: sinon.SinonSandbox): IUuidFactory =>
    ({
        get: sandbox.stub()
    } as IUuidFactory)

export default buildUidFactoryMock
