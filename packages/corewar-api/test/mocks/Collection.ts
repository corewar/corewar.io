import { Collection } from 'mongodb'
import sinon from 'sinon'

export const buildCollectionMock = (): Collection =>
    (({
        find: sinon.stub().returns({ toArray: sinon.stub().returns([]) }),
        findOne: sinon.stub().returns({}),
        insertOne: sinon.stub(),
        updateOne: sinon.stub(),
        deleteOne: sinon.stub()
    } as unknown) as Collection)

export default buildCollectionMock
