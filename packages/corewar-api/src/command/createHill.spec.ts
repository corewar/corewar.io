jest.mock('uuid')

import { createHill } from './createHill'
import { createRulesInput } from '@test/createRulesInput'
import { mockRepository } from '@test/mockRepository'
import uuidv4 = require('uuid')
import { Hill } from '@/generated/graphql'

describe('command', () => {
    describe('hill', () => {
        describe('createHill', () => {
            let uuid: jest.Mock

            beforeEach(() => {
                uuid = (uuidv4 as unknown) as jest.Mock
                uuid.mockReturnValue('123')
            })

            afterEach(() => {
                jest.restoreAllMocks()
            })

            it('returns an error if no name is provided', async () => {
                // Act
                const actual = await createHill(null, null, createRulesInput())

                // Assert
                expect(actual).toStrictEqual({
                    success: false,
                    message: 'Please specify a name for this hill'
                })
            })

            it('returns an error if empty name is provided', async () => {
                // Act
                const actual = await createHill(null, '', createRulesInput())

                // Assert
                expect(actual).toStrictEqual({
                    success: false,
                    message: 'Please specify a name for this hill'
                })
            })

            it('returns an error if whitespace name is provided', async () => {
                // Act
                const actual = await createHill(null, '  \t \n', createRulesInput())

                // Assert
                expect(actual).toStrictEqual({
                    success: false,
                    message: 'Please specify a name for this hill'
                })
            })

            it('adds a new hill to the database and returns the id', async () => {
                // Arrange
                const expected = {
                    id: '87654321-4321-4321-4321-109876543210',
                    name: 'My amazing new hill',
                    rules: createRulesInput(),
                    results: [],
                    warriors: []
                }
                const repo = mockRepository<Hill>()
                uuid.mockReturnValue(expected.id)

                // Act
                const actual = await createHill(repo, `\n \t  ${expected.name}  \t \n`, expected.rules)

                // Assert
                expect(repo.create).toHaveBeenCalledWith(expected)
                expect(actual).toStrictEqual({
                    id: expected.id,
                    success: true
                })
            })
        })
    })
})
