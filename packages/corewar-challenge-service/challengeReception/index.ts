import { AzureFunction, Context } from '@azure/functions'
import { SERVICE_NAME, Queues, Topics } from '../common/constants'
import { enqueue, createTopic, createQueue } from 'corewar-infrastructure'
import { triggerStartChallenge } from '../common/triggerStartChallenge'
import { IChallengeHillMessage } from 'corewar-message-types'
import { isHillStatusReady } from '../isHillStatusReady.ts'

createTopic({ serviceName: SERVICE_NAME, topicName: Topics.challengeHill })
createQueue({ queueName: Queues.challengeQueue })

const challengeReception: AzureFunction = async function(_: Context, message: IChallengeHillMessage): Promise<void> {
    const { id, redcode } = message.body

    if (isHillStatusReady(id)) {
        triggerStartChallenge(id, redcode)
    } else {
        enqueue(Queues.challengeQueue, message)
    }
}

export default challengeReception
