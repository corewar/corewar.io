import { IWarriorService } from '@/services/WarriorService'
import sinon from 'sinon'

export const buildWarriorServiceMock = (sandbox: sinon.SinonSandbox): IWarriorService => ({
    deleteWarrior: sandbox.stub(),
    getAll: sandbox.stub(),
    getById: sandbox.stub(),
    saveWarrior: sandbox.stub()
})

export default buildWarriorServiceMock
