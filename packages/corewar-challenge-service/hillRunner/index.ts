import { AzureFunction, Context } from '@azure/functions'
import Repository from 'corewar-repository'
import { corewar } from 'corewar'
import { broadcast } from '../serviceBus/broadcast'
import {
    START_CHALLENGE_FAILED_TOPIC,
    DATABASE_NAME,
    COLLECTION_NAME,
    CHALLENGE_RESULT_TOPIC
} from '../common/constants'
import IHill from '../common/IHill'

interface IStartChallengeMessage {
    body: {
        hillId: string
        warriorRedcode: string
    }
}

const hillRunner: AzureFunction = async function(_: Context, message: IStartChallengeMessage): Promise<void> {
    const { hillId, warriorRedcode } = message.body
    const parseResult = corewar.parse(warriorRedcode)

    if (!parseResult.success) {
        broadcast(START_CHALLENGE_FAILED_TOPIC, {
            body: {
                message: `Failed to parse warrior '${parseResult.metaData.name}'`,
                result: parseResult
            }
        })
    }

    const repo = new Repository(DATABASE_NAME, COLLECTION_NAME)
    const hill = repo.getById<IHill>(hillId)

    const warriors = hill.warriors.map(warrior => ({
        source: corewar.parse(warrior.redcode),
        data: { redcode: warrior.redcode }
    }))
    const challenger = {
        source: parseResult,
        data: { redcode: warriorRedcode }
    }

    const result = corewar.runHill(hill.rules, [...warriors, challenger])

    broadcast(CHALLENGE_RESULT_TOPIC, {
        body: {
            hillId,
            result
        }
    })
}

export default hillRunner
