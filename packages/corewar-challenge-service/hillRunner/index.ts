import { AzureFunction, Context } from '@azure/functions'
import Repository from 'corewar-repository'
import { corewar } from 'corewar'
import { broadcast } from 'corewar-infrastructure'
import {
    START_CHALLENGE_FAILED_TOPIC,
    DATABASE_NAME,
    COLLECTION_NAME,
    CHALLENGE_RESULT_TOPIC
} from '../common/constants'
import IHill from '../common/IHill'
import { IStartChallengeMessage, IStartChallengeFailedMessage, IChallengeResultMessage } from 'corewar-message-types'

const hillRunner: AzureFunction = async function(_: Context, message: IStartChallengeMessage): Promise<void> {
    const { id, redcode } = message.body
    const parseResult = corewar.parse(redcode)

    if (!parseResult.success) {
        broadcast(START_CHALLENGE_FAILED_TOPIC, {
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

    broadcast(CHALLENGE_RESULT_TOPIC, {
        body: {
            id,
            result
        }
    } as IChallengeResultMessage)
}

export default hillRunner
