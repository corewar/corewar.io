import { expect } from 'chai'
import { IRepository } from '@/database/Repository'
import getRepository from '@test/factories/Repository'
import HillService, { IHillService } from '@/services/HillService'
import sinon from 'sinon'

describe('HillService', () => {
    describe('getById', () => {
        let target: IHillService

        let repo: IRepository

        beforeEach(() => {
            repo = getRepository()
            target = new HillService(repo)
        })

        it('should return result from repository', async () => {
            const id = '7'
            const expected = {}
            ;(repo.getById as sinon.SinonStub).withArgs(id).returns(Promise.resolve(expected))

            const actual = await target.getById(id)

            expect(actual).to.deep.equal(expected)
        })
    })
})
