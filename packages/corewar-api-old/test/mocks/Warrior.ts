import Warrior from '@/schema/Warrior'
import buildParseResult from './ParseResult'

export const buildWarrior = (id?: string): Warrior => ({
    id: id || '1',
    source: buildParseResult(),
    redcode: 'mov 0, 1'
})

export default buildWarrior
