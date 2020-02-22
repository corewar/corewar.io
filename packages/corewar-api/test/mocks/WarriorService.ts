import { IWarriorService } from '@/services/WarriorService'
import sinon from 'sinon'

export const buildWarriorServiceMock = (): IWarriorService => ({
    deleteWarrior: sinon.stub(),
    getAll: sinon.stub(),
    getById: sinon.stub(),
    saveWarrior: sinon.stub()
})

export default buildWarriorServiceMock
