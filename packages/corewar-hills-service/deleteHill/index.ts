import { AzureFunction, Context } from '@azure/functions'
import { DATABASE_NAME, COLLECTION_NAME } from '../common/constants'
import Repository from 'corewar-repository'

interface IDeleteHillMessage {
    body: {
        id: string
    }
}

interface IHillDeletedMessage {
    body: {
        id: string
    }
}

const serviceBusTopicTrigger: AzureFunction = async function(
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

export default serviceBusTopicTrigger
