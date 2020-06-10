import { AzureFunction, Context } from '@azure/functions'
import uuid from 'uuid/v1'
import { DATABASE_NAME, COLLECTION_NAME } from '../common/constants'
import Repository from 'corewar-repository'
import { ICreateHillMessage, IHillCreatedMessage } from 'corewar-message-types'

const createHill: AzureFunction = async function(
    _: Context,
    message: ICreateHillMessage
): Promise<IHillCreatedMessage> {
    const { rules } = message.body

    const repo = new Repository(DATABASE_NAME, COLLECTION_NAME)

    const id = uuid()
    repo.upsert({
        id,
        rules,
        warriors: []
    })

    return {
        body: {
            id,
            rules
        }
    }
}

export default createHill
