import sinon from 'sinon'
import { IHillService } from '@/services/HillService'

export const buildHillServiceMock = (sandbox: sinon.SinonSandbox): IHillService => ({
    createHill: sandbox.stub(),
    deleteHill: sandbox.stub(),
    getAll: sandbox.stub(),
    getById: sandbox.stub(),
    challengeHill: sandbox.stub()
})

export default buildHillServiceMock
