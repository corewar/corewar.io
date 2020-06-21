import IHill, { ChallengeStatusType } from './IHill'
import { DATABASE_NAME, COLLECTION_NAME, Topics } from './constants'
import { broadcast, createTopic } from 'corewar-infrastructure'
import Repository from 'corewar-repository'
import { IStartChallengeMessage } from 'corewar-message-types'

createTopic({ topicName: Topics.startChallenge })

export const triggerStartChallenge = async (id: string, redcode: string): Promise<void> => {
    const repo = new Repository(DATABASE_NAME, COLLECTION_NAME)
    const hill = await repo.getById<IHill>(id)

    await repo.upsert({
        ...hill,
        status: ChallengeStatusType.Busy
    })

    return broadcast(Topics.startChallenge, {
        body: {
            id: hill.id,
            redcode
        }
    } as IStartChallengeMessage)
}
