import Hill from '@/schema/Hill'
import buildRules from './HillRules'

export const buildHill = (id?: string): Hill => ({
    id: id || '1',
    rules: buildRules(),
    warriors: []
})

export default buildHill
