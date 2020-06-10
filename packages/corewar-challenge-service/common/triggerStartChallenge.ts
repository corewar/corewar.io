import IHill, { ChallengeStatusType } from './IHill'
import { START_CHALLENGE_TOPIC } from './constants'
import { broadcast } from '../serviceBus/broadcast'
import { SendableMessageInfo } from '@azure/service-bus'
import Repository from 'corewar-repository'

export interface IChallengeHillMessage extends SendableMessageInfo {
    body: {
        hillId: string
        warriorRedcode: string
    }
}

export const triggerStartChallenge = async (repo: Repository, hill: IHill, redcode: string): Promise<void> => {
    await repo.upsert({
        ...hill,
        status: ChallengeStatusType.Busy
    })

    broadcast(START_CHALLENGE_TOPIC, {
        body: {
            hillId: hill.hillId,
            warriorRedcode: redcode
        }
    })
}
