import { CreateMutationResult, RulesInput, Hill } from '@/generated/graphql'
import uuid = require('uuid')
import { validateHillName } from './validateHillName'
import { MongoRepository } from 'mongtype'

export const createHill = async (
    hills: MongoRepository<Hill>,
    name: string,
    rules: RulesInput
): Promise<CreateMutationResult> => {
    if (!validateHillName(name)) {
        return {
            success: false,
            message: 'Please specify a name for this hill'
        }
    }

    const id = uuid()
    hills.create({
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
