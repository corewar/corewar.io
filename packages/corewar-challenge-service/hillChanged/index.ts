import { triggerStartChallenge, IChallengeHillMessage } from '../common/triggerStartChallenge'
import IHill, { ChallengeStatusType } from '../common/IHill'
import Repository from 'corewar-repository'
import { DATABASE_NAME, COLLECTION_NAME, CHALLENGE_QUEUE } from '../common/constants'
import { peek } from '../serviceBus/peek'
import { IRules } from 'corewar'

export interface IHillCreatedMessage {
    body: {
        id: string
        rules: IRules
    }
}

export interface IHillUpdatedMessage {
    body: {
        id: string
        rules: IRules
        warriors: {
            redcode: string
        }[]
    }
}

type IHillChangedMessage = IHillCreatedMessage | IHillUpdatedMessage

export const hillChanged = async (message: IHillChangedMessage): Promise<void> => {
    const hill: IHill = {
        ...message.body,
        status: ChallengeStatusType.Ready
    }

    const repo = new Repository(DATABASE_NAME, COLLECTION_NAME)
    const promise = repo.upsert(hill)

    const challenge = await peek<IChallengeHillMessage>(CHALLENGE_QUEUE)
    if (!challenge) {
        return
    }

    await promise

    triggerStartChallenge(repo, hill, challenge.body.warriorRedcode)
}
