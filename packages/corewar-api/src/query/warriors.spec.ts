import { getWarriors } from './warriors'
import { mockRepository } from '@test/mockRepository'
import { Warrior } from '@/generated/graphql'

describe('query', () => {
    describe('warriors', () => {
        describe('getWarriors', () => {
            it('should return warrior with specified id', async () => {
                // Arrange
                const expected = [{ id: '123' } as Warrior]
                const id = '1234567890abcdef'
                const repo = mockRepository<Warrior>()
                repo.findById.mockResolvedValue(expected[0])

                // Act
                const actual = await getWarriors(repo, id)

                // Assert
                expect(actual).toStrictEqual(expected)
                expect(repo.findById).toBeCalledWith(id)
            })

            it('should return empty array if no warrior found with specified id', async () => {
                // Arrange
                const expected = []
                const id = '1234567890abcdef'
                const repo = mockRepository<Warrior>()
                repo.findById.mockResolvedValue(null)

                // Act
                const actual = await getWarriors(repo, id)

                // Assert
                expect(actual).toStrictEqual(expected)
                expect(repo.findById).toBeCalledWith(id)
            })

            it('should return all warriors if no id specified', async () => {
                // Arrange
                const expected = [{ id: '123' } as Warrior, { id: '456' } as Warrior]
                const repo = mockRepository<Warrior>()
                repo.find.mockResolvedValue(expected)

                // Act
                const actual = await getWarriors(repo)

                // Assert
                expect(actual).toStrictEqual(expected)
            })
        })
    })
})
