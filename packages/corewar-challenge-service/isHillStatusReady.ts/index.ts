import Repository from 'corewar-repository'
import { DATABASE_NAME, COLLECTION_NAME } from '../common/constants'
import IHill, { ChallengeStatusType } from '../common/IHill'

export const isHillStatusReady = async (id: string): Promise<boolean> => {
    const repo = new Repository(DATABASE_NAME, COLLECTION_NAME)
    const hill = await repo.getById<IHill>(id)

    if (!hill) {
        // TODO report this? The hill isn't yet in our db?
        return false
    }

    return hill.status === ChallengeStatusType.Ready
}
