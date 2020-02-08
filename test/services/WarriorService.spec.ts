import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import getRepository from '@test/factories/Repository'
import getUuidFactory from '@test/factories/UuidFactory'
import { IRepository } from '@/database/Repository'
import { IUuidFactory } from '@/services/UuidFactory'
import WarriorService, { IWarriorService } from '@/services/WarriorService'
import Warrior from '@/schema/Warrior'
chai.use(sinonChai)

describe('WarriorService', () => {
    let target: IWarriorService

    let repo: IRepository
    let uuid: IUuidFactory

    beforeEach(() => {
        repo = getRepository()
        uuid = getUuidFactory()
        target = new WarriorService(repo, uuid)
    })

    describe('getById', () => {
        it('should return requested result from repository', async () => {
            const id = '7'
            const expected = {}
            const stub = repo.getById as sinon.SinonStub
            stub.withArgs(id).returns(Promise.resolve(expected))

            const actual = await target.getById(id)

            expect(actual).to.deep.equal(expected)
        })
    })

    describe('getAll', () => {
        it('should return all results from repository', async () => {
            const expected: Warrior[] = []
            const stub = repo.getAll as sinon.SinonStub
            stub.returns(expected)

            const actual = await target.getAll()

            expect(actual).to.deep.equal(expected)
        })
    })
})