import { AzureFunction, Context } from '@azure/functions'
import { DATABASE_NAME, COLLECTION_NAME, SERVICE_NAME, Topics } from '../common/constants'
import Repository from 'corewar-repository'
import { IHillDeletedMessage, IDeleteHillMessage } from 'corewar-message-types'
import { createTopic, createSubscription } from 'corewar-infrastructure'

createSubscription({ serviceName: SERVICE_NAME, topicName: Topics.deleteHill })
createTopic({ topicName: Topics.hillDeleted })

const deleteHill: AzureFunction = async function(
    _: Context,
    message: IDeleteHillMessage
): Promise<IHillDeletedMessage> {
    const { id } = message.body

    const repo = new Repository(DATABASE_NAME, COLLECTION_NAME)

    repo.delete(id)

    return {
        body: { id }
    }
}

export default deleteHill
