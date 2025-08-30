import MetaData from '@/schema/MetaData'
import ParseResult from '@/schema/ParseResult'

export const buildParseResult = (): ParseResult => {
    const parseResult = new ParseResult()
    parseResult.messages = []
    
    const metaData = new MetaData()
    metaData.author = ''
    metaData.name = ''
    metaData.strategy = ''
    parseResult.metaData = metaData
    
    parseResult.success = true
    parseResult.tokens = []
    return parseResult
}

export default buildParseResult
