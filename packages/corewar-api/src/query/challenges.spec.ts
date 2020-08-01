import { getChallenges } from './challenges'
import { mockRepository } from '../../test/mockRepository'

describe('query', () => {
    describe('challenges', () => {
        describe('getchallenges', () => {
            it('should return challenge with specified id', async () => {
                // Arrange
                const expected = [{ foo: 'bar' }]
                const id = '1234567890abcdef'
                const repo = mockRepository()
                repo.get.mockResolvedValue(expected[0])
                const database = { repo: jest.fn().mockReturnValue(repo) }

                // Act
                const actual = await getChallenges(database, id)

                // Assert
                expect(actual).toStrictEqual(expected)
                expect(database.repo).toBeCalledWith('challenges')
                expect(repo.get).toBeCalledWith(id)
            })

            it('should return all challenges if no id specified', async () => {
                // Arrange
                const expected = [{ foo: 'bar' }, { moo: 'mar' }]
                const repo = mockRepository()
                repo.getAll.mockResolvedValue(expected)
                const database = { repo: jest.fn().mockReturnValue(repo) }

                // Act
                const actual = await getChallenges(database)

                // Assert
                expect(actual).toStrictEqual(expected)
                expect(database.repo).toBeCalledWith('challenges')
            })
        })
    })
})
