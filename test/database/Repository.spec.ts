import Repository, { IRepository } from '@/database/Repository'
import chai, { expect, assert } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { MongoClient, MongoCallback, Db, Collection, MongoError } from 'mongodb'
import getCollection from '@test/factories/Collection'
chai.use(sinonChai)

describe('Repository', () => {
    const COLLECTION_NAME = 'COLLECTION_NAME'

    let target: IRepository

    let connect: sinon.SinonStub<[MongoCallback<MongoClient>], void>
    let close: sinon.SinonStub<[boolean, MongoCallback<void>], void>
    /* eslint-disable-next-line */
    let collection: Collection<any>

    beforeEach(() => {
        const db = sinon.createStubInstance(Db)
        collection = getCollection()
        /* eslint-disable-next-line */
        connect = sinon.stub(MongoClient.prototype, 'connect').callsFake((callback: any) => {
                callback()
            })
        close = sinon.stub(MongoClient.prototype, 'close')
        sinon.stub(MongoClient.prototype, 'db').returns((db as unknown) as Db)
        db.collection.returns(collection)

        target = new Repository(COLLECTION_NAME)
    })

    afterEach(() => {
        sinon.restore()
    })

    describe('getAll', () => {
        it('should open an close the connection', async () => {
            /* eslint-disable-next-line */
            await target.getAll()

            expect(connect).to.have.been.calledOnce
            expect(close).to.have.been.calledOnce
        })

        it('should handle connection error', () => {
            const expected = new MongoError('Promise failed')

            /* eslint-disable-next-line */
            connect.callsFake((callback: any) => {
                callback(expected)
            })

            target
                .getAll()
                .then(() =>
                    assert.fail('Promise should have failed but succeeded')
                )
                /* eslint-disable-next-line */
                .catch((e: any) => expect(e.message).to.deep.equal(expected.message))
        })

        it('should return the result of collection.find', async () => {
            const expected = [{ foo: 'bar' }]

            const stub = collection.find as sinon.SinonStub
            stub.returns({ toArray: sinon.stub().returns(expected) })

            const actual = await target.getAll()

            expect(actual).to.be.deep.equal(expected)
        })
    })
})
