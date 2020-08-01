import { Warrior } from '@/generated/graphql'
import { Database } from 'mongo-repo'

export const getWarriors = async (database: Database, id?: string): Promise<Warrior[]> => {
    const warriors = database.repo<Warrior>('warriors')

    if (!!id) {
        return [await warriors.get(id)]
    } else {
        return await warriors.getAll({})
    }
}
