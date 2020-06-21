import HillWarriorResult from '@/schema/HillWarriorResult'
import buildWarrior from './Warrior'

export const buildHillWarriorResult = (): HillWarriorResult => ({
    won: 1,
    drawn: 1,
    lost: 1,
    matches: [],
    rank: 1,
    score: 1,
    warrior: buildWarrior()
})

export default buildHillWarriorResult
