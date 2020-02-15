import HillWarriorResult from '@/schema/HillWarriorResult'
import buildParseResult from './ParseResult'

export const buildHillWarriorResult = (): HillWarriorResult => ({
    won: 1,
    drawn: 1,
    lost: 1,
    matches: [],
    rank: 1,
    score: 1,
    source: buildParseResult()
})

export default buildHillWarriorResult
