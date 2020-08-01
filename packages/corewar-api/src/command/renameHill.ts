import { MutationResult, Hill } from '@/generated/graphql'
import { validateHillName } from './validateHillName'
import sanitize from 'mongo-sanitize'
import { MongoRepository } from 'mongtype'

export const renameHill = async (hills: MongoRepository<Hill>, id: string, name: string): Promise<MutationResult> => {
    if (!validateHillName(name)) {
        return {
            success: false,
            message: 'Please specify a new name for the hill'
        }
    }

    if (!id) {
        return {
            success: false,
            message: 'Please specify an id for the hill'
        }
    }

    const existing = await hills.findById(sanitize(id))
    if (!existing) {
        return {
            success: false,
            message: 'No hill exists with specified id'
        }
    }

    const updated = {
        ...existing,
        name: name.trim()
    }
    await hills.save(updated)

    return {
        success: true
    }
}
