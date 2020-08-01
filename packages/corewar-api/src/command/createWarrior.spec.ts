jest.mock('corewar')
jest.mock('uuid')

import { createWarrior } from './createWarrior'
import { corewar, IParseResult } from 'corewar'
import { mockRepository } from '@test/mockRepository'
import uuidv4 = require('uuid')
import { Warrior } from '@/generated/graphql'

describe('command', () => {
    describe('warrior', () => {
        describe('createWarrior', () => {
            let parse: jest.Mock
            let uuid: jest.Mock

            beforeEach(() => {
                parse = corewar.parse as jest.Mock
                parse.mockReturnValue({
                    success: true,
                    messages: [],
                    tokens: [],
                    metaData: {
                        name: 'name',
                        author: 'author'
                    }
                } as IParseResult)
                uuid = (uuidv4 as unknown) as jest.Mock
                uuid.mockReturnValue('123')
            })

            afterEach(() => {
                jest.restoreAllMocks()
            })

            it('returns failure if specified redcode fails to be parsed by corewar library', async () => {
                // Arrange
                const redcode = 'blah'
                parse.mockReturnValue({
                    metaData: {},
                    tokens: [],
                    success: false,
                    messages: [
                        {
                            position: { line: 2, char: 3 },
                            type: 'ERROR',
                            text: 'Me no likey this redcode'
                        },
                        {
                            position: { line: 4, char: 5 },
                            type: 'ERROR',
                            text: 'Seriously, what?'
                        }
                    ]
                } as IParseResult)

                // Act
                const actual = await createWarrior(null, redcode)

                // Assert
                expect(parse).toHaveBeenCalledWith(redcode)
                expect(actual).toStrictEqual({
                    success: false,
                    message: '[2, 3] ERROR: Me no likey this redcode\n[4, 5] ERROR: Seriously, what?'
                })
            })

            it('inserts new warrior and returns success and id if parse succeeds', async () => {
                // Arrange
                const expected = {
                    id: '88888888-4444-4444-4444-121212121212',
                    name: 'My warrior!',
                    author: 'Some author',
                    redcode: '....mov etc.'
                }
                uuid.mockReturnValue(expected.id)

                const repo = mockRepository<Warrior>()

                parse.mockReturnValue({
                    metaData: {
                        name: expected.name,
                        author: expected.author
                    },
                    tokens: [],
                    success: true,
                    messages: []
                } as IParseResult)

                // Act
                const actual = await createWarrior(repo, expected.redcode)

                // Assert
                expect(repo.create).toBeCalledWith(expected)
                expect(actual).toStrictEqual({
                    id: expected.id,
                    success: true
                })
            })

            it('populates strategy on newly created warrior if present in metadata', async () => {
                // Arrange
                const expected = 'Extinguish all life'
                const repo = mockRepository<Warrior>()

                parse.mockReturnValue({
                    metaData: {
                        name: 'name',
                        author: 'author',
                        strategy: expected
                    },
                    tokens: [],
                    success: true,
                    messages: []
                } as IParseResult)

                // Act
                await createWarrior(repo, 'dsdsfdfs')

                // Assert
                expect(repo.create).toBeCalledWith(expect.objectContaining({ strategy: expected }))
            })

            it('returns failure if specified redcode does not contain a warrior name', async () => {
                // Arrange
                const redcode = 'blah'
                parse.mockReturnValue({
                    metaData: {
                        author: 'john smith'
                    },
                    tokens: [],
                    success: true,
                    messages: []
                } as IParseResult)

                // Act
                const actual = await createWarrior(null, redcode)

                // Assert
                expect(parse).toHaveBeenCalledWith(redcode)
                expect(actual).toStrictEqual({
                    success: false,
                    message:
                        'You must specify a name for the warrior by including a name comment e.g. ;name my Amazing warrior!'
                })
            })

            it('returns failure if specified redcode does not contain an author name', async () => {
                // Arrange
                const redcode = 'blah'
                parse.mockReturnValue({
                    metaData: {
                        name: 'warriorioso'
                    },
                    tokens: [],
                    success: true,
                    messages: []
                } as IParseResult)

                // Act
                const actual = await createWarrior(null, redcode)

                // Assert
                expect(parse).toHaveBeenCalledWith(redcode)
                expect(actual).toStrictEqual({
                    success: false,
                    message:
                        'You must specify an author of the warrior by including an author comment e.g. ;author John Smith'
                })
            })
        })
    })
})
