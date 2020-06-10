import { AzureFunction, Context } from '@azure/functions'
import Repository from 'corewar-repository'
import { COLLECTION_NAME, DATABASE_NAME, CHALLENGE_QUEUE } from '../common/constants'
import { enqueue } from '../serviceBus/enqueue'
import IHill, { ChallengeStatusType } from '../common/IHill'
import { triggerStartChallenge } from '../common/triggerStartChallenge'
import { IChallengeHillMessage } from 'corewar-message-types'

const challengeReception: AzureFunction = async function(_: Context, message: IChallengeHillMessage): Promise<void> {
    const { id, redcode } = message.body

    const repo = new Repository(DATABASE_NAME, COLLECTION_NAME)
    const hill = await repo.getById<IHill>(id)

    if (!hill) {
        // TODO report this? The hill isn't yet in our db?
        return
    }

    if (hill.status === ChallengeStatusType.Busy) {
        enqueue(CHALLENGE_QUEUE, message)
        return
    }

    triggerStartChallenge(repo, hill, redcode)
}

export default challengeReception
