import sinon from 'sinon'
import { IHillService } from '@/services/HillService'

export const buildHillServiceMock = (): IHillService => ({
    createHill: sinon.stub(),
    deleteHill: sinon.stub(),
    getAll: sinon.stub(),
    getById: sinon.stub(),
    challengeHill: sinon.stub()
})

export default buildHillServiceMock
