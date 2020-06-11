import IHill, { ChallengeStatusType } from './IHill'
import { START_CHALLENGE_TOPIC, DATABASE_NAME, COLLECTION_NAME } from './constants'
import { broadcast } from '../serviceBus/broadcast'
import Repository from 'corewar-repository'
import { IStartChallengeMessage } from 'corewar-message-types'

export const triggerStartChallenge = async (id: string, redcode: string): Promise<void> => {
    const repo = new Repository(DATABASE_NAME, COLLECTION_NAME)
    const hill = await repo.getById<IHill>(id)

    await repo.upsert({
        ...hill,
        status: ChallengeStatusType.Busy
    })

    broadcast(START_CHALLENGE_TOPIC, {
        body: {
            id: hill.id,
            redcode
        }
    } as IStartChallengeMessage)
}
