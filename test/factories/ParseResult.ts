import { IParseResult } from 'corewar'

export const getParseResult = (): IParseResult => ({
    messages: [],
    metaData: {
        author: '',
        name: '',
        strategy: ''
    },
    success: true,
    tokens: []
})

export default getParseResult
