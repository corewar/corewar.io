import { renameHill } from './renameHill'
import { mockRepository } from '@test/mockRepository'
import { createRulesInput } from '@test/createRulesInput'
import { Hill, Warrior, Result } from '@/generated/graphql'

describe('command', () => {
    describe('hill', () => {
        describe('renameHill', () => {
            it('returns an error if no name is provided', async () => {
                // Act
                const actual = await renameHill(null, '1234', null)

                // Assert
                expect(actual).toStrictEqual({
                    success: false,
                    message: 'Please specify a new name for the hill'
                })
            })

            it('returns an error if empty name is provided', async () => {
                // Act
                const actual = await renameHill(null, '1234', '')

                // Assert
                expect(actual).toStrictEqual({
                    success: false,
                    message: 'Please specify a new name for the hill'
                })
            })

            it('returns an error if whitespace name is provided', async () => {
                // Act
                const actual = await renameHill(null, '1234', '\t \n  \t \n')

                // Assert
                expect(actual).toStrictEqual({
                    success: false,
                    message: 'Please specify a new name for the hill'
                })
            })

            it('returns an error if no id is provided', async () => {
                // Act
                const actual = await renameHill(null, null, 'name')

                // Assert
                expect(actual).toStrictEqual({
                    success: false,
                    message: 'Please specify an id for the hill'
                })
            })

            it('returns an error if empty id is provided', async () => {
                // Act
                const actual = await renameHill(null, '', 'name')

                // Assert
                expect(actual).toStrictEqual({
                    success: false,
                    message: 'Please specify an id for the hill'
                })
            })

            it('returns an error if no hill exists with specified id', async () => {
                // Arrange
                const expected = '88888888-4444-4444-4444-121212121212'
                const repo = mockRepository<Hill>()
                repo.findById.mockResolvedValue(null)

                // Act
                const actual = await renameHill(repo, expected, 'name')

                // Assert
                expect(actual).toStrictEqual({
                    success: false,
                    message: 'No hill exists with specified id'
                })
                expect(repo.findById).toHaveBeenCalledWith(expected)
            })

            it('updates hill with existing values but new name', async () => {
                // Arrange
                const existing = {
                    id: '87654321-4321-4321-4321-109876543210',
                    name: 'My amazing new hill',
                    rules: createRulesInput(),
                    results: [{ age: 1 } as Result],
                    warriors: [{ id: '132' } as Warrior]
                }
                const expected = {
                    ...existing,
                    name: 'New name'
                }
                const repo = mockRepository<Hill>()
                repo.findById.mockResolvedValue(existing)

                // Act
                const actual = await renameHill(repo, expected.id, `\n \t  ${expected.name}  \t \n`)

                // Assert
                expect(repo.save).toHaveBeenCalledWith(expected)
                expect(actual).toStrictEqual({
                    success: true
                })
            })
        })
    })
})
