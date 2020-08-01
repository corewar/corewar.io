import { getHills } from './hills'
import { mockRepository } from '@test/mockRepository'
import { Hill } from '@/generated/graphql'

describe('query', () => {
    describe('hills', () => {
        describe('getHills', () => {
            it('should return hill with specified id', async () => {
                // Arrange
                const expected = [{ id: '123' } as Hill]
                const id = '1234567890abcdef'
                const repo = mockRepository<Hill>()
                repo.findById.mockResolvedValue(expected[0])

                // Act
                const actual = await getHills(repo, id)

                // Assert
                expect(actual).toStrictEqual(expected)
                expect(repo.findById).toBeCalledWith(id)
            })

            it('should return all hills if no id specified', async () => {
                // Arrange
                const expected = [{ id: '123' } as Hill, { id: '456' } as Hill]
                const repo = mockRepository<Hill>()
                repo.find.mockResolvedValue(expected)

                // Act
                const actual = await getHills(repo)

                // Assert
                expect(actual).toStrictEqual(expected)
            })
        })
    })
})
