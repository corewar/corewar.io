import { getChallenges } from './challenges'
import { mockRepository } from '@test/mockRepository'
import { Challenge } from '@/generated/graphql'

describe('query', () => {
    describe('challenges', () => {
        describe('getChallenges', () => {
            it('should return challenge with specified id', async () => {
                // Arrange
                const expected = [{ id: '123' } as Challenge]
                const id = '1234567890abcdef'
                const repo = mockRepository<Challenge>()
                repo.findById.mockResolvedValue(expected[0])

                // Act
                const actual = await getChallenges(repo, id)

                // Assert
                expect(actual).toStrictEqual(expected)
                expect(repo.findById).toBeCalledWith(id)
            })

            it('should return all challenges if no id specified', async () => {
                // Arrange
                const expected = [{ id: '123' } as Challenge, { id: '456' } as Challenge]
                const repo = mockRepository<Challenge>()
                repo.find.mockResolvedValue(expected)

                // Act
                const actual = await getChallenges(repo)

                // Assert
                expect(actual).toStrictEqual(expected)
            })
        })
    })
})
