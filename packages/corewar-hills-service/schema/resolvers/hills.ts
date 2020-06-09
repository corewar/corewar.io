import Repository from 'corewar-repository'
import { DATABASE_NAME, COLLECTION_NAME } from '../../common/constants'
import { IHill } from '../../common/IHill'

export const hills = async (id?: string): Promise<IHill[]> => {
    const repo = new Repository(DATABASE_NAME, COLLECTION_NAME)

    if (id) {
        return [await repo.getById<IHill>(id)]
    }

    return await repo.getAll<IHill>()
}
