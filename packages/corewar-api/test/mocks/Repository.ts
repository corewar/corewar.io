import { IRepository } from '@/database/Repository'
import sinon from 'sinon'

const buildRepositoryMock = (sandbox: sinon.SinonSandbox): IRepository =>
    ({
        getAll: sandbox.stub(),
        getById: sandbox.stub(),
        getOneBy: sandbox.stub(),
        getManyBy: sandbox.stub(),
        upsert: sandbox.stub(),
        delete: sandbox.stub()
    } as IRepository)

export default buildRepositoryMock
