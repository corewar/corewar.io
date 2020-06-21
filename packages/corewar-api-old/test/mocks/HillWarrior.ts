import HillWarrior from '@/schema/HillWarrior'
import buildHillWarriorResult from './HillWarriorResult'

export const buildHillWarrior = (warriorId?: string): HillWarrior => ({
    age: 1,
    rank: 1,
    result: buildHillWarriorResult(),
    warriorId: warriorId || '1'
})

export default buildHillWarrior
