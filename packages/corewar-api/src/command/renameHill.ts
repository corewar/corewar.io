import { MutationResult, Hill } from '@/generated/graphql'
import { Database } from 'mongo-repo'
import { validateHillName } from './validateHillName'
import sanitize from 'mongo-sanitize'

export const renameHill = async (database: Database, id: string, name: string): Promise<MutationResult> => {
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

    const repo = database.repo<Hill>('hills')
    const existing = await repo.get(sanitize(id))
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
    await repo.update(updated)

    return {
        success: true
    }
}
