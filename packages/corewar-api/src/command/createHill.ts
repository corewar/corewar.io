import { CreateMutationResult, RulesInput, Hill } from '@/generated/graphql'
import { Database } from 'mongo-repo'
import uuid = require('uuid')
import { validateHillName } from './validateHillName'

export const createHill = async (database: Database, name: string, rules: RulesInput): Promise<CreateMutationResult> => {
    if(!validateHillName(name)) {
        return {
            success: false,
            message: 'Please specify a name for this hill'
        }
    }

    const repo = database.repo<Hill>('hills')
    const id = uuid()
    repo.add({
        id,
        name: name.trim(),
        rules,
        results: [],
        warriors: []
    })

    return {
        success: true,
        id
    }
}
