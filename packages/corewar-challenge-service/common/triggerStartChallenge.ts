import IHill, { ChallengeStatusType } from './IHill'
import { START_CHALLENGE_TOPIC } from './constants'
import { broadcast } from '../serviceBus/broadcast'
import Repository from 'corewar-repository'
import { IStartChallengeMessage } from 'corewar-message-types'

export const triggerStartChallenge = async (repo: Repository, hill: IHill, redcode: string): Promise<void> => {
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
