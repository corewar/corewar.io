import Repository, { IRepository } from '@/database/Repository'
import chai, { expect, assert } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { MongoClient, MongoCallback, Db, Collection, MongoError } from 'mongodb'
import buildCollectionMock from '@test/mocks/Collection'
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
        collection = buildCollectionMock()
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

        it('should handle connection error', async () => {
            const expected = new MongoError('Promise failed')

            /* eslint-disable-next-line */
            connect.callsFake((callback: any) => {
                callback(expected)
            })

            try {
                await target.getAll()
                assert.fail('Promise should have failed but succeeded')
            } catch (e) {
                expect(e.message).to.deep.equal(expected.message)
            }
        })

        it('should handle other connect error', async () => {
            const expected = new Error('Promise failed')

            /* eslint-disable-next-line */
            connect.throws(expected)

            try {
                await target.getAll()
                assert.fail('Promise should have failed but succeeded')
            } catch (e) {
                expect(e.message).to.deep.equal(expected.message)
            }
        })

        it('should return the result of collection.find', async () => {
            const expected = [{ foo: 'bar' }]

            const stub = collection.find as sinon.SinonStub
            stub.returns({ toArray: sinon.stub().returns(expected) })

            const actual = await target.getAll()

            expect(actual).to.be.deep.equal(expected)
        })
    })

    describe('getById', () => {
        it('should return the result of collection.findOne', async () => {
            const id = '1234'
            const expected = { id, foo: 'bar' }

            const stub = collection.findOne as sinon.SinonStub
            stub.withArgs({ id }).returns(expected)

            const actual = await target.getById(id)

            expect(actual).to.be.deep.equal(expected)
        })
    })

    describe('getOneBy', () => {
        it('should return result of collection.findOne', async () => {
            const expected = { foo: 'bar' }

            const stub = collection.findOne as sinon.SinonStub
            stub.returns(expected)

            const actual = await target.getOneBy({})

            expect(actual).to.deep.equal(expected)
        })

        it('should filter collection using specified parameter', async () => {
            const expected = { foo: 'bar' }

            const stub = collection.findOne as sinon.SinonStub

            await target.getOneBy(expected)

            expect(stub).to.have.been.calledWith(expected)
        })
    })

    describe('getManyBy', () => {
        it('should return the result of collection.find', async () => {
            const expected = [{ foo: 'bar' }]

            const stub = collection.find as sinon.SinonStub
            stub.returns({ toArray: sinon.stub().returns(expected) })

            const actual = await target.getManyBy({})

            expect(actual).to.be.deep.equal(expected)
        })

        it('should filter collection.find by specified filter parameter', async () => {
            const expected = { foo: 'bar' }

            const stub = collection.find as sinon.SinonStub

            await target.getManyBy(expected)

            expect(stub).to.have.been.calledWith(expected)
        })
    })

    describe('upsert', () => {
        it('should insert data if it does not exist', async () => {
            const expected = { id: '1234', foo: 'bar' }

            const findOne = collection.findOne as sinon.SinonStub
            findOne.withArgs({ id: expected.id }).returns(null)

            const insertOne = collection.insertOne as sinon.SinonStub
            const updateOne = collection.updateOne as sinon.SinonStub

            await target.upsert(expected)

            expect(insertOne).to.have.been.calledWith(expected)
            expect(updateOne).not.to.have.been.called
        })

        it('should update data if it does exist', async () => {
            const expected = { id: '1234', foo: 'bar' }

            const findOne = collection.findOne as sinon.SinonStub
            findOne.withArgs({ id: expected.id }).returns(expected)

            const insertOne = collection.insertOne as sinon.SinonStub
            const updateOne = collection.updateOne as sinon.SinonStub

            await target.upsert(expected)

            expect(updateOne).to.have.been.calledWith({ id: expected.id }, { $set: expected })
            expect(insertOne).not.to.have.been.called
        })

        it('should open an close the connection once only', async () => {
            await target.upsert({ id: '1234' })

            expect(connect).to.have.been.calledOnce
            expect(close).to.have.been.calledOnce
        })
    })

    describe('delete', () => {
        it('should delete specified id from collection', async () => {
            const id = '1234'

            const stub = collection.deleteOne as sinon.SinonStub

            await target.delete(id)

            expect(stub).to.have.been.calledWith({ id })
        })
    })
})
