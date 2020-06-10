import { AzureFunction, Context } from '@azure/functions'
import { DATABASE_NAME, COLLECTION_NAME } from '../common/constants'
import Repository from 'corewar-repository'

interface IHillDeletedMessage {
    body: {
        id: string
    }
}

const hillDeleted: AzureFunction = async function(_: Context, message: IHillDeletedMessage): Promise<void> {
    const repo = new Repository(DATABASE_NAME, COLLECTION_NAME)
    repo.delete(message.body.id)
}

export default hillDeleted
