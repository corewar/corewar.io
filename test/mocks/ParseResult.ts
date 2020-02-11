import { IParseResult } from 'corewar'

export const buildParseResult = (): IParseResult => ({
    messages: [],
    metaData: {
        author: '',
        name: '',
        strategy: ''
    },
    success: true,
    tokens: []
})

export default buildParseResult
