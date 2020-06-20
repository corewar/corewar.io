import { AzureFunction, Context } from '@azure/functions'
import Repository from 'corewar-repository'
import { corewar } from 'corewar'
import { broadcast, createQueue, createTopic } from 'corewar-infrastructure'
import { DATABASE_NAME, COLLECTION_NAME, Queues, Topics } from '../common/constants'
import IHill from '../common/IHill'
import { IStartChallengeMessage, IStartChallengeFailedMessage, IChallengeResultMessage } from 'corewar-message-types'

createTopic({ topicName: Topics.startChallengeFailed })
createTopic({ topicName: Topics.challengeResult })
createQueue({ queueName: Queues.startChallengeQueue })

const hillRunner: AzureFunction = async function(_: Context, message: IStartChallengeMessage): Promise<void> {
    const { id, redcode } = message.body
    const parseResult = corewar.parse(redcode)

    if (!parseResult.success) {
        broadcast(Topics.startChallengeFailed, {
            body: {
                id,
                message: `Failed to parse warrior '${parseResult.metaData.name}'`,
                result: parseResult
            }
        } as IStartChallengeFailedMessage)
    }

    const repo = new Repository(DATABASE_NAME, COLLECTION_NAME)
    const hill = await repo.getById<IHill>(id)

    const warriors = hill.warriors.map(warrior => ({
        source: corewar.parse(warrior.redcode),
        data: { redcode: warrior.redcode }
    }))
    const challenger = {
        source: parseResult,
        data: { redcode }
    }

    const result = corewar.runHill(hill.rules, [...warriors, challenger])

    broadcast(Topics.challengeResult, {
        body: {
            id,
            result
        }
    } as IChallengeResultMessage)
}

export default hillRunner
