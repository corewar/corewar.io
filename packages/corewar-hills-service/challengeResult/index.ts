import { AzureFunction, Context } from '@azure/functions'
import { IChallengeResultMessage, IHillUpdatedMessage } from 'corewar-message-types'
import { DATABASE_NAME, COLLECTION_NAME, SERVICE_NAME, Topics } from '../common/constants'
import { IHill } from '../common/IHill'
import Repository from 'corewar-repository'
import { createTopic, createSubscription } from 'corewar-infrastructure'

createSubscription({ serviceName: SERVICE_NAME, topicName: Topics.challengeResult })
createTopic({ serviceName: SERVICE_NAME, topicName: Topics.hillUpdated })

const challengeResult: AzureFunction = async function(
    _: Context,
    message: IChallengeResultMessage
): Promise<IHillUpdatedMessage> {
    const { id, result } = message.body

    const repo = new Repository(DATABASE_NAME, COLLECTION_NAME)
    const hill = await repo.getById<IHill>(id)

    const warriors = result.warriors
        .sort((a, b) => a.score - b.score)
        .map(warrior => warrior.warrior.data.redcode)
        .slice(0, hill.rules.size)

    const nextHill = {
        ...hill,
        warriors
    }

    await repo.upsert(nextHill)

    return {
        body: {
            ...nextHill
        }
    }
}

export default challengeResult
