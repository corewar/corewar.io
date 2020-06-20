import { AzureFunction, Context } from '@azure/functions'
import { DATABASE_NAME, COLLECTION_NAME, SERVICE_NAME, Topics } from '../common/constants'
import Repository from 'corewar-repository'
import { IHillDeletedMessage } from 'corewar-message-types'
import { createSubscription } from 'corewar-infrastructure'

createSubscription({ serviceName: SERVICE_NAME, topicName: Topics.hillDeleted })

const hillDeleted: AzureFunction = async function(_: Context, message: IHillDeletedMessage): Promise<void> {
    const repo = new Repository(DATABASE_NAME, COLLECTION_NAME)
    repo.delete(message.body.id)
}

export default hillDeleted
