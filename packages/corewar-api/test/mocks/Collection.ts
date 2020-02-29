import { Collection } from 'mongodb'
import sinon from 'sinon'

export const buildCollectionMock = (sandbox: sinon.SinonSandbox): Collection =>
    (({
        find: sandbox.stub().returns({ toArray: sandbox.stub().returns([]) }),
        findOne: sandbox.stub().returns({}),
        insertOne: sandbox.stub(),
        updateOne: sandbox.stub(),
        deleteOne: sandbox.stub()
    } as unknown) as Collection)

export default buildCollectionMock
