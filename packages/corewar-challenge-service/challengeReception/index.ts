import { AzureFunction, Context } from '@azure/functions'
import { CHALLENGE_QUEUE } from '../common/constants'
import { enqueue } from '../serviceBus/enqueue'
import { triggerStartChallenge } from '../common/triggerStartChallenge'
import { IChallengeHillMessage } from 'corewar-message-types'
import { isHillStatusReady } from '../isHillStatusReady.ts'

const challengeReception: AzureFunction = async function(_: Context, message: IChallengeHillMessage): Promise<void> {
    const { id, redcode } = message.body

    if (isHillStatusReady(id)) {
        triggerStartChallenge(id, redcode)
    } else {
        enqueue(CHALLENGE_QUEUE, message)
    }
}

export default challengeReception
