import { AzureFunction, Context } from '@azure/functions'
import Repository from 'corewar-repository'
import { IOptions } from 'corewar'
import uuid from 'uuid/v1'

interface ICreateHillMessage {
    body: {
        rules: {
            rounds: number
            size: number
            options: IOptions
        }
    }
}

const serviceBusTopicTrigger: AzureFunction = async function(_: Context, message: ICreateHillMessage): Promise<void> {
    const repo = new Repository('hills-db', 'hills')
    const { rules } = message.body

    await repo.upsert({
        id: uuid(),
        rules,
        warriors: []
    })
}

export default serviceBusTopicTrigger
